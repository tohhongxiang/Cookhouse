const jwt = require('jsonwebtoken');
const User = require('../models/User');
// require('dotenv').config();

module.exports = async function(req, res, next) {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({
            msg: "failed",
            error: "Not logged in"
        }); // Forbidden without token
    }

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        const user = await User.findById(verified._id);

        // must verify that user is in our database
        if (!user) {
            return res.status(400).json({
                msg: "failed",
                error: "User does not exist"
            });
        }

        req.user = verified;
        next();
    } catch(err) {
        return res.status(400).json({
            msg: "failed",
            error: "Invalid token"
        });
    }
}