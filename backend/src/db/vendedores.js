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
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
}));

// Levantar Base de Datos (Necesaria Dependencia Postgresql instalada)

// Database configuration
const dbCliente = new Pool({
    connectionString: process.env.DATABASE_URL,
});



const { actualizarVendedorDespedido } = require('./ventas_concretadas');

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
async function obtenerVendedorTop ( ) {
    const resultado = await dbCliente.query(
        'SELECT * FROM vendedores WHERE id_vendedores=$1', [instrumento_param_id_edit]
    );
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


// Actualizar datos de una fila (PUT).
async function actualizarVendedor(id, valor, campo) {

    const query = `
        UPDATE ONLY vendedores
        SET ${campo} = $2
        WHERE id_vendedores = $1
        RETURNING *
    `;
    const resultado = await dbCliente.query(query, [id, valor]);
    return resultado.rows[0];
}

// Sumar +1 en ventas_vendedores.
async function sumarVentaVendedor(id) {

    const query = `
        UPDATE ONLY vendedores
        SET ventas_vendedores = ventas_vendedores + 1
        WHERE id_vendedores = $1
        RETURNING *
    `;
    const resultado = await dbCliente.query(query, [id]);
    return resultado.rows[0];
}


// DELETE
async function borrarVendedor (id, valor) {
    
    await actualizarVendedorDespedido(id, valor);

    const resultado = await dbCliente.query('DELETE FROM vendedores WHERE id_vendedores=$1', [id]);

    if (resultado.rowCount === 0) {
        return undefined
    } else {
        return resultado.rows;
    };
};



module.exports = {
    obtenerVendedores,
    agregarVendedor,
    obtenerUnVendedor,
    obtenerVentasVendedores,
    actualizarVendedor,
    sumarVentaVendedor,
    borrarVendedor

}