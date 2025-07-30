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
    const table = document.getElementById("ventas-table");

    const newFila = document.createElement("tr");

    const newID = document.createElement("td");
    newID.innerHTML = data.id;
    newFila.appendChild(newID);

    const newTipo = document.createElement("td");
    newTipo.innerHTML = data.tipo_venta;
    newFila.appendChild(newTipo);

    const newNombreinstrumento = document.createElement("td");
    if (!data.instrumento_vendido) {
        newNombreinstrumento.innerHTML = data.instrumento_borrado;
    } else {
        newNombreinstrumento.innerHTML = data.instrumento_vendido;
    };
    newFila.appendChild(newNombreinstrumento);

    const newNombreMerchandising = document.createElement("td");
    if (!data.merchandising_vendido) {
        newNombreMerchandising.innerHTML = data.merchandising_borrado;
    } else {
        newNombreMerchandising.innerHTML = data.merchandising_vendido;
    };
    newFila.appendChild(newNombreMerchandising)

    const newPrecio = document.createElement("td");
    newPrecio.innerHTML = data.precio_real_venta;
    newFila.appendChild(newPrecio);

    const newNombreVendedor = document.createElement("td");
    if (!data.vendedor) {
        newNombreVendedor.innerHTML = data.vendedor_despedido;
    } else {
        newNombreVendedor.innerHTML = data.vendedor;
    };
    newFila.appendChild(newNombreVendedor);

    const newFecha = document.createElement("td");
    newFecha.innerHTML = data.fecha;
    newFila.appendChild(newFecha);


    table.appendChild(newFila);

});


