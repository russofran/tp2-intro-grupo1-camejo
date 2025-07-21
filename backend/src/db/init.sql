CREATE TABLE IF NOT EXISTS instrumentos (
    id_instrumento SERIAL PRIMARY KEY,
    tipo_instrumento VARCHAR(50) NOT NULL,
    nombre_instrumento VARCHAR(100) NOT NULL,
    marca_instrumento VARCHAR(100) NOT NULL,
    modelo_instrumento VARCHAR(100) NOT NULL,
    precio_instrumento INT NOT NULL,
    sucursal_instrumento VARCHAR(100) NOT NULL,
    disponible_instrumento BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS vendedores (
    id_vendedores SERIAL PRIMARY KEY,
    turno_vendedores VARCHAR(50) NOT NULL,
    nombre_vendedores VARCHAR(100) NOT NULL,
    ventas_vendedores INT, 
    sucursal_vendedores VARCHAR(100) NOT NULL,
    calificacion_vendedores INT NOT NULL,
    disponible_vendedores BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS merchandising (
    id_merchandising SERIAL PRIMARY KEY,
    tipo_merchandising VARCHAR(50) NOT NULL,
    nombre_merchandising VARCHAR(100) NOT NULL,
    marca_merchandising VARCHAR(100) NOT NULL,
    sucursal_merchandising VARCHAR(100) NOT NULL,
    precio_merchandising INT NOT NULL,
    disponible_merchandising BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS ventas_concretadas (
    id SERIAL PRIMARY KEY,
    tipo VARCHAR(50) NOT NULL,
    vendedor_id INT NOT NULL REFERENCES vendedores(id_vendedores) ON DELETE SET NULL,
    instrumento_id INT REFERENCES instrumentos(id_instrumento) ON DELETE SET NULL,
    merch_id INT REFERENCES merchandising(id_merchandising) ON DELETE SET NULL,
    precio_real_venta INT NOT NULL,
    fecha_venta VARCHAR(50)
);