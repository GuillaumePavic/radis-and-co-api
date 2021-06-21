const adminMiddleware = require('../middlewares/admin');
const adminController = require('../controllers/admin');
const express = require('express');
const router = express.Router();


router.get('/users', adminController.getAllUsers);
router.post('/users/:id(\\d+)', adminController.createAdmin);
router.patch('/users/:id(\\d+)', adminController.removeAdmin);
router.delete('/users/:id(\\d+)', adminController.deleteUser);


router.post('/plants', adminController.createPlant);
router.patch('/plants/:id(\\d+)', adminController.updatePlant);
router.delete('/plants/:id(\\d+)', adminController.deletePlant);

module.exports = router;