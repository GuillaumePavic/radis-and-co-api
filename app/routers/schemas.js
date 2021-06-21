const schemaController = require('../controllers/schemas');
const authMiddleware = require('../middlewares/auth');
const express = require('express');
const router = express.Router();

router.post('/', authMiddleware, schemaController.createSchema);

router.get('/user', authMiddleware, schemaController.getSchemaFromUser);

router.route('/:id(\\d+)')
    .get(authMiddleware, schemaController.getSchema)
    .patch(authMiddleware, schemaController.updateSchema)
    .delete(authMiddleware, schemaController.deleteSchema);

    
module.exports = router;