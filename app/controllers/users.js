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


    res.json({pseudo: user.pseudo, email: user.email, is_admin: user.is_admin, token});
});

exports.getUser = handler(async (req, res) => {
    const userId = req.user.id;

    const user = await dataMapper.getUserById(userId);

    if(!user) return get404(res);
    delete user.password;

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
    console.log(req.body.password, user.password)
    const validPassword = bcrypt.compareSync(req.body.password, user.password);
    if(!validPassword) return res.status(400).json({message : "mot de passe invalide"});

    //check si email est maj dans req.body
    /*if(req.body.email) {
        if(req.body.email !== user.email) {
            const checkEmail = await dataMapper.getUserByEmail(req.body.email);
            if(checkEmail.id != user.id) return res.status(409).json({message: 'cet email est déjà utilisé'});
        }
    }*/

    //on check si password est maj dans req.body
    if(req.body.newPassword) {
        req.body.newPassword = await bcrypt.hash(req.body.newPassword, 10);
        await dataMapper.updatePassword(req.body.newPassword, userId);
    }


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
 
