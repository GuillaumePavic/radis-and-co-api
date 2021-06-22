const dataMapper = require('../dataMappers/dataMapper');
const handler = require('../middlewares/async');
const get404 = require('../utils/404');

//Users
exports.getAllUsers = handler(async (req, res) => {
    const users = await dataMapper.getAllUsers();
    res.json(users);
});

exports.createAdmin = handler(async (req, res) => {
    const userId = req.params.id;

    //check if user is in database
    const user = await dataMapper.getUserById(userId);
    if(!user) get404(res);

    const admin = await dataMapper.createAdmin(userId);

    res.json(admin);
});

exports.removeAdmin = handler(async (req, res) => {
    const adminId = req.params.id;

    //check if user is in database
    const user = await dataMapper.getUserById(adminId);
    if(!user) get404(res);

    const admin = await dataMapper.removeAdmin(adminId);
    
    res.json(admin);
});

exports.deleteUser = handler(async (req, res) => {
    const userId = req.params.id;

    //check if user is in database
    const user = await dataMapper.getUserById(userId);
    if(!user) get404(res);

    await dataMapper.deleteUser(userId);

    res.json({message: 'utilisateur supprimé'});
});


//Plants
exports.createPlant = handler(async (req, res) =>  {
    let plant = req.body;

    plant = await dataMapper.createPlant(plant);

    res.json(plant);
});

exports.updatePlant = handler(async (req, res) => {
    let plant = req.body;

    //fait fonction update plant
});

exports.deletePlant = handler(async (req, res) => {
    const plantId = req.params.id;

    await dataMapper.deletePlant(plantId);

    res.json({message : 'plante supprimée'});
})