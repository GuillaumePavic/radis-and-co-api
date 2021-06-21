const plantController = require('../controllers/plants');
const express = require('express');
const router = express.Router();

router.get('/', plantController.getAllPlants);

router.get('/:id(\\d+)', plantController.getPlant);

module.exports = router;