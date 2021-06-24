const dataMapper = require('../dataMappers/dataMapper');
const handler = require('../middlewares/async');
const get404 = require('../utils/404');
const {schemaSchema, updateSchema} = require('../validation/schema');

/*{
	"id": 0,
    "name": "le potager ultime",
    "length": 4,
    "width" : 5,
    "crops": [
    	{
		"plant_id": 2,
		"coord_x": 14,
		"coord_y": 30
	},
	{
		"plant_id": 2,
		"coord_x": 14,
		"coord_y": 30
	}
    	]
}*/

exports.createOrUpdateSchema = handler(async (req, res) => {
    //let schema = req.body;
    const user_id = req.user.id;

    //Joi schema
    /*try {
        await schemaSchema.validateAsync(schema);
    } catch (error) {
        console.log(error)
        if(error) return res.status(400).send(error.details[0].message);        
    }*/

    //Joi Crops
    /*try {
        for(let crop of crops) {
            await cropsSchema.validateAsync(crop);
         }
    } catch (error) {
        if(error) return res.status(400).send(error.details[0].message);        
    }*/
let schema = {}
     //schema has no id
     if(req.body.id === 0) {
        schema = await dataMapper.createSchema(req.body, user_id);
     } else {
        //schema has an id
        schema = await dataMapper.getSchema(req.body.id);
        if(!schema) return get404(res);
        if(schema.user_id !== user_id) return res.status(403).json({ message: 'Accès refusé' });

        schema = await dataMapper.updateSchema(req.body, req.body.id);
     }


    //crops
    //on supprime tous les crops pour le potager
    await dataMapper.deleteCrops(req.body.id);
    for(let crop of req.body.crops) {
    await dataMapper.createCrop(schema.id, crop);
    }

    const crops = await dataMapper.getCrops(schema.id);
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

exports.updateSchema = handler(async (req, res) => {
    const user_id = req.user.id;
    const schemaId = req.params.id;

    //Joi
    try {
        await updateSchema.validateAsync(req.body);
    } catch (error) {
        if(error) return res.status(400).send(error.details[0].message);        
    }

    let schema = await dataMapper.getSchema(schemaId);
    if(!schema) return get404(res);
    if(schema.user_id !== user_id) return res.status(403).json({ message: 'Accès refusé' });

    const schemaData = {
        ...schema,
        ...req.body
    };

    schema = await dataMapper.updateSchema(schemaData, schemaId); 

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

