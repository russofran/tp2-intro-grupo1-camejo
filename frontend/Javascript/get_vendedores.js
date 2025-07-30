// Get


const tiendaDeMusicaBackendURL = "https://tp2-intro-grupo1-camejo-deploy-backend.onrender.com/admin/vendedores";



fetch(tiendaDeMusicaBackendURL).then((respuesta) => {
    return respuesta.json();
}).then((data) => {
    // Aca trabajamos con los datos obtenidos desde la base de datos por medio de "data".

    const table = document.getElementById("vendedores-table");

    data.forEach(vendedor => {
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

        const newBotonVer = document.createElement("a");
        newBotonVer.className = "button is-info";
        newBotonVer.href = "/index.html";
        newBotonVer.innerHTML = "Ver";

        const newVer = document.createElement("td");
        newVer.appendChild(newBotonVer);
        newFila.appendChild(newVer);

        const newBotonBorrar = document.createElement("a");
        newBotonBorrar.className = "button is-danger";
        newBotonBorrar.onclick = function(){deleteVendedor(vendedor.id_vendedores, vendedor.nombre_vendedores)}; 
        newBotonBorrar.innerHTML = "Borrar";

        const newBorrar = document.createElement("td");
        newBorrar.appendChild(newBotonBorrar);
        newFila.appendChild(newBorrar);

        const newBotonEditar = document.createElement("a");
        newBotonEditar.className = "button";
        newBotonEditar.href = "/index.html" ;
        newBotonEditar.innerHTML = "Editar";

        const newEditar = document.createElement("td");
        newEditar.appendChild(newBotonEditar);
        newFila.appendChild(newEditar);
        

        table.appendChild(newFila);
    });

});


function deleteVendedor(id_vendedores, nombre_vendedores){
    const borrarVendedorURL = "https://tp2-intro-grupo1-camejo-deploy-backend.onrender.com/admin/vendedores/borrar/" + id_vendedores;

    const body = {
        valor_anterior: nombre_vendedores
    };

    fetch(borrarVendedorURL, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
    }).then(respuesta => {
        if (respuesta.status === 200) {
            alert("Vendedor eliminado con exito ✔");
            window.location.replace("./vendedores.html");
            return
        } else if (respuesta.status === 400) {
            alert("Algo salió mal");
            window.location.replace("./vendedores.html");
            return
        } else if (respuesta.status === 404) {
            alert("El vendedor seleccionado no existe, haga click en aceptar para recargar la página.");
            window.location.replace("./vendedores.html");
            return
        }
        return respuesta.json();
    });

};


