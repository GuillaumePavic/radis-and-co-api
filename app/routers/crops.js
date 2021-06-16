const cropsController = require('../controllers/crops');
const authMiddleware = require('../middlewares/auth');
const express = require('express');
const { auth } = require('../controllers/auth');
const router = express.Router();

router.post('/', authMiddleware, cropsController);

module.exports = router;