// imports
const express = require('express');
const path = require('path');
const app = express();
const port = 3030;

app.listen(port, '0.0.0.0', () => {
  console.log('Servidor corriendo en el puerto 3030');
});

app.use(express.json())

// Vincular la carpeta frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Funciones de db
const {
    obtenerInstrumentos,
    obtenerUnInstrumento,
    obtenerTipoDeInstrumento,
    agregarInstrumento
} = require('./db/instrumentos')

const {
    obtenerMerchandising,
    agregarMerchandising
} = require('./db/merchandising')

const {
    obtenerVendedores,
    obtenerVentasVendedores,
    agregarVendedor,


} = require('./db/vendedores')

const {
    obtenerVentas,
    obtenerUnaVenta,
    crearVentaConcretada
} = require('./db/ventas_concretadas')



// endpoints

// GET. 

// GET TABLA INSTRUMENTOS
// Obtener todos los instrumentos.
app.get('/productos/instrumentos', async (req, res) => {
    const instrumentos = await obtenerInstrumentos();
    res.send(instrumentos);
});

// Obtener un Instrumento.
app.get('/productos/instrumentos/:numero', async (req, res) => {
    let instrumento = await obtenerUnInstrumento(req.params.numero);
    if (instrumento === undefined) {
        res.sendStatus(404);
    };
    res.send(instrumento);
});

// Obtener todos los instrumentos de un tipo en especifico.
app.get('/productos/instrumentos/:tipo', async (req, res) => {
    let instrumentos = await obtenerTipoDeInstrumento(req.params.tipo);
    if (instrumentos === undefined) {
        res.sendStatus(404);
    };
    res.send(instrumentos);
});


// GET TABLA MERCHANDISING.
// Obtener todo el merchandising.
app.get('/productos/merchandising', async (req, res) => {
    const merchandising = await obtenerMerchandising();
    res.send(merchandising);
});

// GET TABLA VENDEDORES.
// Obtener todos los vendedores.
app.get('/admin/vendedores', async (req, res) => {
    const vendedores = await obtenerVendedores();
    res.send(vendedores);
});

// Obtener las ventas que hizo un vendedor
app.get('/admin/vendedores/:id', async (req, res) => {
    const vendedores = await obtenerVentasVendedores(req.params.id);
    res.send(vendedores);
});


// GET TABLA VENTAS_CONCRETADAS.
// Obtener ventas concretadas.
app.get('/admin/ventas_concretadas', async (req, res) => {
    const ventas_concretadas = await obtenerVentas();
    res.send(ventas_concretadas);
});

// Obtener una venta detallada.
app.get('/admin/ventas_concretadas/:id', async (req, res) => {
    const venta_concretada = await obtenerUnaVenta(req.params.id);
    res.send(venta_concretada);
});


// POST.

// TABLA INSTRUMENTOS
// Agregar un instrumento
app.post('/admin/productos/agregarInstrumento', async (req, res) => {
    // En caso de que no mande nada en el INSERT
    if (!req.body.tipo_instrumento ||
        req.body.nombre_instrumento === undefined ||
        !req.body.marca_instrumento ||
        !req.body.modelo_instrumento ||
        req.body.precio_instrumento === undefined ||
        !req.body.sucursal_instrumento ||
        req.body.disponible_instrumento === undefined) {
            return res.status(400).send('Error, falta un campo obligatorio.')
        }

    const instrumento = await agregarInstrumento(
        req.body.tipo_instrumento,
        req.body.nombre_instrumento,
        req.body.marca_instrumento,
        req.body.modelo_instrumento,
        req.body.precio_instrumento,
        req.body.sucursal_instrumento,
        req.body.disponible_instrumento,
    );

    if (!instrumento) {
        return res.status(500).json({ error: 'No se creó el instrumento.' }) 
    }
    
    res.json(instrumento);
});

/* curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"username":"xyz","password":"xyz"}' \
  http://wsl.localhost:3030/admin/productos/agregarMerchandising

*/

// TABLA VENDEDORES
// Agregar Vendedor
app.post('/admin/staff/agregarVendedor', async (req, res) => {
    // En caso de que no mande nada en el INSERT
    if (!req.body.turno_vendedores ||
        !req.body.nombre_vendedores ||
        req.body.ventas_vendedores === undefined ||
        !req.body.sucursal_vendedores ||
        req.body.calificacion_vendedores === undefined ||
        req.body.disponible_vendedores === undefined) {
            return res.status(400).send('Error, falta un campo obligatorio.')
        }

    const vendedor = await agregarVendedor(
        req.body.turno_vendedores,
        req.body.nombre_vendedores,
        req.body.ventas_vendedores,
        req.body.sucursal_vendedores,
        req.body.calificacion_vendedores,
        req.body.disponible_vendedores,
    );

    if (!vendedor) {
        return res.status(500).json({ error: 'No se creó el vendedor.' }) 
    }
    
    res.json(vendedor);
});

// TABLA Merchandising
// agregar Merch
app.post('/admin/productos/agregarMerchandising', async (req, res) => {
    // En caso de que no mande nada en el INSERT
    if (!req.body.tipo_merchandising ||
        !req.body.nombre_merchandising ||
        !req.body.marca_merchandising ||
        !req.body.sucursal_merchandising ||
        req.body.precio_merchandising === undefined ||
        req.body.disponible_merchandising === undefined) {
            return res.status(400).send('Error, falta un campo obligatorio.')
        }


    const merch = await agregarMerchandising(
        req.body.tipo_merchandising,
        req.body.nombre_merchandising,
        req.body.marca_merchandising,
        req.body.sucursal_merchandising,
        req.body.precio_merchandising,
        req.body.disponible_merchandising,
    );

    if (!merch) {
        return res.status(500).json({ error: 'No se creó el Merchandising.' }) 
    }
    
    res.json(merch);
});

// TABLA VENTAS_CONCRETADAS
// Agregar venta_concretada
app.post('/carrito/venta_concretada', async (req, res) => {
    // En caso de que no mande nada en el INSERT
    if (!req.body.tipo ||
        !req.body.vendedor_id ||
        (req.body.instrumento_id === undefined && req.body.merch_id === undefined) ||
        req.body.precio_real_venta === undefined) {
            return res.status(400).send('Error, falta un campo obligatorio.')
        }

    const venta_concretada = await crearVentaConcretada(
        req.body.tipo,
        req.body.vendedor_id,
        req.body.instrumento_id,
        req.body.merch_id,
        req.body.precio_real_venta,
    );

    sumarVenta(req.body.vendedor_id)
    
    if (!venta_concretada) {
        return res.status(500).json({ error: 'No se creó la venta' }) 
    }
    
    res.json(venta_concretada);
});





