const { application } = require('express');
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

// Solicita todas las ventas_concretadas.
async function obtenerVentas ( ) {
    const resultado = await dbCliente.query('SELECT * FROM ventas_concretadas');
    return resultado.rows;
};

// Solicitar una venta_concretada con detalles.

async function obtenerUnaVenta (id) {
    const resultado = await dbCliente.query(
        'SELECT * FROM ventas_concretadas vc, instrumentos i, vendedores v, merchandising m ' +
        'WHERE vc.id = $1', [id]
    );

    const venta_detallada = {};

    // Formateo de salida.
    venta_detallada[(resultado.rows[0].id)] = {
        "tipo_venta": resultado.rows[0].tipo,
        "instrumento_vendido": resultado.rows[0].nombre_instrumento,
        "modelo instrumento": resultado.rows[0].modelo_instrumento,
        "merch_vendido": resultado.rows[0].tipo_merchandising,
        "modelo merch": resultado.rows[0].nombre_merchandising,
        "vendedor": resultado.rows[0].nombre_vendedores,
        "precio_total": resultado.rows[0].precio_real_venta
    }
      
    return venta_detallada
}

// POST


// Crear una nueva venta_concretada
async function crearVentaConcretada (
    tipo,
    vendedor_id,
    instrumento_id,
    merch_id,
    precio_real_venta,

) {
    // Formato Fecha exacta del insert.
    const fecha_venta = new Date();

    const resultado = await dbCliente.query(
        'INSERT INTO ventas_concretadas(tipo, vendedor_id, instrumento_id, merch_id, precio_real_venta, fecha_venta) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [tipo, vendedor_id, instrumento_id, merch_id, precio_real_venta, fecha_venta]);

    if (resultado.rowCount === 0) {
        return undefined
    } else {
        return resultado.rows[0];
    }
}

// PUT

async function actualizarVentaConcretada(id, valor, campo) {

    const query = `
        UPDATE ONLY ventas_concretadas
        SET ${campo} = $2
        WHERE id = $1
        RETURNING *
    `;
    const resultado = await dbCliente.query(query, [id, valor]);
    return resultado.rows[0];
}


// Actualizar Ventas de cada usuario


/* Pseudocodigo

Query> Extraer lo necesario de la base de datos.
- Tablas
. id_vendedores
. 

*/

// DELETE



module.exports = {
    obtenerVentas,
    obtenerUnaVenta,
    crearVentaConcretada,
    actualizarVentaConcretada
}