const schemaController = require('../controllers/schemas');
const authMiddleware = require('../middlewares/auth');
const express = require('express');
const router = express.Router();

router.put('/', schemaController.createOrUpdateSchema);

router.route('/:id(\\d+)')
.get(schemaController.getSchema)
.delete(schemaController.deleteSchema);

router.get('/user', schemaController.getSchemaFromUser);
    
module.exports = router;