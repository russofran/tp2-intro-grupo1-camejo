// Get


const tiendaDeMusicaBackendURLPOST = "http://localhost:3030/carrito/venta_concretada";

const obtenerTodosLosDatos = "http://localhost:3030/admin/todo";

fetch(obtenerTodosLosDatos).then((respuesta) => {
    return respuesta.json();
}).then((data) => {
    function CompletarSelectPrecio(selectId, data) {
        const select = document.getElementById(selectId);

        select.innerHTML = '<option value="">Seleccionar</option>';

        if (data) {
            data.forEach((campo) => {
                const newOption = document.createElement("option");
                newOption.value = campo.id;
                newOption.textContent = campo.nombre + " - $" + campo.precio;
                select.appendChild(newOption);
                newOption.dataset.precio = campo.precio;
            });
        }
    }

    function CompletarSelect(selectId, data) {

        const select = document.getElementById(selectId);

        select.innerHTML = '<option value="">Seleccionar</option>';

        if (data) {
            data.forEach((campo) => {
                const newOption = document.createElement("option");
                newOption.value = campo.id;
                newOption.textContent = campo.nombre;
                select.appendChild(newOption);
            });
        }
    }
    CompletarSelectPrecio("select-instrumento", data.instrumentos);
    CompletarSelectPrecio("select-merchandising", data.merchandising);
    CompletarSelect("select-vendedores", data.vendedores);

    // Actualizar precio al tocar el boton.

    document.getElementById("price-boton").addEventListener("click", function () {
        const select_instrumento = document.getElementById("select-instrumento");
        const select_merch = document.getElementById("select-merchandising");

        const precio_instrumento = select_instrumento.options[select_instrumento.selectedIndex].dataset.precio
            ? parseFloat(select_instrumento.options[select_instrumento.selectedIndex].dataset.precio): 0;
        const precio_merch = select_merch.options[select_merch.selectedIndex].dataset.precio
            ? parseFloat(select_merch.options[select_merch.selectedIndex].dataset.precio): 0;

        const precio_total = precio_instrumento + precio_merch;

        document.getElementById("precio-total").textContent = precio_total;

        window.precioFinalVenta = precio_total; // guardamos variable global.

    
    });
    document.getElementById("cancel-boton").addEventListener("click", function () {
        document.getElementById("precio-total").textContent = 0;        
        window.precioFinalVenta = 0;
    });
});


function enviarVenta(e) {
    e.preventDefault(); // Evita recargar la página.

    const id_vendedor = parseInt(document.getElementById("select-vendedores").value);
    const id_instrumento = parseInt(document.getElementById("select-instrumento").value);
    const id_merch = parseInt(document.getElementById("select-merchandising").value);

    const body = {
        tipo: document.getElementById("select-tipo").value,
        vendedor_id: id_vendedor,
        instrumento_id: id_instrumento,
        merch_id: id_merch,
        precio_real_venta: window.precioFinalVenta
    };

    
    // mientras espera el try:
    const mensaje = document.getElementById("mensaje-respuesta");
    mensaje.textContent = "Procesando venta..."; 
    mensaje.style.color = "blue";

    // validación
    if (isNaN(body.instrumento_id) && isNaN(body.merch_id)) {
        mensaje.textContent = "No podés registrar la venta si no seleccionás nada para comprar.";
        mensaje.style.color = "red";
        return;
    }
    if (!body.precio_real_venta) {
        mensaje.textContent = "Haga click en 'Ver Precio'";
        mensaje.style.color = "red";
        return
    }


    fetch(tiendaDeMusicaBackendURLPOST, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    }).then((respuesta) => {
        if (respuesta.status === 200) {
            mensaje.textContent = "Venta registrada con éxito ✔";
            mensaje.style.color = "green";
            window.location.replace("./index.html");
        } else if (respuesta.status === 400) {
            mensaje.textContent = "Click en 'ver precio' antes de comprar.";
            mensaje.style.color = "red";
            return
        }
        
    });
    
};

// Intentar cargar la venta_concretada en la base de datos.

document.getElementById("formulario_venta_concretada").addEventListener("submit", enviarVenta);

