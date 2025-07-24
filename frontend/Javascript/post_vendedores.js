// Get


const tiendaDeMusicaBackendURLPOST = "https://tp2-intro-grupo1-camejo-deploy-backend.onrender.com/admin/staff/agregarVendedor";



function agregarVendedor(e) {
    e.preventDefault(); // Evita recargar la página.

    const turno_vendedores = document.getElementById("turno-vendedores").value.trim();
    const nombre_vendedores = document.getElementById("nombre-vendedores").value.trim();
    const sucursal_vendedores = document.getElementById("sucursal-vendedores").value.trim();
    const calificacion_vendedores = document.getElementById("calificacion-vendedores").value;
    let disponible = document.getElementById("disponible-vendedores").value;
    const ventas_vendedores = 0;
    // parseBoolean
    let disponible_bool = disponible === "true" || disponible === true; // asegura boolean real
    
    // Validación:
    if (!turno_vendedores ||
        !nombre_vendedores || 
        !sucursal_vendedores) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    // Validación: Precio debe ser un número positivo
    if (isNaN(calificacion_vendedores) || Number(calificacion_vendedores) <= 0) {
        alert("La calificación debe ser un número válido mayor a 0.");
        return;
    }



    const body = {
        turno_vendedores: turno_vendedores,
        nombre_vendedores: nombre_vendedores,
        ventas_vendedores: ventas_vendedores,
        sucursal_vendedores: sucursal_vendedores,
        calificacion_vendedores: Number(calificacion_vendedores),
        disponible_vendedores: disponible_bool
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
            mensaje.textContent = "vendedor agregado con éxito ✔";
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

document.getElementById("formulario_agregar_vendedor").addEventListener("submit", agregarVendedor);