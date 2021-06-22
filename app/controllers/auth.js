const handler = require('../middlewares/async');
const dataMapper = require('../dataMappers/dataMapper');
const authSchema = require('../validation/auth');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

exports.auth = handler(async (req, res) => {
    //Joi
    try {
        await authSchema.validateAsync(req.body);
    } catch (error) {
        if(error) return res.status(400).send(error.details[0].message);        
    }

    //check email and password
    const user = await dataMapper.getUserByEmail(req.body.email);
    if(!user) return res.status(400).json({message : "email ou mot de passe invalide"});

    const validPassword = bcrypt.compareSync(req.body.password, user.password);
    if(!validPassword) return res.status(400).json({message : "email ou mot de passe invalide"});

    //JWT
    const payload = {id: user.id};
    if(user.is_admin) payload.isAdmin = true;

    const token = jwt.sign(payload, process.env.JWTPRIVATEKEY, { expiresIn: '1h' });
    
    res.json({pseudo: user.pseudo, token});
});