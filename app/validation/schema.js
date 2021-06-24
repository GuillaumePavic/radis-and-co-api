const Joi = require('joi');

module.exports = Joi.object({
    id: Joi.number()
        .required()
        .min(0),

    name : Joi.string()
        .required()
        .min(1)
            .message('le nom du potager doit contenir au moins un caractère')
        .max(30)
            .message('le nom du potager ne peut pas dépasser 30 caractères')
        .pattern(new RegExp('^[ a-zA-Z0-9\-_]{1,30}$'))
            .message('le nom du potager peut seulement contenir des lettres, des chiffres, des espaces ainsi que les symboles - et _'),

    length: Joi.number().required(),

    width: Joi.number().required()
});