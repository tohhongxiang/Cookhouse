const router = require('express').Router();
const nodemailer = require('nodemailer');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verify = require('./verifyToken');
const { validateRegistration, validateLogin, validateUpdate, validatePassword } = require('../validation');
require('dotenv').config();

// /api/users/register
// registers a user
// PUBLIC
router.post('/register', async (req, res) => {
    // validate req.body first
    const { error } = validateRegistration(req.body);
    if (error) {
        const errorMessage = error.details[0].message;
        const errorField = error.details[0].context.key;
        return res.status(400).json({
            msg: "failed",
            error: errorMessage,
            key: errorField
        });
    }

    //make sure username doesnt exist first
    const userExists = await User.findOne({username: req.body.username});
    if (userExists) {
        return res.status(400).json({
            msg: 'failed',
            error: "Username already in use",
            key: "username"
        });
    }

    const emailExists = await User.findOne({email: req.body.email});
    if (emailExists) {
        return res.status(400).json({
            msg: 'failed',
            error:"Email already in use",
            key:"email"
        });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        ...req.body,
        password: hashedPassword
    });

    
    try {
        const savedUser = await user.save();
        const token = jwt.sign({
            _id: user._id,
            username: user.username
        }, process.env.TOKEN_SECRET);
        res.json({
            token,
            savedUser
        });
    } catch (err) {
        res.status(400).send(err);
    }

});

// /api/users/login
// logs user in
// PUBLIC
router.post('/login', async (req, res) => {
    // validate req.body first
    const { error } = validateLogin(req.body);
    if (error) {
        const errorMessage = error.details[0].message;
        const errorField = error.details[0].context.key;
        return res.status(400).json({
            error: errorMessage,
            key: errorField
        });
    }

    // make sure username exists
    const user = await User.findOne({username: req.body.username});
    if (!user) {
        return res.status(400).json({
            msg: 'failed',
            error: 'Username or password is incorrect'
        });
    }

    // validate password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(401).json({
            msg: 'failed',
            error: 'Username or password is incorrect'
        });
    }

    // create and sign token
    const token = jwt.sign({
        _id: user._id,
        username: user.username
    }, process.env.TOKEN_SECRET);

    res.header('auth-token', token).json({token});
});

// /api/users/getuser
// gets a specific user by id passed through headers
// PRIVATE
router.get('/getuser', verify, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    if (user) {
        return res.json(user);
    } else {
        return res.json({
            msg: "failed",
            error: "No user found"
        })
    }
    
});

// /api/users/edituser
// changes user particulars
// PRIVATE
router.post('/edituser', verify, async (req, res) => {
    // validate new user first
    let payload = {...req.body};
    if (!payload.newPassword) {
        payload.newPassword = payload.oldPassword;
    }

    const { error } = validateUpdate(payload);
    if (error) {
        const errorMessage = error.details[0].message;
        const errorField = error.details[0].context.key;
        return res.status(400).json({
            error: errorMessage,
            key: errorField
        });
    }

    // find the old user
    const user = await User.findById(req.user._id);
    if (!user) {
        return res.status(404).json({
            msg: 'failed',
            error: 'Unable to find user'
        })
    }

    // if the user is changing username/email, both must not be in use
    if (payload.username !== user.username) {
        const usernameExists = await User.findOne({username: payload.username});
        if (usernameExists) {
            return res.status(400).json({
                msg: 'failed',
                error: 'Username already taken',
                key: 'username'
            });
        }
    }

    if (payload.email !== user.email) {
        const emailExists = await User.findOne({email: payload.email});
        if (emailExists) {
            return res.status(400).json({
                msg: 'failed',
                error: 'Email already taken',
                key: 'email'
            });
        }
    }

    const {username, email, oldPassword, newPassword} = payload;

    //check whether oldpassword was correct
    const validPassword = await bcrypt.compare(oldPassword, user.password);

    if (!validPassword) {
        return res.status(401).json({
            msg: 'failed',
            error: 'Password is incorrect',
            key: 'oldPassword'
        });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.username = username;
    user.email = email;
    user.password = hashedPassword;

    try {
        const savedUser = await user.save();
        const token = jwt.sign({
            _id: user._id,
            username: user.username
        }, process.env.TOKEN_SECRET);
        return res.json({
            token,
            savedUser
        });
    } catch (err) {
        return res.status(400).send(err);
    }
})

// /api/user/forgotpassword
// public
// route to flag user for imminent password reset
router.post('/forgotpassword', async (req, res) => {
    const email = req.body.email;

    const user = await User.findOne({email});
    // if user doesnt exist
    if (!user) {
        return res.status(400).json({
            msg: 'failed',
            error: 'Email not found',
            key: 'email'
        });
    }

    // generate token
    const token = jwt.sign({
        data: {_id: user._id,
        username: user.username,
        email: user.email}
      }, process.env.TOKEN_SECRET,
      { expiresIn: '1h' });

    // set password reset date and password reset token
    user.passwordResetDate = Date.now() + 3600000; // password reset time should be 1h from request time
    user.passwordResetToken = token;

    // save the user
    try {
        const savedUser = await user.save();
        const token = jwt.sign({
            _id: user._id,
            username: user.username
        }, process.env.TOKEN_SECRET);
    } catch (error) {
        res.status(400).json({
            msg: 'failed',
            error
        });
    }

    // send email
    try {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL, 
                pass: process.env.PASSWORD 
            }
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: process.env.EMAIL, // sender address
            to: email, // list of receivers
            subject: 'Reset Password', // Subject line
            text: 'You just requested for a password reset. Go here:' + req.headers.referer + '#/forgotpassword/' + token, // plain text body
        });

        return res.json({
            msg: 'success',
            messageId: info.messageId,
            link: nodemailer.getTestMessageUrl(info),
            info
        });
    } catch(error) {
        return res.json({
            msg: 'failed',
            error
        });
    }
    
});

router.get('/forgotpassword/:token', async (req, res) => {
    const token  = req.params.token;

    // find user with the password reset date and token
    const user = await User.findOne({passwordResetDate: {$gte: Date.now()}, passwordResetToken: token});

    if (!user) {
        return res.status(400).json({
            msg: "failed",
            error: "Invalid/expired token"
        })
    }

    return res.json({
        msg: "Youre here"
    })
})

router.post('/forgotpassword/:token', async (req, res) => {
    const newPassword = req.body.password;
    const token = req.params.token;
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const _id = decoded.data._id

    // validate new password
    const { error } = validatePassword({password: newPassword});
    if (error) {
        const errorMessage = error.details[0].message;
        const errorField = error.details[0].context.key;
        return res.status(400).json({
            error: errorMessage,
            key: errorField
        });
    }

    // find user
    const user = await User.findById(_id);

    if (!user) {
        return res.status(400).json({
            msg: "failed",
            error: "No user found"
        })
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;

    // reset passwordresetoken and date so that user cannot keep resetting his password
    user.passwordResetToken= "";
    user.passwordResetDate= Date.now();

    try {
        const savedUser = await user.save();
        const token = jwt.sign({
            _id: user._id,
            username: user.username
        }, process.env.TOKEN_SECRET);
        return res.json({
            msg:'success',
            token,
            savedUser
        });
    } catch (err) {
        return res.status(400).send(err);
    }
})

router.post('/test', async (req, res) => {
    // validate new user first
    let payload = {...req.body};
    const validation = validateUpdate(payload);
    return res.json({
        validation
    });
});

module.exports = router;