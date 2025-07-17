const { Pool } = require('pg');

// Levantar Base de Datos (Necesaria Dependencia Postgresql instalada)

const dbCliente = new Pool({
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'tienda_de_musica',
});

// Querys a la db.

// Obtener Información (GET).

// CONSULTAS A INSTRUMENTOS.
// Solicita todos los instrumentos con sus respectivas características.
async function obtenerInstrumentos ( ) {
    const resultado = await dbCliente.query('SELECT * FROM instrumentos');
    return resultado.rows;
};

// Solicitar 1 solo instrumento.
async function obtenerUnInstrumento (numero) {
    const resultado = await dbCliente.query('SELECT * FROM instrumentos WHERE instrumentos.id=$1', [numero]);
    return resultado.rows[0];
};

// Solicitar tipo de instrumento.
async function obtenerTipoDeInstrumento (tipo) {
    const resultado = await dbCliente.query('SELECT * FROM instrumentos WHERE instrumentos.tipo=$1', [tipo]);
    return resultado.rows;
};

// CONSULTAS A MERCHANDISING
// Solicita todo el merchandising disponible.
async function obtenerMerchandising ( ) {
    const resultado = await dbCliente.query('SELECT * FROM merchandising');
    return resultado.rows;
};

// CONSULTAS A VENDEDORES
// Solicita todos los vendedores que estén registrados.
async function obtenerVendedores ( ) {
    const resultado = await dbCliente.query('SELECT * FROM vendedores');
    return resultado.rows;
};

// CONSULTAS A VENTAS_CONCRETADAS
// Solicita todas las ventas_concretadas.
async function obtenerVentas ( ) {
    const resultado = await dbCliente.query('SELECT * FROM ventas_concretadas');
    return resultado.rows;
};


// Agregar filas a una entidad (POST).
// INSTRUMENTOS

// Agregar un instrumento
async function agregarInstrumento (
    tipo,
    nombre,
    marca,
    modelo,
    precio,
    sucursal,
    disponible
) {
    const resultado = await dbCliente.query(
        'INSERT INTO instrumentos(tipo, nombre, marca, modelo, precio, sucursal, disponible) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [tipo, nombre, marca, modelo, precio, sucursal, disponible]);
    if (resultado.rowCount === 0) {
        return undefined
    } else {
        return resultado.rows[0];
    }
}

/*
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"tipo":"Guitarra eléctrica","nombre":"x", "marca":"Fender", "modelo":"California", "precio":""}' \
  http://localhost:3030/productos/agregarInstrumento

*/
// VENDEDORES
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

// MERCHANDISING
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

// VENTAS_CONCRETADAS
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

// Actualizar datos de una fila (UPDATE).

// Borrar fila/s de una entidad (DELETE).

module.exports = {
    obtenerInstrumentos,
    obtenerVendedores,
    obtenerMerchandising,
    obtenerVentas,
    obtenerUnInstrumento,
    obtenerTipoDeInstrumento,
    crearVentaConcretada,
    agregarInstrumento,
    agregarVendedor,
    agregarMerchandising
};