const fs = require('fs');
const path = require('path');
require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function ejecutarInitSQL() {
  try {
    const initPath = path.join(__dirname, 'init.sql');
    const sql = fs.readFileSync(initPath).toString();
    await pool.query(sql);
    console.log('Base de datos inicializada');
  } catch (err) {
    console.error('Error al inicializar base de datos:', err);
  } finally {
    await pool.end();
  }
}

ejecutarInitSQL();