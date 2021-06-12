const { json } = require('express');
const dataMapper = require('../dataMappers/dataMapper');

exports.getAllPlants = async (req, res) => {
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
}