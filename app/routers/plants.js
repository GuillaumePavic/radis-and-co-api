const plantController = require('../controllers/plants');
const express = require('express');
const router = express.Router();

router.get('/', plantController.getAllPlants);

router.get('/:id', plantController.getPlant);

module.exports = router;