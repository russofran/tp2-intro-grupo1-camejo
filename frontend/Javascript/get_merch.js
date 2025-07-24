// Get

tablaMerch();


function tablaMerch (){

    //document.getElementById("instrumentos-table").innerHTML = "";

    const tiendaDeMusicaBackendURL = "http://localhost:3030/productos/merchandising";

    fetch(tiendaDeMusicaBackendURL).then((respuesta) => {
        return respuesta.json();
    }).then((data) => {
        // Aca trabajamos con los datos obtenidos desde la base de datos por medio de "data".

 //    const table = document.getElementById("instrumentos-table");!!!!

    data.forEach(merch => {
        const newFila = document.createElement("tr");

        const newID = document.createElement("td");
        newID.innerHTML = merch.id_merchandising;
        newFila.appendChild(newID);

        const newTipo = document.createElement("td");
        newTipo.innerHTML = merch.id_merchandising;
        newFila.appendChild(newTipo);

        const newNombre = document.createElement("td");
        newNombre.innerHTML = merch.id_merchandising;
        newFila.appendChild(newNombre);

        const newMarca = document.createElement("td");
        newMarca.innerHTML = merch.id_merchandising;
        newFila.appendChild(newMarca);

        const newModelo = document.createElement("td");
        newModelo.innerHTML = merch.id_merchandising;
        newFila.appendChild(newModelo);

        const newPrecio = document.createElement("td");
        newPrecio.innerHTML = merch.id_merchandising;
        newFila.appendChild(newPrecio);

        const newBotonVer = document.createElement("a");
        newBotonVer.className = "button is-info";
        //newBotonVer.href = "/instrumento.html?id=" + merch.id_merchandising;
        newBotonVer.innerHTML = "Ver";

        const newVer = document.createElement("td");
        newVer.appendChild(newBotonVer);
        newFila.appendChild(newVer);

        const newBotonBorrar = document.createElement("a");
        newBotonBorrar.className = "button is-danger";
        newBotonBorrar.onclick = function(){deleteMerch(merch.id_merchandising)}; 
        //newBotonBorrar.href = "/instrumento.html?id=" + merch.id_merchandising;
        newBotonBorrar.innerHTML = "Borrar";

        const newBorrar = document.createElement("td");
        newBorrar.appendChild(newBotonBorrar);
        newFila.appendChild(newBorrar);

        const newBotonEditar = document.createElement("a");
        newBotonEditar.className = "button";
       // newBotonEditar.href = "/instrumento.html?id=" + merch.id_merchandising;
        newBotonEditar.innerHTML = "Editar";

        const newEditar = document.createElement("td");
        newEditar.appendChild(newBotonEditar);
        newFila.appendChild(newEditar);
        

        table.appendChild(newFila);
    });
});

}

function deleteMerch(id_merchandising){
    console.log("hola");
    const tiendaDeMusicaBackendURL = "http://localhost:3030/productos/merchandaising/" + id_merchandising;
    fetch(tiendaDeMusicaBackendURL, {method: 'DELETE'}).then(() => tablaMerch());
}
