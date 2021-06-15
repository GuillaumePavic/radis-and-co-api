const dataMapper = require('../dataMappers/dataMapper');
const handler = require('../middlewares/async');
const schemaSchema = require('../validation/schema');

exports.createSchema = handler(async (req, res) => {
    const user_id = req.user.id;
    let schema = req.body;
    schema.user_id = user_id;

    //joi
    try {
        await schemaSchema.validateAsync(schema);
    } catch (error) {
        console.log(error)
        if(error) return res.status(400).send(error.details[0].message);        
    }

    //dataMapper
    schema = await dataMapper.createSchema(schema);

    //res
    res.json(schema);
}); 

exports.getSchema = handler(async (req, res) => {
    const user_id = req.user.id;
    const schemaId = req.params.id;

    const schema = await dataMapper.getSchema(schemaId);
    if(schema.user_id !== user_id) return res.status(403).json({ message: 'Access denied' });

    res.json(schema);
});

exports.updateSchema = handler(async (req, res) => {
    const user_id = req.user.id;
    const schemaId = req.params.id;

    //joi rajouter validation juste pour upadate (dans sans les required)

    let schema = await dataMapper.getSchema(schemaId);
    //ajout 404
    if(schema.user_id !== user_id) return res.status(403).json({ message: 'Access denied' });

    const schemaData = {
        ...schema,
        ...req.body
    };

    schema = await dataMapper.updateSchema(schemaData, schemaId); 

    res.json(schema);

});

exports.deleteSchema = handler(async(req, res) => {
    const user_id = req.user.id;

    let schema = await dataMapper.getSchema(schemaId);
    if(schema.user_id !== user_id) return res.status(403).json({ message: 'Access denied' });

    await dataMapper.deleteSchema(schemaId);

    res.json({ message : 'schema deleted' });


});

exports.getSchemaFromUser = handler(async(req, res) => {
    const user_id = req.user.id;
    
    const schemas = await dataMapper.getSchemaFromUser(user_id);
    //ajout 404

    res.json(schemas);
})

