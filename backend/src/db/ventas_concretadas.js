const { Pool } = require('pg');

// Levantar Base de Datos (Necesaria Dependencia Postgresql instalada)

const dbCliente = new Pool({
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'tienda_de_musica',
});

const { obtenerUnInstrumento} = require('./instrumentos')

const { obtenerUnMerchandising } = require('./merchandising')

const { obtenerUnVendedor } = require('./vendedores')
 
// GET

// Solicita todas las ventas_concretadas.
async function obtenerVentas ( ) {
    const resultado = await dbCliente.query('SELECT * FROM ventas_concretadas');
    return resultado.rows;
};

// Solicitar una venta_concretada con detalles.

async function obtenerUnaVenta (id) {
    const resultado = await dbCliente.query(
        'SELECT i.id as id_instrumento, i. i.* FROM ventas_concretadas WHERE id = $1 LIMIT 1' 
        
        , [id]
    );
    
    const venta_concretada = resultado.rows[0];

    if (!venta_concretada) {
        return undefined;
    }

    // Obtener una venta concretada con detalles.

    if (venta_concretada.instrumento_id) {
        const instrumento_detallado = await obtenerUnInstrumento(venta_concretada.instrumento_id);
        venta_concretada.instrumento_id = instrumento_detallado || null;

    }
    if (venta_concretada.merch_id) {
        const merchandising_detallado = await obtenerUnMerchandising(venta_concretada.merch_id);
        venta_concretada.merch_id = merchandising_detallado.rows || null;

    }
    if (venta_concretada.vendedor_id) {
        const vendedor_detallado = await obtenerUnVendedor(venta_concretada.vendedor_id);
        // venta_concretada.vendedor_id = vendedor_detallado.rows || null;
        console.log("vendedor_detallado:", vendedor_detallado);
    }

    return venta_concretada;

}

// POST

// Crear una nueva venta_concretada
async function crearVentaConcretada (
    tipo,
    vendedor_id,
    instrumento_id,
    merch_id,
    precio_real_venta,
    turno
) {
    const resultado = await dbCliente.query(
        'INSERT INTO ventas_concretadas(tipo, vendedor_id, instrumento_id, merch_id, precio_real_venta, turno) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [tipo, vendedor_id, instrumento_id, merch_id, precio_real_venta, turno]);
    if (resultado.rowCount === 0) {
        return undefined
    } else {
        return resultado.rows[0];
    }
}

// UPDATE

// DELETE

module.exports = {
    obtenerVentas,
    obtenerUnaVenta,
    crearVentaConcretada,
}