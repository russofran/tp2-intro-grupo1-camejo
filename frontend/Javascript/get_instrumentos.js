// Get

const tiendaDeMusicaBackendURL = "http://localhost:3030/productos/instrumentos";

fetch(tiendaDeMusicaBackendURL).then((respuesta) => {
    return respuesta.json();
}).then((data) => {
    // Aca trabajamos con los datos obtenidos desde la base de datos por medio de "data".

    const table = document.getElementById("instrumentos-table");

    data.forEach(instrumento => {
        const newFila = document.createElement("tr");

        const newID = document.createElement("td");
        newID.innerHTML = instrumento.id_instrumento;
        newFila.appendChild(newID);

        const newTipo = document.createElement("td");
        newTipo.innerHTML = instrumento.tipo_instrumento;
        newFila.appendChild(newTipo);

        const newNombre = document.createElement("td");
        newNombre.innerHTML = instrumento.nombre_instrumento;
        newFila.appendChild(newNombre);

        const newMarca = document.createElement("td");
        newMarca.innerHTML = instrumento.marca_instrumento;
        newFila.appendChild(newMarca);

        const newModelo = document.createElement("td");
        newModelo.innerHTML = instrumento.modelo_instrumento;
        newFila.appendChild(newModelo);

        const newPrecio = document.createElement("td");
        newPrecio.innerHTML = instrumento.precio_instrumento;
        newFila.appendChild(newPrecio);

        const newBotonVer = document.createElement("a");
        newBotonVer.className = "button is-info";
        newBotonVer.href = "/instrumento.html?id=" + instrumento.id_instrumento;
        newBotonVer.innerHTML = "Ver";

        const newVer = document.createElement("td");
        newVer.appendChild(newBotonVer);
        newFila.appendChild(newVer);

        const newBotonBorrar = document.createElement("a");
        newBotonBorrar.className = "button is-danger";
        newBotonBorrar.href = "/instrumento.html?id=" + instrumento.id_instrumento;
        newBotonBorrar.innerHTML = "Borrar";

        const newBorrar = document.createElement("td");
        newBorrar.appendChild(newBotonBorrar);
        newFila.appendChild(newBorrar);

        const newBotonEditar = document.createElement("a");
        newBotonEditar.className = "button";
        newBotonEditar.href = "/instrumento.html?id=" + instrumento.id_instrumento;
        newBotonEditar.innerHTML = "Editar";

        const newEditar = document.createElement("td");
        newEditar.appendChild(newBotonEditar);
        newFila.appendChild(newEditar);
        

        table.appendChild(newFila);
    });
});

