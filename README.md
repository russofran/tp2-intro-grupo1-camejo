# 🚀 API - Tienda de música

API desarrollada en Node.js con Express y PostgreSQL.
---

## 📦 Requisitos

- [Node.js](https://nodejs.org/) v16+
- [npm](https://www.npmjs.com/) (incluido con Node)
- [PostgreSQL](https://www.postgresql.org/) corriendo localmente o en la nube

---

## 🔧 Instalación

Clona el proyecto y entra a la carpeta:

```bash
git clone https://github.com/russofran/tp2-intro-grupo1-camejo.git
```

instala las dependencias
```bash
npm install
```


Para probar la correcta instalación puedes colocar:
```bash
psql --help # para ver si se instaló correctamente Postgresql
npm --v # para ver si se instaló correctamente Node.js. (Debería salir la versión)
```
El proyecto debería instalar las siguientes dependencias
- Cors v2.8.5
- Express v5.1.0
- PostgreSQL v8.16.3
- nodemon v3.1.10

Siguiente paso iniciar la api rest:
Ejecutar en la terminal:
```bash

npm run dev
# en su defecto
npm run dev_wsl
```

## 🛠️ Comandos Makefile

Este proyecto incluye un **Makefile** para simplificar las tareas más comunes durante el desarrollo.  
### Comandos disponibles:

```bash
# Iniciar e instalar contenedor de la base de datos postgreSQL.
make start-db

# Detener el contenedor de la base de datos.
make stop-db

# Iniciar el proyecto api rest (ya instaladas sus dependencias).
make start-backend

# Iniciar backend y db.
make run-backend

# Iniciar el frontend e instalar el contenedor.
make start-frontend
```

### Chequear que se levantaron correctamente los contenedores>
```
docker ps
# Debería mostrar 2 contenedores
- Uno con imagen postgresSQL levantando en puerto 5432.
- Otro levantando el frontend con puerto en 8080.


# Puerto de la api rest: 3030 (backend).
```

