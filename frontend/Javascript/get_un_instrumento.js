// Get

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');


const tiendaDeMusicaBackendURL = "http://localhost:3030/productos/instrumentos/" + id;

fetch(tiendaDeMusicaBackendURL).then((respuesta) => {
    return respuesta.json();
}).then((data) => {
    // Aca trabajamos con los datos obtenidos desde la base de datos por medio de "data".
    console.log(data)
    document.getElementById("nombre-instrumento").innerHTML = data.nombre_instrumento;
    document.getElementById("precio-card").innerHTML = "$" + data.precio_instrumento;

    if (!data.disponible_instrumento) {
        const newEnlaceInicio = document.getElementById("enlace-card-comprar");
        newEnlaceInicio.innerHTML = "Agotado";
        newEnlaceInicio.href = "/instrumentos.html";

        const newBotonAgotado = document.getElementById("boton-card");
        newBotonAgotado.className = "button is-danger is-outlined";
                       

    } else {
        const newBotonComprar = document.getElementById("enlace-card-comprar");
        newBotonComprar.className = "button is-succes";
        newBotonComprar.href = "./comprar_instrumento.html/" + data.id_instrumento;
    };

});

