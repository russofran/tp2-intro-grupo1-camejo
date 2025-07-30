// Get


const tiendaDeMusicaBackendURLPOST = "https://tp2-intro-grupo1-camejo-deploy-backend.onrender.com/admin/productos/agregarMerchandising";



function agregarMerchandising(e) {
    e.preventDefault(); // Evita recargar la página.

    const tipo_merchandising = document.getElementById("tipo-merchandising").value.trim();
    const nombre_merchandising = document.getElementById("nombre-merchandising").value.trim();
    const marca_merchandising = document.getElementById("marca-merchandising").value.trim();
    const img_merchandising = document.getElementById("img-merchandising").value.trim();
    const precio_merchandising = document.getElementById("precio-merchandising").value.trim();
    let disponible = document.getElementById("disponible-merchandising").value;

    // parseBoolean
    let disponible_bool = (disponible === "true"); // true o false si no es true.
    
    // Validación:
    if (!tipo_merchandising ||
        !nombre_merchandising || 
        !marca_merchandising ||
        !img_merchandising ||
        !precio_merchandising) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    // Validación: Precio debe ser un número positivo
    if (isNaN(precio_merchandising) || Number(precio_merchandising) <= 0) {
        alert("El precio debe ser un número válido mayor a 0.");
        return;
    }



    const body = {
        tipo_merchandising: tipo_merchandising,
        nombre_merchandising: nombre_merchandising,
        marca_merchandising: marca_merchandising,
        precio_merchandising: Number(precio_merchandising),
        imagen_merchandising: img_merchandising,
        disponible_merchandising: disponible_bool
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
            mensaje.textContent = "Merch registrado con éxito ✔";
            mensaje.style.color = "green";
            window.location.replace("./index-admin.html");
        } else if (respuesta.status === 400) {
            mensaje.textContent = "Bad Request";
            mensaje.style.color = "red";
            return
        }
        
    });
    
};

// Intentar cargar la venta_concretada en la base de datos.

document.getElementById("formulario_agregar_merchandising").addEventListener("submit", agregarMerchandising);

