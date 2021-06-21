const db = require('./dbConnect');

//Plants
exports.getAllPlants = async () => {
    const results = await db.query('SELECT * FROM plants_with_companions');
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
    const result = await db.query('SELECT pseudo, email, password FROM "user" WHERE id = $1', [userId]);
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


//Schemas
exports.createSchema = async (schema) => {
    const result = await db.query('INSERT INTO "schema" ("name", "length", "width", "user_id") VALUES ($1, $2, $3, $4) RETURNING "id", "name", "length", "width"', 
    [schema.name, schema.length, schema.width, schema.user_id]);

    return result.rows[0];
}

exports.getSchema = async (schemaId) => {
    const result = await db.query('SELECT "id", "name", "length", "width", "user_id" FROM "schema" WHERE id = $1', [schemaId]);
    return result.rows[0];
}

exports.getSchemaFromUser = async (user_id) => {
    const results = await db.query('SELECT "id", "name" FROM "schema" WHERE "user_id" = $1', [user_id]);
    return results.rows;
}

exports.updateSchema = async (schemaData, schemaId) => {
    const result = await db.query('UPDATE "schema" SET "name" = $1, "length" = $2, "width" = $3 WHERE id = $4 RETURNING "id", "name", "length", "width"',
    [schemaData.name, schemaData.length, schemaData.width, schemaId]);
    return result.rows[0];
}

exports.deleteSchema = async (schemaId) => {
    const result = await db.query('DELETE FROM "schema" WHERE "id" = $1', [schemaId]);
    return result;
}


//Crops
exports.createCrop = async (schema_id, crop) => {
    await db.query('INSERT INTO "schema_has_plant" ("schema_id", "plant_id", "coord_x", "coord_y") VALUES ($1, $2, $3, $4)',
    [schema_id, crop.plant_id, crop.coord_x, crop.coord_y]);
}

exports.getCrops = async (schemaId) => {
    const results = await db.query('SELECT * FROM "schema_has_plant" WHERE "schema_id" = $1', [schemaId]);
    return results.rows;
} 

exports.deleteCrops = async (schema_id) => {
    await db.query('DELETE FROM "schema_has_plant" WHERE "schema_id" = $1', [schema_id]);
}

exports.updateCrop = async (crop) => {
    await db.query('UPDATE "schema_has_plant" SET "coord_x" = $1, "coord_y" = $2 WHERE id = $3',
    [crop.coord_x, crop.coord_y, crop.id]);
}


//admin
exports.getAllUsers = async () => {
    const results = await db.query('SELECT id, pseudo, email, is_admin FROM "user"');
    return results.rows;
}

exports.createAdmin = async (userId) => {
    const result = await db.query('UPDATE "user" SET is_admin = true WHERE id = $1 RETURNING email, is_admin', [userId]);
    return result.rows[0];
}

exports.removeAdmin = async (adminId) => {
    const result = await db.query('UPDATE "user" SET is_admin = false WHERE id = $1 RETURNING email, is_admin', [adminId]);
    return result.rows[0];
}

exports.deleteUser = async (userId) => {
    const result = await db.query('DELETE FROM "user" WHERE id = $1', [userId]);
    return result;
}

//admin plants
exports.createPlant = async (plant) => {
    const result = await db.query('SELECT * FROM add_plant($1)', [plant]);
    return result;
}

exports.uppdatePlant = async (plant) => {
    const result = await db.query('SELECT * FROM update_plant($1)', [plant]);
    return result;
}


exports.deletePlant = async (plantId) => {
    const result = await db.query('DELETE FROM "plant" WHERE id = $1', [plant]);
    return result;
}
