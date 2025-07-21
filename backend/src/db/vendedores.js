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

// Obtener que vendió cada vendedor.

async function obtenerVentasVendedores (id) {
    const resultado = await dbCliente.query(
        'SELECT * FROM vendedores v, ventas_concretadas vc, instrumentos i, merchandising m ' +
        'WHERE vc.vendedor_id = v.id_vendedores AND v.id_vendedores = $1', [id]
    );

    const formateo = {};

    // Formateo de salida para todas las ventas que tenga ese vendedor.
    resultado.rows.forEach(row => {
        if (!formateo[row.id]) {
            formateo[(row.id)] = {
                "Vendedor": row.nombre_vendedores,
                "Modelo Instrumento": row.nombre_instrumento,
                "Precio del instrumento": row.precio_instrumento,
                "Modelo merch": row.nombre_merchandising,
                "Precio del Merchandising": row.precio_merchandising,
                "precio de venta acordado": row.precio_real_venta,
                "Dia:": row.fecha_venta
            }
        } 
        
    });
    
      
    return formateo;
};


// Obtener que vendedor vendió más.


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
    obtenerUnVendedor,
    obtenerVentasVendedores

}