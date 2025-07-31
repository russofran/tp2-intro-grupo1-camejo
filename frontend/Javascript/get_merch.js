// Get


const tiendaDeMusicaBackendURL = "https://tp2-intro-grupo1-camejo-deploy-backend.onrender.com/productos/merchandising";



fetch(tiendaDeMusicaBackendURL).then((respuesta) => {
    return respuesta.json();
}).then((data) => {
    // Aca trabajamos con los datos obtenidos desde la base de datos por medio de "data".

    const table = document.getElementById("merchandising-table");

    data.forEach(merchandising => {
        const newFila = document.createElement("tr");

        const newID = document.createElement("td");
        newID.innerHTML = merchandising.id_merchandising;
        newFila.appendChild(newID);

        const newTipo = document.createElement("td");
        newTipo.innerHTML = merchandising.tipo_merchandising;
        newFila.appendChild(newTipo);

        const newNombre = document.createElement("td");
        newNombre.innerHTML = merchandising.nombre_merchandising;
        newFila.appendChild(newNombre);

        const newMarca = document.createElement("td");
        newMarca.innerHTML = merchandising.marca_merchandising;
        newFila.appendChild(newMarca);

        const newPrecio = document.createElement("td");
        newPrecio.innerHTML = merchandising.precio_merchandising;
        newFila.appendChild(newPrecio);

        const newBotonVer = document.createElement("a");
        newBotonVer.className = "button is-info";
        newBotonVer.href = "/merchandising.html?id=" + merchandising.id_merchandising;
        newBotonVer.innerHTML = "Ver";

        const newVer = document.createElement("td");
        newVer.appendChild(newBotonVer);
        newFila.appendChild(newVer);

        const newBotonBorrar = document.createElement("a");
        newBotonBorrar.className = "button is-danger";
        newBotonBorrar.onclick = function(){deleteMerchandising(merchandising.id_merchandising, merchandising.nombre_merchandising)}; 
        newBotonBorrar.innerHTML = "Borrar";

        const newBorrar = document.createElement("td");
        newBorrar.appendChild(newBotonBorrar);
        newFila.appendChild(newBorrar);

        const newBotonEditar = document.createElement("a");
        newBotonEditar.className = "button";
        newBotonEditar.href = "/editarmerchandising.html?id=" + merchandising.id_merchandising;
        newBotonEditar.innerHTML = "Editar";

        const newEditar = document.createElement("td");
        newEditar.appendChild(newBotonEditar);
        newFila.appendChild(newEditar);
        

        table.appendChild(newFila);

    });

});


function deleteMerchandising(id_merchandising, nombre_merchandising){
    const borrarMerchandisingURL = "https://tp2-intro-grupo1-camejo-deploy-backend.onrender.com/admin/merchandising/borrar/" + id_merchandising;

    const body = {
        valor_anterior: nombre_merchandising
    };

    fetch(borrarMerchandisingURL, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
    }).then(respuesta => {
        if (respuesta.status === 200) {
            alert("Merch eliminado con exito ✔");
            window.location.replace("./merch.html");
            return
        } else if (respuesta.status === 400) {
            alert("Algo salió mal");
            window.location.replace("./merch.html");
            return
        } else if (respuesta.status === 404) {
            alert("El elemento seleccionado no existe, haga click en aceptar para recargar la página.");
            window.location.replace("./merch.html");
            return
        }
        return respuesta.json();
    });

};



