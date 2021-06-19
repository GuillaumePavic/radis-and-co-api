const Joi = require('joi');

exports.userSchema = Joi.object({
    pseudo: Joi.string()
    .required()
    .min(3)
        .message('pseudo must be at least 1 character long')
    .max(30)
        .message('pseudo cannot be longer than 30 characters')
    .pattern(new RegExp('^[ a-zA-Z0-9\-_]{1,30}$'))
        .message('pseudo can only contain letters, numbers, whitespaces and the symbols - and _'),


    email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: true } })
        .message('invalid email format'),
    
    password: Joi.string()
    .required()
    .min(8)
        .message('password must be at least 8 characters long')
    .max(30)
        .message('password cannot be longer than 30 characters')
    .pattern(new RegExp('^[&!?a-zA-Z0-9]{8,30}$'))
        .message('password can only contain letters, numbers, the symbols &!?, and no whitespace')
});


exports.updateSchema = Joi.object().keys({
    pseudo: Joi.string()
    .min(3)
        .message('pseudo must be at least 1 character long')
    .max(30)
        .message('pseudo cannot be longer than 30 characters')
    .pattern(new RegExp('^[a-zA-Z0-9\-_]{1,30}$'))
        .message('pseudo can only contain letters, numbers, the symbols - and _, and no whitespace'),


    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: true } })
        .message('invalid email format'),
    
    password: Joi.string()
    .required()
    .min(8)
        .message('password must be at least 8 characters long')
    .max(30)
        .message('password cannot be longer than 30 characters')
    .pattern(new RegExp('^[&!?a-zA-Z0-9]{8,30}$'))
        .message('password can only contain letters, numbers, the symbols &!?, and no whitespace')
});

