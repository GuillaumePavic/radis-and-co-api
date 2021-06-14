const db = require('./dbConnect');

//Plants
exports.getAllPlants = async () => {
    const results = await db.query('SELECT * FROM plant');
    return results.rows;
}

exports.getPlant = async (plantId) => {
    const result = await db.query('SELECT * FROM plant WHERE id=$1', [plantId]);
    return result.rows[0];
}

//Users
exports.createUser = async (user) => {
    const result = await db.query('INSERT INTO "user" ("pseudo", "email", "password") VALUES ($1, $2, $3) RETURNING *', [user.pseudo, user.email, user.password]);
    return result.rows[0];
}

exports.getUser = async (email) => {
    const result = await db.query('SELECT * FROM "user" WHERE "email" = $1', [email]);
    return result.rows[0];
}
