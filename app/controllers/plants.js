const handler = require('../middlewares/async');
const get404 = require('../utils/404');
const dataMapper = require('../dataMappers/dataMapper');

exports.getAllPlants = handler(async (req, res) => {
    const plants = await dataMapper.getAllPlants();
    res.json(plants);
});

exports.getPlant = handler(async (req, res) => {
    const plantId = req.params.id;
    const plant = await dataMapper.getPlant(plantId);
    if(!plant) return get404(res);
    res.json(plant);
});