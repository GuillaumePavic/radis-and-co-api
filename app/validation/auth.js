const Joi = require('joi');

const authSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: true } })
        .pattern(new RegExp('^[A-Za-z0-9+_.-]+@(.+)$'))
        .message('invalid email or password'),

    
    password: Joi.string()
    .min(8)
        .message('invalid password')
    .max(30)
        .message('invalid password')
    .pattern(new RegExp('^[&!?a-zA-Z0-9]{8,30}$'))
        .message('invalid email or password')
});

module.exports = authSchema;