const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        min: 6,
        max: 30
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 30
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 512
    },
    date: {
        type: Date,
        default: Date.now
    },
    passwordResetDate: {
        type: Date
    },
    passwordResetToken: {
        type: String
    }
});

module.exports = mongoose.model('user', userSchema);