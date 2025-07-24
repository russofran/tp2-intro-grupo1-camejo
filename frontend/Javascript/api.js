const API_URL = "https://tp2-intro-grupo1-camejo-deploy-backend.onrender.com";

export async function fetchInstrumentos() {
    const res = await fetch(`${API_URL}/productos/instrumentos`);
    if (!res.ok) {
        throw new Error("Error al obtener los instrumentos");
    }
    return await res.json();
}

export async function fetchUnInstrumento(id) {
    const res = await fetch(`${API_URL}/productos/instrumentos/${id}`);
    if (!res.ok) {
        throw new Error("Error al obtener el instrumento");
    }
    return await res.json();
}
