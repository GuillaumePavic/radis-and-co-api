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

router.get('/types', adminController.getAllTypes);
router.post('/types', adminController.createType);
router.patch('/types/:id(\\d+)', adminController.updateType);
router.delete('/types/:id(\\d+)', adminController.deleteType);

module.exports = router;