//Connection db
require('dotenv').config({path: '../.env'});
const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    /*ssl: {
      rejectUnauthorized: false
    }*/
  });

//données JSON
const plants = require('./json/plants.json');
const types = require('./json/types.json');

//méthodes de seeding
const seeding = {
    plant: async (data) => {
        try {
            await pool.query(`SELECT * FROM add_plant($1)`, [data]);
        } catch (error) {
            console.log(error)
        }
    },

    types: async (data) => {
        try {
            await pool.query(`SELECT * FROM add_type($1)`, [data]);
        } catch (error) {
            console.log(error)
        }
    }
}

//fonction d'import des données
async function importData() {
    try {
        await pool.connect();
        console.log('db connected');
    
        for(let type of types) {
            await seeding.types(type);
        }
    
        for(let plant of plants) {
            await seeding.plant(plant);
        }
        
        console.log('seeding done');
        process.exit(1);
    } catch (error) {
        console.log(error);
    }
}

importData();

