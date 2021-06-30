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
    const result = await db.query('SELECT "id", "pseudo", "email", "is_admin", "password" FROM "user" WHERE id = $1', [userId]);
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
exports.createSchema = async (schema, user_id) => {
    const result = await db.query('INSERT INTO "schema" ("name", "length", "width", "user_id") VALUES ($1, $2, $3, $4) RETURNING "id", "name", "length", "width"', 
    [schema.name, schema.length, schema.width, user_id]);

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
exports.createCrops = async (schemaId, crop) => {
    const results = await db.query('INSERT INTO "schema_has_plant" ("schema_id", "plant_id", "coord_x", "coord_y") VALUES ($1, $2, $3, $4)',
    [schemaId, crop.plant_id, crop.coord_x, crop.coord_y]);
    return results.rows[0];
}

exports.deleteCrops = async (schemaId) => {
    const results = await db.query('DELETE FROM "schema_has_plant" WHERE "schema_id" = $1', [schemaId]);
    return results.rows;
}

exports.getCrops = async (schemaId) => {
    const results = await db.query('SELECT * FROM "schema_has_plant" WHERE "schema_id" = $1', [schemaId]);
    return results.rows;
}


//Admin
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
    const query = `
    INSERT INTO "plant" ("name", "scientific_name", "sun", "water", "icon", "image", "description", "size", "companion_pos", "companion_neg", "type_id")
    VALUES ($1, $2,$3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`;

    const result = await db.query(query, [plant.name, plant.scientific_name, plant.sun, plant.difficulty, plant.water, plant.icon, 
        plant.image, plant.description, plant.size, plant.companion_pos, plant.companion_neg, plant.type_id]);
    return result.rows[0];
}

exports.updatePlant = async (plant, plantId) => {
    const query = `
    UPDATE "plant" 
    SET
    "name" = $1, 
    "scientific_name" = $2,
    "sun" = $3,
    "difficulty" = $4,
    "water" = $5,
    "icon" = $6,
    "image" = $7,
    "description" = $8,
    "size" = $9,
    "companion_pos" = $10,
    "companion_neg" = $11,
    "type_id" = $12
    WHERE id = $13
    RETURNING *
    `;
    const result = await db.query(query, [plant.name, plant.scientific_name, plant.sun, plant.difficulty, plant.water, plant.icon, 
        plant.image, plant.description, plant.size, plant.companion_pos, plant.companion_neg, plant.type_id, plantId]);
    
    return result.rows[0];
}


exports.deletePlant = async (plantId) => {
    const result = await db.query('DELETE FROM "plant" WHERE id = $1', [plantId]);
    return result;
}


//admin types
exports.getAllTypes = async () => {
    const results = await db.query('SELECT * FROM "type"');
    return results.rows;
}

exports.getType = async (typeId) => {
    const result = await db.query('SELECT * FROM "type" WHERE id = $1', [typeId]);
    return result.rows[0];
}

exports.createType = async (typeLabel) => {
    const result = await db.query('INSERT INTO "type" ("label") VALUES ( $1) RETURNING *', [typeLabel]);
    return result.rows[0];
}

exports.updateType = async (newLabel, typeId) => {
    const result = await db.query('UPDATE "type" SET "label" = $1 WHERE id = $2 RETURNING *', [newLabel, typeId]);
    return result.rows[0];
}

exports.deleteType = async (typeId) => {
    const result = await db.query('DELETE FROM "type" WHERE id = $1', [typeId]);
    return result;
}