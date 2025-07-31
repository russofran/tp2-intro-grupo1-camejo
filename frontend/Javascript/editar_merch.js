// Obtener el ID del merchandising desde la URL
const urlParams = new URLSearchParams(window.location.search);
const merch_param_id_edit = urlParams.get("id");

// URLs para GET y PUT
const dataMerchURL = "https://tp2-intro-grupo1-camejo-deploy-backend.onrender.com/productos/merchandising/" + merch_param_id_edit;


const putActualizarMerchURL = "https://tp2-intro-grupo1-camejo-deploy-backend.onrender.com/admin/merchandising/actualizar/" + merch_param_id_edit;

// GET: Traer datos del merchandising y mostrarlos en la tabla
fetch(dataMerchURL).then((respuesta) => {
    if (respuesta.status === 404) {
        alert("No existe un merchandising con ID: " + merch_param_id_edit);
        return window.location.replace("./merch.html");
    }
    if (respuesta.status === 500) {
        alert("Error interno al obtener los datos del merchandising.");
        return window.location.replace("./merch.html");
    }
    return respuesta.json();
}).then((data) => {

    console.log(data);
    const table = document.getElementById("merch-table");

    const newFila = document.createElement("tr");

    const newID = document.createElement("td");
    newID.innerHTML = data.id_merchandising;
    newFila.appendChild(newID);

    const newTipo = document.createElement("td");
    newTipo.innerHTML = data.tipo_merchandising;
    newFila.appendChild(newTipo);

    const newNombre = document.createElement("td");
    newNombre.innerHTML = data.nombre_merchandising;
    newFila.appendChild(newNombre);

    const newMarca = document.createElement("td");
    newMarca.innerHTML = data.marca_merchandising;
    newFila.appendChild(newMarca);

    const newPrecio = document.createElement("td");
    newPrecio.innerHTML = "$" + data.precio_merchandising;
    newFila.appendChild(newPrecio);

    const newImagen = document.createElement("img");
    newImagen.src = data.imagen_merchandising;
    newImagen.alt = "imagen merch";
    newImagen.className = "image is-128x128";


    const newColumnaImagen = document.createElement("td");
    newColumnaImagen.appendChild(newImagen);
    newFila.appendChild(newColumnaImagen);

    table.appendChild(newFila);
});

// Función para editar el merchandising
function editarMerch(e) {
    e.preventDefault();

    const tipo_merchandising = document.getElementById("tipo-merch").value;
    const nombre_merchandising = document.getElementById("nombre-merch").value;
    const marca_merchandising = document.getElementById("marca-merch").value;
    const precio_merchandising = document.getElementById("precio-merch").value;
    const imagen_merchandising = document.getElementById("img-merch").value;
    const disponible_merchandising = document.getElementById("disponible-merch").value;

    const body = {
        id_merchandising: merch_param_id_edit,
        tipo_merchandising,
        nombre_merchandising,
        marca_merchandising,
        precio_merchandising: Number(precio_merchandising),
        imagen_merchandising,
        disponible_merchandising
    };

    const mensaje = document.getElementById("mensaje-respuesta");
    mensaje.textContent = "Procesando...";
    mensaje.style.color = "blue";

    fetch(putActualizarMerchURL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    }).then((respuesta) => {
        if (respuesta.ok) {
            mensaje.textContent = "Merch modificado con éxito ✔";
            mensaje.style.color = "green";
            alert("Merch editado correctamente.");
            location.reload();
        }
        if (respuesta.status === 500) {
            alert("Hubo un error en los campos. Haga click en aceptar para recargar la página.");
            location.reload();
        }
        if (respuesta.status === 400) {
            alert("Error. Parámetros incorrectos.");
            location.reload();
        }
    });
}

// Evento submit
document.getElementById("formulario_editar_merch").addEventListener("submit", editarMerch);

