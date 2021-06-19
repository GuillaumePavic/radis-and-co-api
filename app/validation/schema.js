const Joi = require('joi');

exports.schemaSchema = Joi.object({
    name : Joi.string()
        .required()
        .min(1)
            .message('schema name must be at least 1 character long')
        .max(30)
            .message('name cannot be longer than 30 characters')
        .pattern(new RegExp('^[ a-zA-Z0-9\-_]{1,30}$'))
            .message('name can only contain letters, numbers, whitespaces and the symbols - and _'),

    length: Joi.number().required(),

    width: Joi.number().required(),

    user_id: Joi.number().required()
});

exports.updateSchema = Joi.object({
    name : Joi.string()
        .min(1)
            .message('schema name must be at least 1 character long')
        .max(30)
            .message('name cannot be longer than 30 characters')
        .pattern(new RegExp('^[ a-zA-Z0-9]{1,30}$'))
            .message('name can only contain letters, numbers, whitespaces and the symbols - and _'),

    length: Joi.number(),

    width: Joi.number()
});