// Get

const urlParams = new URLSearchParams(window.location.search);
const vendedor_param_id_edit = urlParams.get('id');


const dataVendedorURL = "https://tp2-intro-grupo1-camejo-deploy-backend.onrender.com/admin/vendedores/" + vendedor_param_id_edit;
const dataVentasURL = "https://tp2-intro-grupo1-camejo-deploy-backend.onrender.com/admin/ventas/vendedor/" + vendedor_param_id_edit;

async function obtenerVentas(id) {

    fetch(dataVentasURL).then((respuesta) => {
        if (respuesta.status === 404) {
            alert("EL vendedor" + id + " no tiene ventas.");
            window.location.replace("./vendedores.html");
            return 
        }
        if (respuesta.status === 500) {
            alert("Fallo en la conexión con el servidor backend o la data base");
            window.location.replace("./vendedores.html");
            return 
        }
        return respuesta.json();
    }).then((data) => {

        const table = document.getElementById("ventas-table");

        // Recorrer el dic que no es un array por el formateo que le hice

        Object.entries(data).forEach(([id, venta]) => {
            const newFila = document.createElement("tr");

            const newID = document.createElement("td");
            newID.innerHTML = id;
            newFila.appendChild(newID);

            const newInstrumento = document.createElement("td");
            newInstrumento.innerHTML = venta.instrumento;
            newFila.appendChild(newInstrumento);

            const newMerch = document.createElement("td");
            newMerch.innerHTML = venta.merch;
            newFila.appendChild(newMerch);

            const newFecha = document.createElement("td");
            newFecha.innerHTML = venta.fecha;
            newFila.appendChild(newFecha);

            const newPrecioFinal = document.createElement("td");
            newPrecioFinal.innerHTML = venta.precio_acordado;
            newFila.appendChild(newPrecioFinal);

            table.appendChild(newFila);
            
        });
    });
};

fetch(dataVendedorURL).then((respuesta) => {
    if (respuesta.status === 404) {
        alert("No existe una id: " + vendedor_param_id_edit + " enlazada a algun vendedor, seleccione por favor otra.");
        window.location.replace("./vendedores.html");
        return 
    }
    if (respuesta.status === 500) {
        alert("Fallo en la conexión con el servidor backend o la data base");
        window.location.replace("./vendedores.html");
        return 
    }
    return respuesta.json();
}).then((data) => {
    const table = document.getElementById("vendedor-table");

    const newFila = document.createElement("tr");

    const newID = document.createElement("td");
    newID.innerHTML = data.id_vendedores;
    newFila.appendChild(newID);

    const newTipo = document.createElement("td");
    newTipo.innerHTML = data.turno_vendedores;
    newFila.appendChild(newTipo);

    const newNombre = document.createElement("td");
    newNombre.innerHTML = data.nombre_vendedores;
    newFila.appendChild(newNombre);

    const newVentas = document.createElement("td");
    newVentas.innerHTML = data.ventas_vendedores;
    newFila.appendChild(newVentas);

    const newMarca = document.createElement("td");
    newMarca.innerHTML = data.sucursal_vendedores;
    newFila.appendChild(newMarca);

    const newModelo = document.createElement("td");
    newModelo.innerHTML = data.calificacion_vendedores;
    newFila.appendChild(newModelo);

    const newPrecio = document.createElement("td");
    newPrecio.innerHTML = data.disponible_vendedores;
    newFila.appendChild(newPrecio);

    const newBtnMostrarVentas = document.createElement("button");
    newBtnMostrarVentas.textContent = "Mostrar ventas";
    newBtnMostrarVentas.className = "button is-primary";
    newBtnMostrarVentas.addEventListener("click", () => {
        obtenerVentas(vendedor_param_id_edit);
    });

    const newVerVentas = document.createElement("td");
    newVerVentas.appendChild(newBtnMostrarVentas);
    newFila.appendChild(newVerVentas)

    
    table.appendChild(newFila);

});



