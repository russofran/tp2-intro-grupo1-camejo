const urlParams = new URLSearchParams(window.location.search);
const merch_param_id = urlParams.get('id');

const tiendaDeMusicaBackendURL = "http://localhost:3030/productos/merchandising/" + merch_param_id;

fetch(tiendaDeMusicaBackendURL)
  .then((respuesta) => {
    if (respuesta.status === 404) {
      alert("No existe una id: " + merch_param_id + " enlazada a algún merchandising, seleccione por favor otra.");
      return window.location.replace("./merch.html");
    }
    return respuesta.json();
  })
  .then((data) => {
    document.getElementById("nombre-merchandising").innerHTML = data.nombre_merchandising;
    document.getElementById("nombre-merch").innerHTML = data.nombre_merchandising;
    document.getElementById("precio-merch").innerHTML = "$" + data.precio_merchandising;
    document.getElementById("tipo-merch").innerHTML = data.tipo_merchandising;
    document.getElementById("marca-merch").innerHTML = data.marca_merchandising;
    document.getElementById("imagen-merch").src = data.imagen_merchandising;
  })
  .catch(error => {
    console.error("Error al obtener merchandising:", error);
  });



