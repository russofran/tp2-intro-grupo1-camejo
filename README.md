# 🚀 API - Tienda de música

API desarrollada en Node.js con Express para la conexión http entre el frontend (http server) y la base de datos PostgreSQL.

---

# 🌐 Deploy Web

El proyecto se encuentra levantado con Render en la siguiente página web:
 https://tp2-intro-grupo1-camejo-despliegue.onrender.com/

La base de datos donde se guardan los datos se encuentra levantado en la siguiente web:
 https://tp2-intro-grupo1-camejo-deploy-backend.onrender.com/ 


# 💻 Deploy local

Si se quiere hacer un deploy local se debe tener instalado los REQUISITOS mencionados más adelante en su respectivo apartado y seguir los pasos de la instalación correspondiente.

---

# 🏗️ Composicion

El proyecto está dividido en 3:
1. Backend API REST con express (Recibe peticiones HTTP, realiza la consulta a la base de datos acorde a esa petición mediante psql, hace las validaciones correspondientes y devuelve el resultado al frontend por medio de un json).
2. Base de datos PostgreSQL (Almacena en 4 tablas distintas nuestras entidades a trabajar en la tienda, recibe las consultas de la api y realiza las querys correspondientes).
3. Frontend levantado con http-server o en el deploy web.

---

## ❓ Introducción

El proyecto consta de una página web a la cual un usuario puede acceder y realizar ciertas acciones de manejo de base de datos por medio de la misma página.
_Estas acciones pueden ser: **Agregar objeto, Borrar objeto, Editar objeto y Eliminar objeto.** (En algunas ocasiones eliminar y archivar)._

El proyecto está basado principalmente en el manejo de las compra - venta de una tienda de música (Online y / o virtual si se quiere) en la cual podemos realizar las acciones mencionadas anteriormente (CRUD) sobre 4 entidades distintas:

### Entidades
_Productos (De la "web"):_

- Instrumentos
- Merchandising

_Staff:_

- Vendedores

_Ventas:_

- Ventas Concretadas


### Secciones de la página
Se encuentra dividida en dos secciones:
- Para el posible cliente que visite la página puede realizar una compra mediante un "carrito".
- Vista de administrador. (Recurso más utilizado de la página).

### Acciones de Administrador con la base de datos (CRUD)
El administrador puede realizar las siguientes acciones:
  Agregar, borrar y archivar, editar y consultar Instrumentos.

  Agregar, borrar y archivar, editar y consultar Vendedores.

  Agregar, borrar y archivar, editar y consultar Merchandising.
  
  Agregar, borrar, editar y consultar Ventas Concretadas (Realizadas en carrito al "comprar").

_Todas estas acciones quedan registradas en la base de datos postgres._

---

## 📦 Requisitos

- Linux -> Ubuntu
- [Node.js](https://nodejs.org/) v16+
- [npm](https://www.npmjs.com/) (incluido con Node).
- [PostgreSQL](https://www.postgresql.org/) corriendo localmente con docker o en la nube.
- [Docker](https://docs.docker.com/get-started/) servidor para levantar el frontend y la base de datos (Por separado si se quiere).

---

## 🔧 Pasos para la instalación en Ubuntu

1. Abrir una terminal.

2. Ir hasta una carpeta donde querramos instalar el programa (será otra carpeta dentro).

3. Clona el proyecto y entra a la carpeta del proyecto:

```bash
git clone https://github.com/russofran/tp2-intro-grupo1-camejo.git
cd
```

2. instala las dependencias del
```bash
# Parado sobre la carpeta "Backend":
cd /backend
npm install
```

Para probar la correcta instalación puedes colocar:
```bash
npm --v # para ver si se instaló correctamente Node.js. (Debería salir la versión)
```

El proyecto debería instalar las siguientes dependencias
- Cors v2.8.5
- Express v5.1.0
- PostgreSQL v8.16.3
- nodemon v3.1.10


3. Siguiente paso iniciar la api rest:
3.a Cambiar el directorio a ./backend ejecutar en la terminal:
```bash
cd /backend

npm run dev

# En su defecto:

npm run dev_wsl

# En su defecto:

./node_modules/.bin/nodemon src/api.js
```

## 🛠️ Makefile

Este proyecto incluye un **Makefile** para simplificar las tareas más comunes durante el desarrollo.  
### Comandos disponibles:

```bash
# Iniciar e instalar contenedor de la base de datos postgreSQL.
make start-db

# Detener el contenedor de la base de datos.
make stop-db

# Iniciar el frontend e instalar el contenedor.
make start-frontend

# Detener el contenedor del frontend.
make stop-frontend
```
__Es necesario docker para realizar estas acciones__

### Chequear que se levantaron correctamente los contenedores>
```
docker ps
```
Debería mostrar 2 contenedores
- Uno con imagen postgresSQL levantando en puerto 5432.
- Otro levantando el frontend con puerto en 8080.

Puerto de la api rest: 3030 (backend).


🎉 Si llegaste hasta acá y pudiste levantar los contenedores ya podes acceder a localhost:8080/index.html en el navegador y adentrarse en la página.

--- 

# Composición de la base de datos (CRUD).

## 📋 Tablas

**🎸 Instrumentos**

| id_instrumento | tipo_instrumento | nombre_instrumento | marca_instrumento | modelo_instrumento | precio_instrumento | imagen_instrumento            | disponible_instrumento |
| -------------- |:----------------:| ------------------- | ----------------- | ------------------ | ------------------ | ---------------------------- |:----------------------:|
| 1              | Guitarra         | Stratocaster        | Fender            | Player Plus        | 120000            | https://example.com/strato.jpg |          true          |

**👕 Merchandising**

| id_merchandising | tipo_merchandising | nombre_merchandising | marca_merchandising | imagen_merchandising            | precio_merchandising | disponible_merchandising |
| ---------------- |:-----------------:| --------------------- | ------------------- | ----------------------------- | -------------------- |:------------------------:|
| 1                | Remera            | Remera Rock Festival  | RockWear            | https://example.com/remera.jpg | 5000                 |          true

**👨‍💼 Vendedores**

| id_vendedores | turno_vendedores | nombre_vendedores | ventas_vendedores | sucursal_vendedores | calificacion_vendedores | disponible_vendedores |
| ------------- |:----------------:| ----------------- | ----------------- | ------------------- | ---------------------- |:---------------------:|
| 1             | Mañana           | Juan Pérez        | 35                | Sucursal Centro     | 5                      |         true          |

**📈 Ventas Concretadas**

| id | tipo        | vendedor_id | vendedor_despedido | instrumento_id | instrumento_borrado | merch_id | merchandising_borrado | precio_real_venta | fecha_venta |
| -- |:-----------:| ----------- | ------------------ | -------------- | ------------------- | -------- | --------------------- | ---------------- | ------------ |
| 1  | Online      | 1           | NULL               | 1              | NULL                | NULL     | Gorra Ac/dc           | 115000           | 2025-07-30   |
| 1  | Local       | NULL        | Lucas Brunacci     | 1              | NULL                | NULL     | NULL                  | 115000           | 2025-07-30   |

__Los campos instrumento_borrado, merchandising_borrado y vendedor_despedido se completan automaticamente al borrar alguna entidad relacionada a esta tabla__


# Funcionamiento de la página (Con imágenes)





