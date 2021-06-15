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

exports.getUserByEmail = async (email) => {
    const result = await db.query('SELECT * FROM "user" WHERE "email" = $1', [email]);
    return result.rows[0];
}

exports.getUserById = async (userId) => {
    const result = await db.query('SELECT pseudo, email FROM "user" WHERE id = $1', [userId]);
    return result.rows[0];
}

exports.updateUser = async (userData, userId) => {
    const result = await db.query('UPDATE "user" SET pseudo = $1, email = $2 WHERE id = $3 RETURNING id, pseudo, email', 
    [userData.pseudo, userData.email, userId]);
    return result.rows[0];
}

exports.updatePassword = async (password, userId) => {
    const result = await db.query('UPDATE "user" SET password = $1 WHERE id = $2', [password, userId]);
    return result.rows[0];
}

exports.deleteUser = async(userId) => {
    const result = await db.query('DELETE FROM "user" WHERE id = $1', [userId]);
    return result;

}