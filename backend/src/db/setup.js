const fs = require('fs');
const path = require('path');
require('dotenv').config();
const { Pool } = require('pg');
const express = require('express');
const app = express();
app.use(express.json());
// Enable CORS for frontend communication
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});


const dbCliente = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function ejecutarInitSQL() {
  try {
    const initPath = path.join(__dirname, 'init.sql');
    const sql = fs.readFileSync(initPath).toString();
    await dbCliente.query(sql);
    console.log('Base de datos inicializada');
  } catch (err) {
    console.error('Error al inicializar base de datos:', err);
  } finally {
    await dbCliente.end();
  }
}

ejecutarInitSQL();