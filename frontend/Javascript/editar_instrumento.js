// Get

const urlParams = new URLSearchParams(window.location.search);
const instrumento_param_id_edit = urlParams.get('id');


const dataInstrumentoURL = "https://tp2-intro-grupo1-camejo-deploy-backend.onrender.com/productos/instrumentos/" + instrumento_param_id_edit;
const putActualizarInstrumentoURL = "https://tp2-intro-grupo1-camejo-deploy-backend.onrender.com/admin/instrumentos/actualizar/" + instrumento_param_id_edit;

fetch(dataInstrumentoURL).then((respuesta) => {
    if (respuesta.status === 404) {
        alert("No existe una id: " + instrumento_param_id_edit + " enlazada a algun instrumento, seleccione por favor otra.");
        
        return window.location.replace("./instrumentos.html");
    }
    if (respuesta.status === 500) {
        alert("Debe ingresar algo en los campos para editar el instrumento.");
        
        return window.location.replace("./instrumentos.html");
    }
    return respuesta.json();
}).then((data) => {
    const table = document.getElementById("instrumentos-table");

    const newFila = document.createElement("tr");

    const newID = document.createElement("td");
    newID.innerHTML = data.id_instrumento;
    newFila.appendChild(newID);

    const newTipo = document.createElement("td");
    newTipo.innerHTML = data.tipo_instrumento;
    newFila.appendChild(newTipo);

    const newNombre = document.createElement("td");
    newNombre.innerHTML = data.nombre_instrumento;
    newFila.appendChild(newNombre);

    const newMarca = document.createElement("td");
    newMarca.innerHTML = data.marca_instrumento;
    newFila.appendChild(newMarca);

    const newModelo = document.createElement("td");
    newModelo.innerHTML = data.modelo_instrumento;
    newFila.appendChild(newModelo);

    const newPrecio = document.createElement("td");
    newPrecio.innerHTML = "$" + data.precio_instrumento;
    newFila.appendChild(newPrecio);

    const newImagen = document.getElementById("imagen-instrumento");
    newImagen.src = data.imagen_instrumento;
    newImagen.style.margin = '5px';

    table.appendChild(newFila);

});



function editarInstrumento(e) {
    e.preventDefault(); // Evita recargar la página.

    const tipo_instrumento = document.getElementById("tipo-instrumento").value;
    const nombre_instrumento = document.getElementById("nombre-instrumento").value;
    const marca_instrumento = document.getElementById("marca-instrumento").value;
    const modelo_instrumento = document.getElementById("modelo-instrumento").value;
    const precio_instrumento = document.getElementById("precio-instrumento").value;
    const img_instrumento = document.getElementById("img-instrumento").value;
    const disponible = document.getElementById("disponible-instrumento").value;
    


    const body = {
        id_instrumento: instrumento_param_id_edit,
        tipo_instrumento: tipo_instrumento,
        nombre_instrumento: nombre_instrumento,
        marca_instrumento: marca_instrumento,
        modelo_instrumento: modelo_instrumento,
        precio_instrumento: Number(precio_instrumento),
        imagen_instrumento: img_instrumento,
        disponible_instrumento: disponible
    };

    // mientras espera el try:
    const mensaje = document.getElementById("mensaje-respuesta");
    mensaje.textContent = "Procesando..."; 
    mensaje.style.color = "blue";

    // put
    fetch(putActualizarInstrumentoURL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)

    }).then((respuesta) => {
        if (respuesta.ok) {
            mensaje.textContent = "Instrumento modificado con éxito ✔";
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

document.getElementById("formulario_editar_instrumento").addEventListener("submit", editarInstrumento);