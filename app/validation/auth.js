const Joi = require('joi');

//auth POST
exports.authSchema = Joi.object({
    email: Joi.string().required(),
    //.email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});