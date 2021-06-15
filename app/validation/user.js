const Joi = require('joi');

//user POST
const userSchema = Joi.object({
    pseudo : Joi.string().required(),

    email: Joi.string().required(),
    //.email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});

module.exports = userSchema;