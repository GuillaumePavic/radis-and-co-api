const dataMapper = require('../dataMappers/dataMapper');
const handler = require('../middlewares/async');
const get404 = require('../utils/404');
const schemaSchema = require('../validation/schema');
const cropsSchema = require('../validation/crops');

exports.createOrUpdateSchema = handler(async (req, res) => {
    //let schema = req.body;
    const user_id = req.user.id;
    let crops = [...req.body.crops];

    //Joi
    try {
        const schemaData = req.body;
        delete schemaData.crops;
        await schemaSchema.validateAsync(schemaData);
    } catch (error) {
        if(error) return res.status(400).send(error.details[0].message);        
    }

    try {
        for(let crop of crops) {
            delete crop.cropId;
            await cropsSchema.validateAsync(crop);
         }
    } catch (error) {
        if(error) return res.status(400).send(error.details[0].message);        
    }

    //Schema
    let schema = {}

     if(req.body.id === 0) {
        schema = await dataMapper.createSchema(req.body, user_id);
     } else {
        schema = await dataMapper.getSchema(req.body.id);
        if(!schema) return get404(res);
        if(schema.user_id !== user_id) return res.status(403).json({ message: 'Accès refusé' });

        schema = await dataMapper.updateSchema(req.body, req.body.id);
     }


    //Crops
    await dataMapper.deleteCrops(req.body.id);
    for(let crop of crops) {
        await dataMapper.createCrops(schema.id, crop);
    }

    crops = await dataMapper.getCrops(schema.id);
    schema.crops = crops;

    //res
    res.json(schema);
}); 

exports.getSchema = handler(async (req, res) => {
    const user_id = req.user.id;
    const schemaId = req.params.id;

    const schema = await dataMapper.getSchema(schemaId);
    
    if(!schema) return get404(res);
    if(schema.user_id !== user_id) return res.status(403).json({ message: 'Accès refusé' });

    const crops = await dataMapper.getCrops(schemaId);
    
    schema.crops = crops;
    delete schema.user_id;

    res.json(schema);
});


exports.deleteSchema = handler(async(req, res) => {
    const user_id = req.user.id;
    const schemaId = req.params.id;

    let schema = await dataMapper.getSchema(schemaId);

    if(!schema) return get404(res);
    if(schema.user_id !== user_id) return res.status(403).json({ message: 'Accès refusé' });

    await dataMapper.deleteSchema(schemaId);

    res.json({ message : 'potager supprimé' });


});

exports.getSchemaFromUser = handler(async(req, res) => {
    const user_id = req.user.id;
    
    const schemas = await dataMapper.getSchemaFromUser(user_id);

    res.json(schemas);
})

