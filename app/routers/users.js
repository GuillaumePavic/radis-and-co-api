const authMiddleware = require('../middlewares/auth');
const userController = require('../controllers/users');
const express = require('express');
const router = express.Router();

router.route('/')
    .post(userController.createUser)
    .get(authMiddleware, userController.getUser)
    .patch(authMiddleware, userController.updatePassword)
    .delete(authMiddleware, userController.deleteUser);

module.exports = router;