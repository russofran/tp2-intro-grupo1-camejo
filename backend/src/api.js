// imports
const { Pool } = require('pg');
const express = require('express');
const path = require('path');
const cors = require('cors');

// db
const dbCliente = new Pool({
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'tienda_de_musica',
});


const app = express();
const port = 3030;

app.listen(port, '0.0.0.0', () => {
  console.log('Servidor corriendo en el puerto 3030');
});
app.use(cors());

app.use(express.json());




// Funciones de db
const {
    obtenerInstrumentos,
    obtenerUnInstrumento,
    obtenerTipoDeInstrumento,
    agregarInstrumento,
    borrarInstrumento,
    actualizarInstrumento
} = require('./db/instrumentos')

const {
    obtenerMerchandising,
    agregarMerchandising,
    obtenerUnMerchandising,
    actualizarMerchandising,
    borrarMerchandising
} = require('./db/merchandising')

const {
    obtenerVendedores,
    agregarVendedor,
    obtenerUnVendedor,
    obtenerVentasVendedores,
    actualizarVendedor,
    borrarVendedor,
    sumarVentaVendedor

} = require('./db/vendedores')

const {
    obtenerVentas,
    obtenerUnaVenta,
    crearVentaConcretada,
    actualizarVentaConcretada,
    borrarVentaConcretada
} = require('./db/ventas_concretadas')

// funcion solo para manejar datos.

async function obtenerTodo ( ) {
    const instrumentos = await dbCliente.query(
        'SELECT id_instrumento as id, nombre_instrumento as nombre, precio_instrumento as precio FROM instrumentos WHERE disponible_instrumento = true'
    );
    const vendedores = await dbCliente.query(
        'SELECT id_vendedores as id, nombre_vendedores as nombre FROM vendedores WHERE disponible_vendedores = true'
    );
    const merchandising = await dbCliente.query(
        'SELECT id_merchandising as id, nombre_merchandising as nombre, precio_merchandising as precio FROM merchandising WHERE disponible_merchandising = true'
    );

    if (instrumentos === undefined ||
        vendedores === undefined ||
        merchandising === undefined) {
            res.status(500).json({ error: 'Error al obtener datos' });
        }
    
    const resultado = {
        instrumentos: instrumentos.rows,
        merchandising: merchandising.rows,
        vendedores: vendedores.rows
    };
    return resultado;
};


// endpoints
// obtener todos los datos de instrumentos merch y vendedores.

app.get('/admin/todo', async (req, res) => {
    const dataTodo = await obtenerTodo();
    res.json(dataTodo);
});

// GET. 

// GET TABLA INSTRUMENTOS
// Obtener todos los instrumentos.
app.get('/productos/instrumentos', async (req, res) => {
    const instrumentos = await obtenerInstrumentos();
    res.json(instrumentos);
});

// Obtener un Instrumento.
app.get('/productos/instrumentos/:numero', async (req, res) => {
    let instrumento = await obtenerUnInstrumento(req.params.numero);
    if (instrumento === undefined) {
        res.sendStatus(404);
    };
    res.json(instrumento);
});

// Obtener todos los instrumentos de un tipo en especifico.
app.get('/productos/instrumentos/:tipo', async (req, res) => {
    let instrumentos = await obtenerTipoDeInstrumento(req.params.tipo);
    if (instrumentos === undefined) {
        res.sendStatus(404);
    };
    res.json(instrumentos);
});


// GET TABLA MERCHANDISING.
// Obtener todo el merchandising.
app.get('/productos/merchandising', async (req, res) => {
    const merchandising = await obtenerMerchandising();
    res.json(merchandising);
});

// Obtener un Merchandising.
app.get('/productos/merchandising/:numero', async (req, res) => {
    let merchandising = await obtenerUnMerchandising(req.params.numero);
    if (merchandising === undefined) {
        res.sendStatus(404);
    };
    res.json(merchandising);
});
// GET TABLA VENDEDORES.
// Obtener todos los vendedores.
app.get('/admin/vendedores', async (req, res) => {
    const vendedores = await obtenerVendedores();
    res.json(vendedores);
});

// Obtener las ventas que hizo un vendedor
app.get('/admin/vendedores/:id', async (req, res) => {
    const vendedores = await obtenerVentasVendedores(req.params.id);
    res.json(vendedores);
});


// GET TABLA VENTAS_CONCRETADAS.
// Obtener ventas concretadas.
app.get('/admin/ventas_concretadas', async (req, res) => {
    const ventas_concretadas = await obtenerVentas();
    res.json(ventas_concretadas);
});

// Obtener una venta detallada.
app.get('/admin/ventas_concretadas/:id', async (req, res) => {
    const venta_concretada = await obtenerUnaVenta(req.params.id);
    res.json(venta_concretada);
});


// POST.

// POST TABLA INSTRUMENTOS
// Agregar un instrumento
app.post('/admin/productos/agregarInstrumento', async (req, res) => {
    // En caso de que no mande nada en el INSERT
    if (!req.body.tipo_instrumento ||
        req.body.nombre_instrumento === undefined ||
        !req.body.marca_instrumento ||
        !req.body.modelo_instrumento ||
        req.body.precio_instrumento === undefined ||
        !req.body.imagen_instrumento ||
        req.body.disponible_instrumento === undefined) {
            return res.status(400).send('Error, falta un campo obligatorio.');
        };

    const instrumento = await agregarInstrumento(
        req.body.tipo_instrumento,
        req.body.nombre_instrumento,
        req.body.marca_instrumento,
        req.body.modelo_instrumento,
        req.body.precio_instrumento,
        req.body.imagen_instrumento,
        req.body.disponible_instrumento,
    );

    if (!instrumento) {
        return res.status(500).json({ error: 'No se creó el instrumento.' }); 
    };
    
    res.json(instrumento);
});

/* curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"username":"xyz","password":"xyz"}' \
  http://wsl.localhost:3030/admin/productos/agregarMerchandising

*/

// POST TABLA VENDEDORES
// Agregar Vendedor
app.post('/admin/staff/agregarVendedor', async (req, res) => {
    // En caso de que no mande nada en el INSERT
    if (!req.body.turno_vendedores ||
        !req.body.nombre_vendedores ||
        req.body.ventas_vendedores === undefined ||
        !req.body.sucursal_vendedores ||
        req.body.calificacion_vendedores === undefined ||
        req.body.disponible_vendedores === undefined) {
            return res.status(400).send('Error, falta un campo obligatorio.');
        };

    const vendedor = await agregarVendedor(
        req.body.turno_vendedores,
        req.body.nombre_vendedores,
        req.body.ventas_vendedores,
        req.body.sucursal_vendedores,
        req.body.calificacion_vendedores,
        req.body.disponible_vendedores,
    );

    if (!vendedor) {
        return res.status(500).json({ error: 'No se creó el vendedor.' }); 
    };
    
    res.json(vendedor);
});

// POST TABLA Merchandising
// agregar Merch
app.post('/admin/productos/agregarMerchandising', async (req, res) => {
    // En caso de que no mande nada en el INSERT
    if (!req.body.tipo_merchandising ||
        !req.body.nombre_merchandising ||
        !req.body.marca_merchandising ||
        !req.body.imagen_merchandising ||
        req.body.precio_merchandising === undefined ||
        req.body.disponible_merchandising === undefined) {
            return res.status(400).send('Error, falta un campo obligatorio.');
        };

    const merch = await agregarMerchandising(
        req.body.tipo_merchandising,
        req.body.nombre_merchandising,
        req.body.marca_merchandising,
        req.body.imagen_merchandising,
        req.body.precio_merchandising,
        req.body.disponible_merchandising,
    );

    if (!merch) {
        return res.status(500).json({ error: 'No se creó el Merchandising.' }); 
    };
    
    res.json(merch);
});

// POST TABLA VENTAS_CONCRETADAS
// Agregar venta_concretada
app.post('/carrito/venta_concretada', async (req, res) => {
    // En caso de que no mande nada en el INSERT
    if (!req.body.tipo ||
        !req.body.vendedor_id ||
        (req.body.instrumento_id === undefined && req.body.merch_id === undefined) ||
        req.body.precio_real_venta === undefined) {
            return res.status(400).send('Error, falta un campo obligatorio.');
        };

    const venta_concretada = await crearVentaConcretada(
        req.body.tipo,
        req.body.vendedor_id,
        req.body.instrumento_id,
        req.body.merch_id,
        req.body.precio_real_venta,
    );


    if (!venta_concretada) {
        return res.status(500).json({ error: 'No se creó la venta' });
    };
    
    await sumarVentaVendedor(req.body.vendedor_id);

    res.json(venta_concretada);
});


// UPDATE

// TABLA VENTAS CONCRETADAS
app.put('/admin/ventas_concretadas/actualizar', async (req, res) => {
    // Validar que se manden 3 campos y que id sea >= 1.
    if (req.body.id <= 0 || req.body.valor === undefined || !req.body.campo) {
            return res.status(400).send('Hay un error en los campos.');
        };
    // Validar que no cree nuevas columnas o no deseadas a modificar.
    const columnas_permitidas = [
        'tipo',
        'vendedor_despedido',
        'instrumento_borrado',
        'merchandising_borrado',
        'precio_real_venta',
        'fecha_venta'];

    if (!columnas_permitidas.includes(req.body.campo)) {
        return res.status(400).json({ error: "Nombre de campo inválido." });
    };
    const reemplazar = await actualizarVentaConcretada(
        req.body.id,
        req.body.valor,
        req.body.campo
    );
    
    if (reemplazar === undefined) {
        return res.status(500).json({ error: 'No se pudo actualizar la entidad "Venta_Concretada".' });
    }

    res.json(reemplazar);
    

    });
    

// TABLA INSTRUMENTOS
app.put('/admin/instrumentos/actualizar', async (req, res) => {
    // Validar que se manden 3 campos y que id sea >= 1.
    if (req.body.id <= 0 || req.body.valor === undefined || !req.body.campo) {
            return res.status(400).send('Hay un error en los campos.');
        };
    // Validar que no cree nuevas columnas.
    const columnas_permitidas = [
        'tipo_instrumento',
        'nombre_instrumento',
        'marca_instrumento',
        'modelo_instrumento',
        'precio_instrumento',
        'imagen_instrumento',
        'disponible_instrumento'];

    if (!columnas_permitidas.includes(req.body.campo)) {
        return res.status(400).json({ error: "Nombre de campo inválido." });
    };
    const reemplazar = await actualizarInstrumento(
        req.body.id,
        req.body.valor,
        req.body.campo
    );
    
    if (reemplazar === undefined) {
        return res.status(500).json({ error: 'No se pudo actualizar la entidad "Instrumentos".' }) 
    };

    res.json(reemplazar);
    

    });

// TABLA VENDEDORES
app.put('/admin/vendedores/actualizar', async (req, res) => {
    // Validar que se manden 3 campos y que id sea >= 1.
    if (req.body.id <= 0 || req.body.valor === undefined || !req.body.campo) {
            return res.status(400).send('Hay un error en los campos.')
        };
    // Validar que no cree nuevas columnas.
    const columnas_permitidas = [
        'turno_vendedores',
        'nombre_vendedores',
        'ventas_vendedores',
        'calificacion_vendedores',
        'sucursal_vendedores',
        'disponible_vendedores' ];

    if (!columnas_permitidas.includes(req.body.campo)) {
        return res.status(400).json({ error: "Nombre de campo inválido." });
    };
    const reemplazar = await actualizarVendedor(
        req.body.id,
        req.body.valor,
        req.body.campo
    );
    
    if (reemplazar === undefined) {
        return res.status(500).json({ error: 'No se pudo actualizar la entidad "Vendedores".' }) 
    };

    res.json(reemplazar);
    

    });

// TABLA MERCHANDISING
app.put('/admin/merchandising/actualizar', async (req, res) => {
    // Validar que se manden 3 campos y que id sea >= 1.
    if (req.body.id <= 0 || req.body.valor === undefined || !req.body.campo) {
            return res.status(400).send('Hay un error en los campos.')
        };
    // Validar que no cree nuevas columnas.
    const columnas_permitidas = [
        'tipo_merchandising',
        'nombre_merchandising',
        'marca_merchandising',
        'imagen_merchandising',
        'precio_merchandising',
        'disponible_merchandising' ];

    if (!columnas_permitidas.includes(req.body.campo)) {
        return res.status(400).json({ error: "Nombre de campo inválido." });
    };
    const reemplazar = await actualizarMerchandising(
        req.body.id,
        req.body.valor,
        req.body.campo
    );
    
    if (reemplazar === undefined) {
        return res.status(500).json({ error: 'No se pudo actualizar la entidad "Merchandising".' }) 
    };

    res.json(reemplazar);
    

    });



// DELETE

// TABLA INSTRUMENTOS
// Eliminar instrumento por id.
app.delete('/admin/instrumentos/borrar/:id', async (req, res) => {
    const instrumento = await borrarInstrumento(req.params.id);
    if (instrumento === undefined) {
        return res.status(404).json({ error: "La id " + req.params.id + ' no existe'})
    };

    res.json({ status: "La id " + req.params.id + ' fue eliminada con éxito.'});

});

// TABLA Merchandising
// Eliminar merch por id.
app.delete('/admin/merchandising/borrar/:id', async (req, res) => {
    const merchandising = await borrarMerchandising(req.params.id);
    if (merchandising === undefined) {
        return res.status(404).json({ error: "La id " + req.params.id + ' no existe'})
    };

    res.json({ status: "El Merchandising con La id " + req.params.id + ' fue eliminada con éxito.'});

});

// TABLA VENDEDORES
// Eliminar vendedor por id y reemplazar su nombre en ventas_concretadas.
app.delete('/admin/vendedores/borrar', async (req, res) => {
    if (req.body.id < 0 || !req.body.valor) {
        return res.status(400).send('Hay un error en los campos.');
    }

    const vendedor = await borrarVendedor(req.body.id, req.body.valor);
    if (vendedor === undefined) {
        return res.status(404).json({ error: "La id " + req.params.id + ' no existe'})
    };

    res.json({ status: "El vendedor " + req.body.valor + ' con la id ' + req.body.id + ' fue eliminada con éxito.'});

});

// TABLA VENTAS_CONCRETADAS.


// Eliminar venta por id.
app.delete('/admin/ventas/borrar/:id', async (req, res) => {
    const venta = await borrarVentaConcretada(req.params.id);
    if (venta === undefined) {
        return res.status(404).json({ error: "La id " + req.params.id + ' no existe'})
    };

    res.json({ status: "La venta con la id " + req.params.id + ' fue eliminada con éxito.'});

});



// NOTAS

/* chequear que la id no sea negativa (de todo)
chequear que no cree un mismo elemento dos veces (salvo que lo interprete como que hay mas de un stock)

*/