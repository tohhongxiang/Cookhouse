const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/', verify, (req, res) => {
    res.json({
        posts: {
            title: "asdf",
            description: "log in pls"
        }
    })
})

module.exports = router;