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

// CONSULTAS A VENDEDORES
// Solicita todos los vendedores que estén registrados.
async function obtenerVendedores ( ) {
    const resultado = await dbCliente.query('SELECT * FROM vendedores');
    return resultado.rows;
};


// POST

// Agregar vendedor.
async function agregarVendedor (
    turno,
    nombre,
    ventas,
    sucursal,
    calificacion,
    disponible,
) {
    const resultado = await dbCliente.query(
        'INSERT INTO vendedores(turno, nombre, ventas, sucursal, calificacion, disponible) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [turno, nombre, ventas, sucursal, calificacion, disponible]);
    if (resultado.rowCount === 0) {
        return undefined
    } else {
        return resultado.rows[0];
    }
}


// UPDATE

// DELETE

module.exports = {
    obtenerVendedores,
    agregarVendedor,

}