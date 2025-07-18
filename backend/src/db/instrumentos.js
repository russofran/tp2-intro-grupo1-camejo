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

// Agregar filas a una entidad (POST).

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

// Actualizar datos de una fila (UPDATE).

// Borrar fila/s de una entidad (DELETE).

module.exports = {
    obtenerInstrumentos,
    obtenerUnInstrumento,
    obtenerTipoDeInstrumento,
    agregarInstrumento,
};