// Get

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');


<<<<<<< Updated upstream
const tiendaDeMusicaBackendURL = "http://localhost:3030/productos/instrumentos/" + id;

fetch(tiendaDeMusicaBackendURL).then((respuesta) => {
=======
const tiendaDeMusicaBackendURL = "http://localhost:3030/productos/instrumentos/" + instrumento_param_id;

fetch(tiendaDeMusicaBackendURL).then((respuesta) => {
    if (respuesta.status === 404) {
        alert("No existe una id: " + instrumento_param_id + " enlazada a algun instrumento, seleccione por favor otra.");

        return window.location.replace("./instrumentos.html");
    }
>>>>>>> Stashed changes
    return respuesta.json();
}).then((data) => {
    // Aca trabajamos con los datos obtenidos desde la base de datos por medio de "data".
    document.getElementById("nombre-instrumento").innerHTML = data.nombre_instrumento;
    document.getElementById("precio-instrumento").innerHTML = "$" + data.precio_instrumento;
    document.getElementById("tipo-instrumento").innerHTML = data.tipo_instrumento;
    document.getElementById("marca-instrumento").innerHTML = data.marca_instrumento;
    document.getElementById("modelo-instrumento").innerHTML = data.modelo_instrumento;
    document.getElementById("imagen-instrumento").src = data.imagen_instrumento;


});
