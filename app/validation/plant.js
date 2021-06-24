const Joi = require('joi');

module.exports = Joi.object({
    name:  Joi.string(),
    scientific_name: Joi.string(),
    sun: Joi.number(),
    difficulty: Joi.number(),
    water: Joi.number(),
    icon: Joi.string(),
    image: Joi.string(),
    description: Joi.string(),
    size: Joi.number(),
    companion_pos: Joi.array(),
    companion_neg: Joi.array(),
    type_id: Joi.number()
});