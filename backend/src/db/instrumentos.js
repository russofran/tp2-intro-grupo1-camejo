const { Pool } = require('pg');
const express = require('express');
require('dotenv').config();
const app = express();
app.use(express.json());
// Enable CORS for frontend communication
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
// });

app.use(cors());
app.options('*', cors());

// Levantar Base de Datos (Necesaria Dependencia Postgresql instalada)
const dbCliente = new Pool({
    connectionString: process.env.DATABASE_URL,
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
async function actualizarInstrumento(id, tipo, nombre, marca, modelo, precio, imagen, disponible) {
    // undefined o el valor que llegue del input que no fue activado
    function convertirNull(valor) {
        return valor === undefined ? null : valor;
    }
 

    let tipo_instrumento = convertirNull(tipo);
    let nombre_instrumento = convertirNull(nombre);
    let marca_instrumento = convertirNull(marca);
    let modelo_instrumento = convertirNull(modelo);
    let precio_instrumento = convertirNull(precio);
    let imagen_instrumento = convertirNull(imagen);
    let disponible_instrumento = convertirNull(disponible);
    
    // validación
    if (id === undefined) {
        return undefined
    };


    // COALESCE(valor_1, valor_2) # Si valor_1 es null, poner valor 2. (Valor 2 es el valor existente) 
    const query = `
        UPDATE instrumentos
        SET
            tipo_instrumento = COALESCE($2, tipo_instrumento),
            nombre_instrumento = COALESCE($3, nombre_instrumento),
            marca_instrumento = COALESCE($4, marca_instrumento),
            modelo_instrumento = COALESCE($5, modelo_instrumento),
            precio_instrumento = COALESCE($6, precio_instrumento),
            imagen_instrumento = COALESCE($7, imagen_instrumento),
            disponible_instrumento = COALESCE($8, disponible_instrumento)
        WHERE id_instrumento = $1
        RETURNING *;
    `;

    const valores = [
        id,
        tipo_instrumento || null,
        nombre_instrumento || null,
        marca_instrumento || null,
        modelo_instrumento || null,
        precio_instrumento || null,
        imagen_instrumento || null,
        (disponible_instrumento === undefined ? null : disponible_instrumento),

    ];


    const resultado = await dbCliente.query(query, valores);
    return resultado.rows[0];
};

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