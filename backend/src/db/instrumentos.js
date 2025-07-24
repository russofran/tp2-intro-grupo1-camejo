const { Pool } = require('pg');

// Levantar Base de Datos (Necesaria Dependencia Postgresql instalada)

require('dotenv').config();
const dbCliente = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

// Querys a la db.

// Obtener Información (GET).

// Solicita todos los instrumentos con sus respectivas características.
async function obtenerInstrumentos ( ) {
    const resultado = await dbCliente.query('SELECT * FROM instrumentos');
    return resultado.rows;
};

// Solicitar 1 solo instrumento.
async function obtenerUnInstrumento (id) {
    const resultado = await dbCliente.query('SELECT * FROM instrumentos WHERE id_instrumento=$1', [id]);
    return resultado.rows[0];
};

// Solicitar tipo de instrumento.
async function obtenerTipoDeInstrumento (tipo) {
    const resultado = await dbCliente.query('SELECT * FROM instrumentos WHERE instrumentos.tipo_instrumento=$1', [tipo]);
    return resultado.rows[0];
};

// Agregar filas a una entidad (POST).

// Agregar un instrumento
async function agregarInstrumento (
    tipo_instrumento,
    nombre_instrumento,
    marca_instrumento,
    modelo_instrumento,
    precio_instrumento,
    imagen_instrumento,
    disponible_instrumento
) {
    const resultado = await dbCliente.query(
        'INSERT INTO instrumentos(tipo_instrumento, nombre_instrumento, marca_instrumento, modelo_instrumento, precio_instrumento, imagen_instrumento, disponible_instrumento) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [tipo_instrumento, nombre_instrumento, marca_instrumento, modelo_instrumento, precio_instrumento, imagen_instrumento, disponible_instrumento]);
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

// Actualizar datos de una fila (PUT).
async function actualizarInstrumento(id, valor, campo) {

    const query = `
        UPDATE ONLY instrumentos
        SET ${campo} = $2
        WHERE id_instrumento = $1
        RETURNING *
    `;
    const resultado = await dbCliente.query(query, [id, valor]);
    return resultado.rows[0];
}

// Borrar fila/s de una entidad (DELETE).

// Borrar un instrumento.
async function borrarInstrumento (id) {
    const resultado = await dbCliente.query('DELETE FROM instrumentos WHERE id_instrumento=$1', [id]);

    if (resultado.rowCount === 0) {
        return undefined
    } else {
        return resultado.rows;
    }
    
};




module.exports = {
    obtenerInstrumentos,
    obtenerUnInstrumento,
    obtenerTipoDeInstrumento,
    agregarInstrumento,
    borrarInstrumento,
    actualizarInstrumento
};