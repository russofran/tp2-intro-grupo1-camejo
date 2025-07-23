const { Pool } = require('pg');

// Levantar Base de Datos (Necesaria Dependencia Postgresql instalada)

require('dotenv').config();
const dbCliente = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
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
    sucursal_merchandising,
    precio_merchandising,
    disponible_merchandising,
) {
    const resultado = await dbCliente.query(
        'INSERT INTO merchandising(tipo_merchandising, nombre_merchandising, marca_merchandising, sucursal_merchandising, precio_merchandising, disponible_merchandising) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [tipo_merchandising, nombre_merchandising, marca_merchandising, sucursal_merchandising, precio_merchandising, disponible_merchandising]);
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



module.exports = {
    obtenerMerchandising,
    agregarMerchandising,
    obtenerUnMerchandising,
    actualizarMerchandising

}