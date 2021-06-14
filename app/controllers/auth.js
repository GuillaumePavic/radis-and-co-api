const handler = require('../middlewares/async');
const dataMapper = require('../dataMappers/dataMapper');
const { authSchema } = require('../validation/auth');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

exports.auth = handler(async (req, res) => {
    //Joi
    try {
        await authSchema.validateAsync(req.body);
    } catch (error) {
        if(error) return res.status(400).send(error.details[0].message);        
    }

    //Appels db
    const user = await dataMapper.getUser(req.body.email);
    if(!user) return res.status(400).json({message : "invalid email or password"});

    const validPassword = bcrypt.compareSync(req.body.password, user.password);
    if(!validPassword) return res.status(400).json({message : "invalid email or password"});

    //JWT
    const payload = {id: user.id};
    if(user.isAdmin) payload.isAdmin = true;

    const token = jwt.sign(payload, process.env.JWTPRIVATEKEY, { expiresIn: '1h' });
    
    res.header('x-auth-token', token).json({pseudo: user.pseudo});
});