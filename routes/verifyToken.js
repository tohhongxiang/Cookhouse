const jwt = require('jsonwebtoken');
// require('dotenv').config();

module.exports = function(req, res, next) {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({
            msg: "Access denied",
            reason: "Not logged in"
        }); // Forbidden without token
    }

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch(err) {
        return res.status(400).json({
            msg: "Invalid token"
        });
    }
}