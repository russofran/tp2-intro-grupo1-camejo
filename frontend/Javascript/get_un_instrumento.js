// Get

const urlParams = new URLSearchParams(window.location.search);
const instrumento_param_id = urlParams.get('id');


const tiendaDeMusicaBackendURL = "http://localhost:3030/productos/instrumentos/" + instrumento_param_id;

fetch(tiendaDeMusicaBackendURL).then((respuesta) => {
    if (respuesta.status === 404) {
        alert("No existe una id: " + instrumento_param_id + " enlazada a algun instrumento, seleccione por favor otra.");
        
        return window.location.replace("./instrumentos.html");
    }
    return respuesta.json();
}).then((data) => {
    // Aca trabajamos con los datos obtenidos desde la base de datos por medio de "data".
    document.getElementById("nombre-instrumento").innerHTML = data.nombre_instrumento;
    document.getElementById("precio-card").innerHTML = "$" + data.precio_instrumento;

    if (!data.disponible_instrumento) {
        document.getElementById("enlace-card-comprar").removeAttribute("href");
        document.getElementById("img-card").removeAttribute("src");
        const newBotonAgotado = document.getElementById("boton-card");
        newBotonAgotado.className = "button is-danger is-outlined";
        newBotonAgotado.innerHTML = "Agotado"

    } else {
        const newBotonComprar = document.getElementById("boton-card");
        newBotonComprar.className = "button is-success";
        document.getElementById("img-card").src = data.imagen_instrumento;

        const enlaceCardComprar = document.getElementById("enlace-card-comprar");
        enlaceCardComprar.innerHTML = "Comprar";
        document.getElementById("enlace-card-comprar").href = "./carrito.html";
    
    };

});

