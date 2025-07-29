const fs = require('fs');
const path = require('path');
require('dotenv').config();
const cors = require('cors');
const { Pool } = require('pg');
const express = require('express');
const app = express();
app.use(express.json());
// Enable CORS for frontend communication
app.use(cors({
  origin: 'https://tp2-intro-grupo1-camejo-despliegue.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
}));

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