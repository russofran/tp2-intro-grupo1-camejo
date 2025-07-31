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
        `SELECT *
         FROM ventas_concretadas vc
         JOIN vendedores v ON vc.vendedor_id = v.id_vendedores
         LEFT JOIN instrumentos i ON vc.instrumento_id = i.id_instrumento
         LEFT JOIN merchandising m ON vc.merch_id = m.id_merchandising
         WHERE v.id_vendedores = $1`,
        [id]
    );

    const formateo = {};

    resultado.rows.forEach(row => {
        if (!formateo[row.id]) {
            formateo[row.id] = {
                instrumento: row.nombre_instrumento || row.instrumento_borrado || null,
                precio_instrumento: row.precio_instrumento || null,
                merch: row.nombre_merchandising || row.merchandising_borrado || null,
                precio_merch: row.precio_merchandising || null,
                precio_acordado: row.precio_real_venta,
                fecha: row.fecha_venta
            };
        };
    });


    return formateo;
}


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
async function actualizarVendedor(id, turno, nombre, ventas, sucursal, calificacion, disponible) {
    // undefined o el valor que llegue del input que no fue activado
    function convertirNull(valor) {
        return valor === undefined ? null : valor;
    }
 

    let turno_vendedores = convertirNull(turno);
    let nombre_vendedores = convertirNull(nombre);
    let sucursal_vendedores = convertirNull(sucursal);
    let ventas_vendedores = convertirNull(ventas);
    let calificacion_vendedores = convertirNull(calificacion);
    
    // validación
    if (id === undefined) {
        return undefined
    };

    // COALESCE(valor_1, valor_2) # Si valor_1 es null, poner valor 2. (Valor 2 es el valor existente) 
    const query = `
        UPDATE vendedores
        SET
            turno_vendedores = COALESCE($2, turno_vendedores),
            nombre_vendedores = COALESCE($3, nombre_vendedores),
            ventas_vendedores = COALESCE($4, ventas_vendedores),
            sucursal_vendedores = COALESCE($5, sucursal_vendedores),
            calificacion_vendedores = COALESCE($6, calificacion_vendedores),
            disponible_vendedores = COALESCE($7, disponible_vendedores)
        WHERE id_vendedores = $1
        RETURNING *;
    `;

    const valores = [
        id,
        turno_vendedores || null,
        nombre_vendedores || null,
        ventas_vendedores || null,
        sucursal_vendedores || null,
        calificacion_vendedores || null,
        (disponible === undefined ? null : disponible)
    ];


    const resultado = await dbCliente.query(query, valores);
    return resultado.rows[0];
};

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
// Borrar un vendedor.
async function borrarVendedor (id, client) {
    const resultado = await client.query('DELETE FROM vendedores WHERE id_vendedores=$1', [id]);
    if (resultado.rowCount === 0) {
        return undefined
    } else {
        return 1;
    }
    
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