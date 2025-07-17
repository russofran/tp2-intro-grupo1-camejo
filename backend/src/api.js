// imports
const express = require('express');
const path = require('path');

// Vincular la carpeta frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Funciones de db
const { obtenerInstrumentos, obtenerVendedores, obtenerMerchandising, obtenerVentas, obtenerUnInstrumento, obtenerTipoDeInstrumento, crearVentaConcretada } = require('../src/db/tienda_de_musica')

const app = express();
const port = 3030;

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

// TABLA VENTAS_CONCRETADAS

app.post('/venta_concretada', async (req, res) => {
    // En caso de que no mande nada en el INSERT
    if (!req.body.tipo ||
        !req.body.vendedor_id ||
        (!req.body.instrumento_id && !req.body.merch_id) ||
        !req.body.precio_real_venta ||
        !req.body.turno) {
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

    res.send(venta_concretada);
});



