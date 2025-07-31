// Get

const urlParams = new URLSearchParams(window.location.search);
const merchandising_param_id = urlParams.get('id');


const tiendaDeMusicaBackendURL = "https://tp2-intro-grupo1-camejo-deploy-backend.onrender.com/productos/merchandising/" + merchandising_param_id;

fetch(tiendaDeMusicaBackendURL).then((respuesta) => {
    if (respuesta.status === 404) {
        alert("No existe una id: " + merchandising_param_id + " enlazada a algun merch, seleccione por favor otra.");
        
        return window.location.replace("./merchandising.html");
    }
    return respuesta.json();
}).then((data) => {
    // Aca trabajamos con los datos obtenidos desde la base de datos por medio de "data".
    document.getElementById("nombre-merchandising").innerHTML = data.nombre_merchandising;
    document.getElementById("precio-card").innerHTML = "$" + data.precio_merchandising;

    if (!data.disponible_merchandising) {
        document.getElementById("enlace-card-comprar").removeAttribute("href");
        document.getElementById("img-card").removeAttribute("src");
        const newBotonAgotado = document.getElementById("boton-card");
        newBotonAgotado.className = "button is-danger is-outlined";
        newBotonAgotado.innerHTML = "Agotado"

    } else {
        const newBotonComprar = document.getElementById("boton-card");
        newBotonComprar.className = "button is-success";
        document.getElementById("img-card").src = data.imagen_merchandising;

        const enlaceCardComprar = document.getElementById("enlace-card-comprar");
        enlaceCardComprar.innerHTML = "Comprar";
        document.getElementById("enlace-card-comprar").href = "./carrito.html";
    
    };

});

