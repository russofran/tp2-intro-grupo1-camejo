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

async function obtenerInstrumentos ( ) {

    const resultado = await dbCliente.query('SELECT * FROM instrumentos');

    return resultado.rows
};

// Agregar filas a una entidad (POST).

// Actualizar datos de una fila (UPDATE).

// Borrar fila/s de una entidad (DELETE).