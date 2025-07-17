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
    obtenerVendedores,
    obtenerMerchandising,
    obtenerVentas,
    obtenerUnInstrumento,
    obtenerTipoDeInstrumento,
    crearVentaConcretada,
    agregarInstrumento,
    agregarVendedor,
    agregarMerchandising
} = require('../src/db/tienda_de_musica')



// endpoints

// GET. 

// TABLA INSTRUMENTOS
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


// TABLA MERCHANDISING.
// Obtener todo el merchandising.
app.get('/productos/merchandising', async (req, res) => {
    const merchandising = await obtenerMerchandising();
    res.send(merchandising);
});

// TABLA VENDEDORES.
// Obtener todos los vendedores.
app.get('/admin/vendedores', async (req, res) => {
    const vendedores = await obtenerVendedores();
    res.send(vendedores);
});

// TABLA VENTAS_CONCRETADAS.
// Obtener ventas concretadas.
app.get('/admin/ventas_concretadas', async (req, res) => {
    const ventas_concretadas = await obtenerVentas();
    res.send(ventas_concretadas);
});


// POST.

// TABLA INSTRUMENTOS
// Agregar un instrumento
app.post('/admin/productos/agregarInstrumento', async (req, res) => {
    // En caso de que no mande nada en el INSERT
    if (!req.body.tipo ||
        !req.body.nombre ||
        !req.body.marca ||
        !req.body.modelo ||
        !req.body.precio ||
        !req.body.sucursal ||
        !req.body.disponible) {
            return res.status(400).send('Error, falta un campo obligatorio.')
        }

    const instrumento = await agregarInstrumento(
        req.body.tipo,
        req.body.nombre,
        req.body.marca,
        req.body.modelo,
        req.body.precio,
        req.body.sucursal,
        req.body.disponible,
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

app.post('/admin/staff/agregarVendedor', async (req, res) => {
    // En caso de que no mande nada en el INSERT
    if (!req.body.turno ||
        !req.body.nombre ||
        req.body.ventas === undefined ||
        !req.body.sucursal ||
        req.body.calificacion === undefined ||
        req.body.disponible === undefined) {
            return res.status(400).send('Error, falta un campo obligatorio.')
        }

    const vendedor = await agregarVendedor(
        req.body.turno,
        req.body.nombre,
        req.body.ventas,
        req.body.sucursal,
        req.body.calificacion,
        req.body.disponible,
    );

    if (!vendedor) {
        return res.status(500).json({ error: 'No se creó el vendedor.' }) 
    }
    
    res.json(vendedor);
});

// TABLA Merchandising

app.post('/admin/productos/agregarMerchandising', async (req, res) => {
    // En caso de que no mande nada en el INSERT
    if (!req.body.tipo ||
        !req.body.nombre ||
        !req.body.marca ||
        !req.body.sucursal ||
        req.body.disponible === undefined) {
            return res.status(400).send('Error, falta un campo obligatorio.')
        }


    const merch = await agregarMerchandising(
        req.body.tipo,
        req.body.nombre,
        req.body.marca,
        req.body.sucursal,
        req.body.disponible,
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
        req.body.precio_real_venta === undefined ||
        req.body.turno === undefined) {
            return res.status(400).send('Error, falta un campo obligatorio.')
        }

    const venta_concretada = await crearVentaConcretada(
        req.body.tipo,
        req.body.vendedor_id,
        req.body.instrumento_id,
        req.body.merch_id,
        req.body.precio_real_venta,
        req.body.turno
    );

    if (!venta_concretada) {
        return res.status(500).json({ error: 'No se creó la venta' }) 
    }
    
    res.json(venta_concretada);
});



