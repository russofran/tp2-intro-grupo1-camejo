CREATE TABLE IF NOT EXIST instrumentos (
    id SERIAL PRIMARY KEY,
    tipo VARCHAR(50) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    marca VARCHAR(100) NOT NULL,
    modelo VARCHAR(100) NOT NULL,
    precio INT NOT NULL,
    sucursal VARCHAR(100) NOT NULL
    disponible BOOLEAN NOT NULL,
)

CREATE TABLE IF NOT EXIST vendedores (
    id SERIAL PRIMARY KEY,
    turno VARCHAR(50) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    ventas INT, # cantidad
    sucursal VARCHAR(100) NOT NULL,
    calificacion INT NOT NULL # Promedio de calificaciones dadas por los "compradores".
    disponible BOOLEAN NOT NULL,
)

CREATE TABLE IF NOT EXIST merch (
    id SERIAL PRIMARY KEY,
    tipo VARCHAR(50) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    marca VARCHAR(100) NOT NULL,
    sucursal VARCHAR(100) NOT NULL,
    disponible BOOLEAN NOT NULL,
)

CREATE TABLE IF NOT EXIST ventas_concretadas (
    id SERIAL PRIMARY KEY,
    tipo VARCHAR(50) NOT NULL, # venta online o venta presencial.
    vendedor_id INT NOT NULL REFERENCES vendedores(id) ON DELETE SET NULL,
    instrumento_id INT REFERENCES instrumentos(id) ON DELETE SET NULL,
    merch_id INT REFERENCES merch(id) ON DELETE SET NULL,
    precio_real_venta INT NOT NULL,
    turno VARCHAR(50)
)