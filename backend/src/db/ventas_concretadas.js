const { Pool } = require('pg');
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();

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


// Solicita todas las ventas_concretadas.
async function obtenerVentas ( ) {
    const resultado = await dbCliente.query('SELECT * FROM ventas_concretadas');
    return resultado.rows;
};

// Solicitar una venta_concretada con detalles.

async function obtenerUnaVenta (id) {
    const query = `
        SELECT vc.id,
               vc.tipo,
               vc.instrumento_borrado,
               vc.merchandising_borrado,
               vc.vendedor_despedido,
               vc.precio_real_venta,
               vc.fecha_venta,
               i.id_instrumento,
               i.nombre_instrumento,
               i.modelo_instrumento,
               m.id_merchandising,
               m.tipo_merchandising,
               m.nombre_merchandising,
               v.id_vendedores,
               v.nombre_vendedores
        FROM ventas_concretadas vc
        LEFT JOIN instrumentos i ON vc.instrumento_id = i.id_instrumento
        LEFT JOIN merchandising m ON vc.merch_id = m.id_merchandising
        LEFT JOIN vendedores v ON vc.vendedor_id = v.id_vendedores
        WHERE vc.id = $1
    `;
    
    const resultado = await dbCliente.query(query, [id]);

    if (resultado.rows.length === 0) return undefined; // Si no hay venta

    const row = resultado.rows[0];

    const venta_detallada = {
        id: row.id,
        tipo_venta: row.tipo,
        instrumento_vendido: row.nombre_instrumento,
        instrumento_borrado: row.instrumento_borrado,
        merchandising_vendido: row.nombre_merchandising,
        merchandising_borrado: row.merchandising_borrado,
        vendedor: row.nombre_vendedores,
        vendedor_despedido: row.vendedor_despedido,
        precio_real_venta: row.precio_real_venta,
        fecha: row.fecha_venta
    };

    return venta_detallada;
};


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
};



async function agregarInstrumentoBorrado (id, valor, client) {

    const query = `
        UPDATE ONLY ventas_concretadas
        SET instrumento_borrado = $2
        WHERE instrumento_id = $1
        RETURNING *
    `;
    const resultado = await client.query(query, [id, valor]);
    return resultado.rows;
};

async function agregarMerchandisingBorrado (id, valor, client) {

    const query = `
        UPDATE ONLY ventas_concretadas
        SET merchandising_borrado = $2
        WHERE merch_id = $1
        RETURNING *
    `;
    const resultado = await client.query(query, [id, valor]);
    return resultado.rows;
};

async function agregarVendedorDespedido (id, valor, client) {

    const query = `
        UPDATE ONLY ventas_concretadas
        SET vendedor_despedido = $2
        WHERE vendedor_id = $1
        RETURNING *
    `;
    const resultado = await client.query(query, [id, valor]);
    return resultado.rows;
};


// Actualizar Ventas de cada usuario


// DELETE

// Borrar un instrumento.
async function borrarVentaConcretada (id) {
    const resultado = await dbCliente.query('DELETE FROM ventas_concretadas WHERE id=$1', [id]);
    if (resultado.rowCount === 0) {
        return undefined
    } else {
        return resultado.rows;
    }
    
};


module.exports = {
    obtenerVentas,
    obtenerUnaVenta,
    crearVentaConcretada,
    actualizarVentaConcretada,
    borrarVentaConcretada,
    agregarInstrumentoBorrado,
    agregarMerchandisingBorrado,
    agregarVendedorDespedido
};