const { Pool } = require('pg');

// Levantar Base de Datos (Necesaria Dependencia Postgresql instalada)

const dbCliente = new Pool({
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'tienda_de_musica',
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
    disponible_merchandising,
) {
    const resultado = await dbCliente.query(
        'INSERT INTO merchandising(tipo_merchandising, nombre_merchandising, marca_merchandising, sucursal_merchandising, disponible_merchandising) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [tipo_merchandising, nombre_merchandising, marca_merchandising, sucursal_merchandising, disponible_merchandising]);
    if (resultado.rowCount === 0) {
        return undefined
    } else {
        return resultado.rows[0];
    }
}

// UPDATE

// DELETE



module.exports = {
    obtenerMerchandising,
    agregarMerchandising,
    obtenerUnMerchandising

}