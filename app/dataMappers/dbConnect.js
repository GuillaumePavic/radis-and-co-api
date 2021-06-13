const { Pool } = require('pg');

const pool = new Pool();

pool.connect();

module.exports = pool;