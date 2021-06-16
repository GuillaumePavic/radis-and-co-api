const dataMapper = require('../dataMappers/dataMapper');
const handler = require('../middlewares/async');

module.exports = handler(async(req, res) => {
    let crops = req.body;

    //ajouter verif que user est bien propriétaire du potager


    //on supprime tous les crops pour le potager
    await dataMapper.deleteCrops(crops[0].schema_id);

    for(let crop of crops) {
       await dataMapper.createCrop(crop);
    }

    /*for(crop of crops) {
        (!crop.id) ? await dataMapper.createCrop(crop) : await dataMapper.updateCrop(crop);
    }*/

    const schema = await dataMapper.getSchema(crops[0].schema_id);
    crops = await dataMapper.getCrops(schema.id);
    schema.crops = crops;

    res.json(schema);
});