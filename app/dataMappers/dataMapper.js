const db = require('./dbConnect');

exports.getAllPlants = async () => {
    const results = await db.query('SELECT * FROM plant');
    return results.rows;
};

exports.getPlant = async (plantId) => {
    const results = await db.query('SELECT * FROM plant WHERE id=$1', [plantId]);
    return results.rows[0];
};