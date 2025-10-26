const joi = require('joi');

const registerSchema = joi.object({
    email: joi.string().email().required(),
    username: joi.string().alphanum().min(3).max(30).required(),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    confirm_password: joi.string().valid(joi.ref('password')).required().messages({
        'any.only': 'Passwords do not match'
    })
});

const loginSchema = joi.object({
    username: joi.string().required(),
    password: joi.string().required()
});

const validateRegister = (req, res, next) => {
    const { error } = registerSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
}

const validateLogin = (req, res, next) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    // res.json({ message: 'Login data is valid' });
    next();
}

module.exports = { validateRegister, validateLogin };