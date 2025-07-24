// Get


const tiendaDeMusicaBackendURL = "http://localhost:3030/admin/ventas_concretadas";



fetch(tiendaDeMusicaBackendURL).then((respuesta) => {
    return respuesta.json();
}).then((data) => {
    // Aca trabajamos con los datos obtenidos desde la base de datos por medio de "data".

    const table = document.getElementById("ventas-table");

    data.forEach(venta => {
        const newFila = document.createElement("tr");

        const newID = document.createElement("td");
        newID.innerHTML = venta.id;
        newFila.appendChild(newID);

        const newTipo = document.createElement("td");
        newTipo.innerHTML = venta.tipo;
        newFila.appendChild(newTipo);

        const newNombreVendedor = document.createElement("td");
        if (venta.vendedor_id) {
            newNombreVendedor.innerHTML = venta.vendedor_id;
            newFila.appendChild(newNombreVendedor)
        } else if (venta.vendedor_despedido) {
            newNombreVendedor.innerHTML = venta.vendedor_despedido;
            newFila.appendChild(newNombreVendedor)
        } else {
            newNombreVendedor.innerHTML = "-";
            newFila.appendChild(newNombreVendedor)
        }

        const newNombreInstrumento = document.createElement("td");
        if (venta.instrumento_id) {
            newNombreInstrumento.innerHTML = venta.instrumento_id;
            newFila.appendChild(newNombreInstrumento);

        } else if (venta.instrumento_borrado) {
            newNombreInstrumento.innerHTML = venta.instrumento_borrado;
            newFila.appendChild(newNombreInstrumento);
        } else {
            newNombreInstrumento.innerHTML = "-";
            newFila.appendChild(newNombreInstrumento);
        }
        

        const newNombreMerchandising = document.createElement("td");
        if (venta.merch_id) {
            newNombreMerchandising.innerHTML = venta.merch_id;
            newFila.appendChild(newNombreMerchandising);

        } else if (venta.merchandising_borrado) {
            newNombreMerchandising.innerHTML = venta.merchandising_borrado;
            newFila.appendChild(newNombreMerchandising);
        } else {
            newNombreMerchandising.innerHTML = "-";
            newFila.appendChild(newNombreMerchandising);
        }

        const newPrecio = document.createElement("td");
        newPrecio.innerHTML = venta.precio_real_venta;
        newFila.appendChild(newPrecio);

        const newFecha = document.createElement("td");
        newFecha.innerHTML = venta.fecha_venta;
        newFila.appendChild(newFecha);

        const newBotonVer = document.createElement("a");
        newBotonVer.className = "button is-info";
        newBotonVer.href = "/venta.html?id=" + venta.id;
        newBotonVer.innerHTML = "Ver";

        const newVer = document.createElement("td");
        newVer.appendChild(newBotonVer);
        newFila.appendChild(newVer);

        table.appendChild(newFila);
    });

});
