const dataMapper = require('../dataMappers/dataMapper');
const handler = require('../middlewares/async');
const get404 = require('../utils/404');
const { userSchema, updateSchema } = require('../validation/user');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

exports.createUser = handler(async (req, res) => {
    let user = req.body;

    //Joi
    try {
        await userSchema.validateAsync(user);
    } catch (error) {
        if(error) return res.status(400).json({message: error.details[0].message});        
    }

    //Check si déjà un user avec cet email
    const emailUsed = await dataMapper.getUserByEmail(user.email);
    if(emailUsed) return res.status(409).json({message: 'cet email est déjà utilisé'})

    //hash password
    user.password = await bcrypt.hash(user.password, 10);
    user = await dataMapper.createUser(user);

    //JWT
    const payload = {id: user.id};
    const token = jwt.sign(payload, process.env.JWTPRIVATEKEY, { expiresIn: '1h' });


    res.json({ pseudo : user.pseudo, token });
});

exports.getUser = handler(async (req, res) => {
    const userId = req.user.id;

    const user = await dataMapper.getUserById(userId);
    delete user.password;

    if(!user) return get404(res);

    res.json(user);
});

exports.updateUser = handler(async (req, res) => {
    const userId = req.user.id;

    //Joi
    try {
        await updateSchema.validateAsync(req.body);
    } catch (error) {
        if(error) return res.status(400).json({message: error.details[0].message});        
    }
    
    let user = await dataMapper.getUserById(userId);

    //check password
    const validPassword = bcrypt.compareSync(req.body.password, user.password);
    if(!validPassword) return res.status(400).json({message : "mot de passe invalide"});

    //on check si password est maj dans req.body
    if(req.body.newPassword) req.body.newPassword = await bcrypt.hash(req.body.newPassword, 10);

    const userData = {
        ...user,
        ...req.body
    };

    user = await dataMapper.updateUser(userData, userId);
    
    res.json(user);
});

exports.deleteUser = handler(async (req, res) => {
    const userId = req.user.id;

    await dataMapper.deleteUser(userId);
    res.json({message: 'compte supprimé'});
});
 
