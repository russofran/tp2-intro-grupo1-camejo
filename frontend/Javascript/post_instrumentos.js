// Get


const tiendaDeMusicaBackendURLPOST = "https://tp2-intro-grupo1-camejo-deploy-backend.onrender.com/admin/productos/agregarInstrumento";



function agregarInstrumento(e) {
    e.preventDefault(); // Evita recargar la página.

    const tipo_instrumento = document.getElementById("tipo-instrumento").value.trim();
    const nombre_instrumento = document.getElementById("nombre-instrumento").value.trim();
    const marca_instrumento = document.getElementById("marca-instrumento").value.trim();
    const modelo_instrumento = document.getElementById("modelo-instrumento").value.trim();
    const precio_instrumento = document.getElementById("precio-instrumento").value.trim();
    const img_instrumento = document.getElementById("img-instrumento").value.trim();
    let disponible = document.getElementById("disponible-instrumento").value;

    // parseBoolean
    let disponible_bool = disponible === "true" || disponible === true; // asegura boolean real

    
    // Validación:
    if (!tipo_instrumento ||
        !nombre_instrumento || 
        !marca_instrumento || 
        !modelo_instrumento || 
        !precio_instrumento) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    // Validación: Precio debe ser un número positivo
    if (isNaN(precio_instrumento) || Number(precio_instrumento) <= 0) {
        alert("El precio debe ser un número válido mayor a 0.");
        return;
    }



    const body = {
        tipo_instrumento: tipo_instrumento,
        nombre_instrumento: nombre_instrumento,
        marca_instrumento: marca_instrumento,
        modelo_instrumento: modelo_instrumento,
        precio_instrumento: Number(precio_instrumento),
        imagen_instrumento: img_instrumento,
        disponible_instrumento: disponible_bool
    };

    // mientras espera el try:
    const mensaje = document.getElementById("mensaje-respuesta");
    mensaje.textContent = "Procesando..."; 
    mensaje.style.color = "blue";

    fetch(tiendaDeMusicaBackendURLPOST, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    }).then((respuesta) => {
        if (respuesta.status === 200) {
            mensaje.textContent = "Instrumento registrado con éxito ✔";
            mensaje.style.color = "green";
            window.location.replace("./index.html");
        } else if (respuesta.status === 400) {
            mensaje.textContent = "Bad Request";
            mensaje.style.color = "red";
            return
        }
        
    });
    
};

// Intentar cargar la venta_concretada en la base de datos.

document.getElementById("formulario_agregar_instrumento").addEventListener("submit", agregarInstrumento);

