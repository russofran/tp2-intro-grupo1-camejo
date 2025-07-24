// Get

const urlParams = new URLSearchParams(window.location.search);
const instrumento_param_id_edit = urlParams.get('id');


const dataInstrumentoURL = "https://tp2-intro-grupo1-camejo-deploy-backend.onrender.com/productos/instrumentos/" + instrumento_param_id_edit;
const putActualizarInstrumentoURL = "https://tp2-intro-grupo1-camejo-deploy-backend.onrender.com/admin/instrumentos/actualizar"

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

    table.appendChild(newFila);

    
    const ingrese_tipo = document.getElementById("tipo-input");


    
});




// Segun el boton que toque el campo a editar.
document.querySelectorAll(".editar").forEach((btn) => {
    btn.style.backgroundColor = "white";
    btn.style.color = "black";          
    btn.style.border = "3px solid blue";
    btn.style.borderRadius = "10%";
    btn.style.padding = "8px";

    btn.addEventListener("click", () => {
        const campo = btn.dataset.campo; // "precio_instrumento", "nombre_instrumento"...
        const nuevoValor = prompt(`Ingrese el nuevo valor para ${campo}:`);
        if (nuevoValor === null || nuevoValor === "") {
            return alert("No se ingresó ningún valor.");
        }

        const body = {
            id: instrumento_param_id_edit,
            valor: nuevoValor,
            campo: campo,
        };

        // put
        fetch(putActualizarInstrumentoURL, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)

        }).then((respuesta) => {
            if (respuesta.ok) {
                alert("Campo actualizado correctamente.");
                location.reload();
            } 
            if (respuesta.status === 500) {
                alert("Hubo un error en los campos. Haga click en aceptar para recargar la pagina.");
                location.reload();
            }
        });
    });
});
