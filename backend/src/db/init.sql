CREATE TABLE IF NOT EXISTS instrumentos (
    id SERIAL PRIMARY KEY,
    tipo VARCHAR(50) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    marca VARCHAR(100) NOT NULL,
    modelo VARCHAR(100) NOT NULL,
    precio INT NOT NULL,
    sucursal VARCHAR(100) NOT NULL,
    disponible BOOLEAN NOT NULL
);
[
CREATE TABLE IF NOT EXISTS vendedores (
    id SERIAL PRIMARY KEY,
    turno VARCHAR(50) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    ventas INT, 
    sucursal VARCHAR(100) NOT NULL,
    calificacion INT NOT NULL,
    disponible BOOLEAN NOT NULL
);]

CREATE TABLE IF NOT EXISTS merchandising (
    id SERIAL PRIMARY KEY,
    tipo VARCHAR(50) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    marca VARCHAR(100) NOT NULL,
    sucursal VARCHAR(100) NOT NULL,
    disponible BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS ventas_concretadas (
    id SERIAL PRIMARY KEY,
    tipo VARCHAR(50) NOT NULL,
    vendedor_id INT NOT NULL REFERENCES vendedores(id) ON DELETE SET NULL,
    instrumento_id INT REFERENCES instrumentos(id) ON DELETE SET NULL,
    merch_id INT REFERENCES merchandising(id) ON DELETE SET NULL,
    precio_real_venta INT NOT NULL,
    turno VARCHAR(50)
);