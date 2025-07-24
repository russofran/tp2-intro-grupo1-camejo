// Get
const urlParams = new URLSearchParams(window.location.search);
const id_venta = urlParams.get('id');

const tiendaDeMusicaBackendURL = "https://tp2-intro-grupo1-camejo-deploy-backend.onrender.com/admin/ventas_concretadas/" + id_venta;



fetch(tiendaDeMusicaBackendURL).then((respuesta) => {
    if (respuesta.status === 404) {
        alert("No existe una id: " + id_venta + " enlazada a alguna venta. Haga click en 'aceptar' para volver a ventas.");
        
        return window.location.replace("/ventas.html");
    }
    return respuesta.json();
}).then((data) => {
    // Aca trabajamos con los datos obtenidos desde la base de datos por medio de "data".

    const venta = data[id_venta];
    const table = document.getElementById("ventas-table");

    const newFila = document.createElement("tr");

    const newID = document.createElement("td");
    newID.innerHTML = id_venta;
    newFila.appendChild(newID);

    const newTipo = document.createElement("td");
    newTipo.innerHTML = venta.tipo_venta;
    newFila.appendChild(newTipo);

    const newNombreinstrumento = document.createElement("td");
    newNombreinstrumento.innerHTML = venta.instrumento_vendido;
    newFila.appendChild(newNombreinstrumento)

    const newNombreMerchandising = document.createElement("td");
    newNombreMerchandising.innerHTML = venta.merch_vendido;
    newFila.appendChild(newNombreMerchandising)

    const newPrecio = document.createElement("td");
    newPrecio.innerHTML = venta.precio_total;
    newFila.appendChild(newPrecio);

    const newNombreVendedor = document.createElement("td");
    newNombreVendedor.innerHTML = venta.vendedor;
    newFila.appendChild(newNombreVendedor);

    table.appendChild(newFila);

});


