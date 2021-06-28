const contactController = require('../controllers/contact');
const express = require('express');
const router = express.Router();

router.post('/', contactController);

module.exports = router;