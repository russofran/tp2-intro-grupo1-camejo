// Get

const urlParams = new URLSearchParams(window.location.search);
const vendedor_param_id_edit = urlParams.get('id');


const dataVendedoresURL = "http://localhost:3030/admin/vendedores/" + vendedor_param_id_edit;
const putActualizarVendedoresURL = "http://localhost:3030/admin/vendedores/actualizar/" + vendedor_param_id_edit;

fetch(dataVendedoresURL).then((respuesta) => {
    if (respuesta.status === 404) {
        alert("No existe una id: " + vendedor_param_id_edit + " enlazada a algun vendedor, seleccione por favor otra.");
        
        return window.location.replace("./vendedores.html");
    }
    if (respuesta.status === 500) {
        alert("Debe ingresar algo en los campos para editar el vendedor.");
        
        return window.location.replace("./vendedores.html");
    }
    return respuesta.json();
}).then((vendedor) => {

    const table = document.getElementById("vendedores-table");


    const newFila = document.createElement("tr");

    const newID = document.createElement("td");
    newID.innerHTML = vendedor.id_vendedores;
    newFila.appendChild(newID);

    const newTurno = document.createElement("td");
    newTurno.innerHTML = vendedor.turno_vendedores;
    newFila.appendChild(newTurno);

    const newNombre = document.createElement("td");
    newNombre.innerHTML = vendedor.nombre_vendedores;
    newFila.appendChild(newNombre);

    const newVentas = document.createElement("td");
    newVentas.innerHTML = vendedor.ventas_vendedores;
    newFila.appendChild(newVentas);

    const newSucursal = document.createElement("td");
    newSucursal.innerHTML = vendedor.sucursal_vendedores;
    newFila.appendChild(newSucursal);

    const newCalificacion = document.createElement("td");
    newCalificacion.innerHTML = vendedor.calificacion_vendedores;
    newFila.appendChild(newCalificacion);

    const newDisponible = document.createElement("td");
    newDisponible.innerHTML = vendedor.disponible_vendedores;
    newFila.appendChild(newDisponible);

    table.appendChild(newFila);

});



function editarVendedores(e) {
    e.preventDefault(); // Evita recargar la página.

    const turno_vendedores = document.getElementById("turno-vendedores").value;
    const nombre_vendedores = document.getElementById("nombre-vendedores").value;
    const ventas_vendedores = document.getElementById("ventas-vendedores").value;
    const sucursal_vendedores = document.getElementById("sucursal-vendedores").value;
    const calificacion_vendedores = document.getElementById("calificacion-vendedores").value;
    const disponible_vendedores = document.getElementById("disponible-vendedores").value;

    const body = {
        id_vendedores: vendedor_param_id_edit,
        turno_vendedores: turno_vendedores,
        nombre_vendedores: nombre_vendedores,
        ventas_vendedores: ventas_vendedores,
        sucursal_vendedores: sucursal_vendedores,
        calificacion_vendedores: calificacion_vendedores,
        disponible_vendedores: disponible_vendedores
    };

    // mientras espera el try:
    const mensaje = document.getElementById("mensaje-respuesta");
    mensaje.textContent = "Procesando..."; 
    mensaje.style.color = "blue";

    // put
    fetch(putActualizarVendedoresURL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)

    }).then((respuesta) => {
        if (respuesta.ok) {
            mensaje.textContent = "Vendedor modificado con éxito ✔";
            mensaje.style.color = "green";
            alert("Campo actualizado correctamente.");
            location.reload();
        } 
        if (respuesta.status === 500) {
            alert("Hubo un error en los campos. Haga click en aceptar para recargar la pagina.");
            location.reload();
        }
        if (respuesta.status === 400) {
            alert("Error. Parámetros incorrectos.");
            location.reload();
        }
    });
    
};

// Intentar cargar la venta_concretada en la base de datos.

document.getElementById("formulario_editar_vendedores").addEventListener("submit", editarVendedores);