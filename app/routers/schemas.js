const schemaController = require('../controllers/schemas');
const authMiddleware = require('../middlewares/auth');
const express = require('express');
const router = express.Router();

router.put('/', authMiddleware, schemaController.createOrUpdateSchema);

router.route('/:id(\\d+)')
.get(authMiddleware, schemaController.getSchema)
.delete(authMiddleware, schemaController.deleteSchema);

router.get('/user', authMiddleware, schemaController.getSchemaFromUser);
    
module.exports = router;