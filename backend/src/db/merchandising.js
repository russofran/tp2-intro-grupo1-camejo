const { Pool } = require('pg');
const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
app.use(express.json());
// Enable CORS for frontend communication
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
// });
app.use(cors({
  origin: 'https://tp2-intro-grupo1-camejo-despliegue.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
}));

// Levantar Base de Datos (Necesaria Dependencia Postgresql instalada)

const dbCliente = new Pool({
    connectionString: process.env.DATABASE_URL,
});


// GET

// Solicita todo el merchandising disponible.
async function obtenerMerchandising ( ) {
    const resultado = await dbCliente.query('SELECT * FROM merchandising');
    return resultado.rows;
};

// Solicitar 1 solo merch por id.
async function obtenerUnMerchandising (id) {
    const resultado = await dbCliente.query('SELECT * FROM merchandising WHERE id_merchandising=$1', [id]);
    return resultado.rows[0];
};

// POST

// Agregar merch.

async function agregarMerchandising (
    tipo_merchandising,
    nombre_merchandising,
    marca_merchandising,
    imagen_merchandising,
    precio_merchandising,
    disponible_merchandising,
) {
    const resultado = await dbCliente.query(
        'INSERT INTO merchandising(tipo_merchandising, nombre_merchandising, marca_merchandising, imagen_merchandising, precio_merchandising, disponible_merchandising) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [tipo_merchandising, nombre_merchandising, marca_merchandising, imagen_merchandising, precio_merchandising, disponible_merchandising]);
    if (resultado.rowCount === 0) {
        return undefined
    } else {
        return resultado.rows[0];
    }
}

// PUT
// Actualizar datos de una fila (PUT).
async function actualizarMerchandising(id, valor, campo) {

    const query = `
        UPDATE ONLY merchandising
        SET ${campo} = $2
        WHERE id_merchandising = $1
        RETURNING *
    `;
    const resultado = await dbCliente.query(query, [id, valor]);
    return resultado.rows[0];
}


// DELETE

// Borrar un merch.
async function borrarMerchandising (id, client) {
    const resultado = await client.query('DELETE FROM merchandising WHERE id_merchandising=$1', [id]);
    if (resultado.rowCount === 0) {
        return undefined
    } else {
        return 1;
    }
    
};




module.exports = {
    obtenerMerchandising,
    agregarMerchandising,
    obtenerUnMerchandising,
    actualizarMerchandising,
    borrarMerchandising
};