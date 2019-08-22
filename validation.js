// VALIDATION
const Joi = require('@hapi/joi');
const validateRegistration = (data) => {
    const schema = {
        username: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    };

    return Joi.validate(data, schema);
}

const validateLogin = (data) => {
    const schema = {
        username: Joi.string().min(6).required(),
        password: Joi.string().min(6).required()
    };

    return Joi.validate(data, schema);
}

const validateUpdate = (data) => {
    const schema = {
        username: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        oldPassword: Joi.string().min(6).required(),
        newPassword: Joi.string().min(6).required()
    };

    return Joi.validate(data, schema);
}

const validatePassword = (data) => {
    const schema = {
        password: Joi.string().min(6).required()
    };

    return Joi.validate(data, schema);
}



module.exports.validateRegistration = validateRegistration;
module.exports.validateLogin = validateLogin;
module.exports.validateUpdate = validateUpdate;
module.exports.validatePassword = validatePassword;
