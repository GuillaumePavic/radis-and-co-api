const cropsSchema = require('../validation/crops');
const dataMapper = require('../dataMappers/dataMapper');
const handler = require('../middlewares/async');

module.exports = handler(async(req, res) => {
    const userId = req.user.id;
    const schemaId = req.params.id;
    let crops = req.body;

    //Joi
    try {
        for(let crop of crops) {
            await cropsSchema.validateAsync(crop);
         }
    } catch (error) {
        if(error) return res.status(400).send(error.details[0].message);        
    }

    //ajouter verif que user est bien propriétaire du potager
    let schema = await dataMapper.getSchema(schemaId);
    if(schema.user_id !== userId) return res.status(403).json({ message: 'Access denied' });

    //on supprime tous les crops pour le potager
    await dataMapper.deleteCrops(schemaId);

    for(let crop of crops) {
       await dataMapper.createCrop(schemaId, crop);
    }

    schema = await dataMapper.getSchema(schemaId);
    crops = await dataMapper.getCrops(schema.id);
    schema.crops = crops;

    res.json(schema);
});
