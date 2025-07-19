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

// Solicitar 1 solo vendedor por id.
async function obtenerUnVendedor (id) {
    const resultado = await dbCliente.query('SELECT * FROM vendedores WHERE id_vendedores=$1', [id]);
    return resultado.rows[0];
};


// POST

// Agregar vendedor.
async function agregarVendedor (
    turno_vendedores,
    nombre_vendedores,
    ventas_vendedores,
    sucursal_vendedores,
    calificacion_vendedores,
    disponible_vendedores,
) {
    const resultado = await dbCliente.query(
        'INSERT INTO vendedores(turno_vendedores, nombre_vendedores, ventas_vendedores, sucursal_vendedores, calificacion_vendedores, disponible_vendedores) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [turno_vendedores, nombre_vendedores, ventas_vendedores, sucursal_vendedores, calificacion_vendedores, disponible_vendedores]);
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
    obtenerUnVendedor

}