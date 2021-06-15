const Joi = require('joi');

const schemaSchema = Joi.object({
    name : Joi.string().required(),

    length: Joi.number().required(),

    width: Joi.number().required(),

    user_id: Joi.number().required()
});

module.exports = schemaSchema;