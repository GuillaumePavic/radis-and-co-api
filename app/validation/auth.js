const Joi = require('joi');

const authSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: true } })
        .pattern(new RegExp('^[A-Za-z0-9+_.-]+@(.+)$'))
        .message('email ou mot de passe invalide'),

    
    password: Joi.string()
    .pattern(new RegExp('^[&!?a-zA-Z0-9]{8,30}$'))
        .message('email ou mot de passe invalide')
});

module.exports = authSchema;