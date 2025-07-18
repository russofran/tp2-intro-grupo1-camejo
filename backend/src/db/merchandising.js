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


// POST

// Agregar merch.

async function agregarMerchandising (
    tipo,
    nombre,
    marca,
    sucursal,
    disponible,
) {
    const resultado = await dbCliente.query(
        'INSERT INTO merchandising(tipo, nombre, marca, sucursal, disponible) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [tipo, nombre, marca, sucursal, disponible]);
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

}