const dataMapper = require('../dataMappers/dataMapper');
const handler = require('../middlewares/async');
const { userSchema } = require('../validation/user');
const bcrypt = require('bcrypt');

exports.createUser = handler(async (req, res) => {
    let user = req.body;

    try {
        await userSchema.validateAsync(user);
    } catch (error) {
        if(error) return res.status(400).send(error.details[0].message);        
    }

    user.password = await bcrypt.hash(user.password, 10);
    user = await dataMapper.createUser(user);

    res.json({ pseudo : user.pseudo });
});

