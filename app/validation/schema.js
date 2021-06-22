const Joi = require('joi');

exports.schemaSchema = Joi.object({
    name : Joi.string()
        .required()
        .min(1)
            .message('le nom du potager doit contenir au moins un caractère')
        .max(30)
            .message('le nom du potager ne peut pas dépasser 30 caractères')
        .pattern(new RegExp('^[ a-zA-Z0-9\-_]{1,30}$'))
            .message('le nom du potager peut seulement contenir des lettres, des chiffres, des espaces ainsi que les symboles - et _'),

    length: Joi.number().required(),

    width: Joi.number().required(),

    user_id: Joi.number().required()
});

exports.updateSchema = Joi.object({
    name : Joi.string()
        .min(1)
            .message('le nom du potager doit contenir au moins un caractère')
        .max(30)
            .message('le nom du potager ne peut pas dépasser 30 caractères')
        .pattern(new RegExp('^[ a-zA-Z0-9]{1,30}$'))
            .message('le nom du potager peut seulement contenir des lettres, des chiffres, des espaces ainsi que les symboles - et _'),

    length: Joi.number(),

    width: Joi.number()
});