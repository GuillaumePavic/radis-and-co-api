const handler = require('../middlewares/async');
const dataMapper = require('../dataMappers/dataMapper');

exports.getAllPlants = handler(async (req, res) => {
    const plants = await dataMapper.getAllPlants();
    res.json(plants);
});

exports.getPlant = handler(async (req, res) => {
    const plantId = req.params.id;
    const plant = await dataMapper.getPlant(plantId);
    res.json(plant);
});