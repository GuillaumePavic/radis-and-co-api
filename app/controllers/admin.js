const dataMapper = require('../dataMappers/dataMapper');
const handler = require('../middlewares/async');
const get404 = require('../utils/404');
const plantSchema = require('../validation/plant');
const typeSchema = require('../validation/type');

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

    //Joi
    try {
        await plantSchema.validateAsync(plant);
    } catch (error) {
        console.log(error)
        if(error) return res.status(400).json({message: error.details[0].message});        
    }

    plant.companion_pos = `{ ${plant.companion_pos} }`;
    plant.companion_neg = `{ ${plant.companion_neg} }`;

    plant = await dataMapper.createPlant(plant);

    res.json(plant);
});

exports.updatePlant = handler(async (req, res) => {
    const plantId = req.params.id;

    //Joi
    try {
        await plantSchema.validateAsync(req.body);
    } catch (error) {
        console.log(error)
        if(error) return res.status(400).json({message: error.details[0].message});        
    }

    //check if plant is in database
    let plant = await dataMapper.getPlant(plantId);
    if(!plant) get404(res);

    const plantData = {
        ...plant,
        ...req.body
    }

    plant = await dataMapper.updatePlant(plantData, plantId);

    res.json(plant);
});

exports.deletePlant = handler(async (req, res) => {
    const plantId = req.params.id;

    //check if plant is in database
    const plant = await dataMapper.getPlant(plantId);
    if(!plant) get404(res);

    await dataMapper.deletePlant(plantId);

    res.json({message : 'plante supprimée'});
});


//Types
exports.getAllTypes = handler(async (req, res) => {
    const types = await dataMapper.getAllTypes();

    res.json(types);
})

exports.createType = handler(async (req, res) =>  {
    let typeLabel = req.body.label;

    //Joi
    try {
        await typeSchema.validateAsync(req.body);
    } catch (error) {
        if(error) return res.status(400).json({message: 'le type doit être une chaîne de caractères'});        
    }

    type = await dataMapper.createType(typeLabel);

    res.json(type);
});

exports.updateType = handler(async (req, res) => {
    const typeId = req.params.id;
    let newLabel = req.body.label;

    //Joi
    try {
        await typeSchema.validateAsync(req.body);
    } catch (error) {
        if(error) return res.status(400).json({message: 'le type doit être une chaîne de caractères'});        
    }

    //check if type is in database
    let type = await dataMapper.getType(typeId);
    if(!type) get404(res);

    type = await dataMapper.updateType(newLabel, typeId);

    res.json(type);
});

exports.deleteType = handler(async (req, res) => {
    const typeId = req.params.id;

    //check if type is in database
    const type = await dataMapper.getType(typeId);
    if(!type) get404(res);

    await dataMapper.deleteType(typeId);

    res.json({message : 'type supprimé'});
});
