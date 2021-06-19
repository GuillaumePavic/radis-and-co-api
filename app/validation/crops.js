const Joi = require('joi');

const cropsSchema = Joi.object({
    plant_id: Joi.number()
        .min(0)
        .required(),

    coord_x: Joi.number()
        .min(0)
        .required(),

    coord_y: Joi.number()
        .min(0)
        .required()
});

module.exports = cropsSchema;