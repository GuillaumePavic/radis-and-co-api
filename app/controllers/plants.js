const handler = require('../middlewares/async');
const dataMapper = require('../dataMappers/dataMapper');

exports.getAllPlants = handler(async (req, res) => {
    const plants = await dataMapper.getAllPlants();
    res.json(plants);
})

exports.getPlant = handler(async (req, res) => {
    const plantId = req.params.id;
    const plant = await dataMapper.getPlant(plantId);
    res.json(plant);
})

/*
exports.getAllPlants = async (req, res) => {
    try {
        const plants = await dataMapper.getAllPlants();
        res.json(plants);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: 'Error 500'});
    }
};exports.getAllPlants = async (req, res) => {
    try {
        const plants = await dataMapper.getAllPlants();
        res.json(plants);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: 'Error 500'});
    }
};

exports.getPlant = async (req, res) => {
    try {
        const plantId = req.params.id;
        const plant = await dataMapper.getPlant(plantId);
        res.json(plant);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: 'Error 500'});
    }
}*/