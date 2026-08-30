# API de Autenticación (Registro e Inicio de Sesión)

Proyecto desarrollado para la evidencia **GA7-220501096-AA5-EV01** del componente formativo *Construcción API*.

## Descripción

Servicio web REST construido con **Node.js + Express** que permite:
1. **Registrar** un nuevo usuario (`POST /api/auth/registro`).
2. **Iniciar sesión** (`POST /api/auth/login`), devolviendo:
   - Mensaje de **"Autenticacion satisfactoria"** + token JWT, si las credenciales son correctas.
   - Mensaje de **"Error en la autenticacion"**, si son incorrectas.

Las contraseñas se almacenan cifradas con `bcryptjs` (nunca en texto plano) y se guardan en un archivo **`usuarios.json`** que se crea automáticamente al iniciar el servidor (no requiere instalar ni compilar ninguna base de datos).

## Estructura del proyecto

```
api-autenticacion/
├── src/
│   ├── server.js                  # Punto de entrada del servidor
│   ├── db.js                      # Conexión y creación de la base de datos
│   ├── middleware/
│   │   └── validate.js            # Validación de datos de entrada
│   ├── controllers/
│   │   └── authController.js      # Lógica de registro y login
│   └── routes/
│       └── authRoutes.js          # Definición de endpoints
├── postman/
│   └── API_Autenticacion.postman_collection.json   # Colección para EV02
├── .env.example
├── .gitignore
├── ENDPOINTS.md
├── package.json
└── README.md
```

## Instalación y ejecución

Requisitos: tener [Node.js](https://nodejs.org) instalado (v18 o superior recomendado).

```bash
# 1. Clonar el repositorio
git clone <URL_DEL_REPOSITORIO>
cd api-autenticacion

# 2. Instalar las dependencias
npm install

# 3. Crear el archivo de variables de entorno
cp .env.example .env

# 4. Ejecutar el servidor
npm start
```

El servidor quedará disponible en `http://localhost:3000`.

## Endpoints

Ver el detalle completo en [ENDPOINTS.md](./ENDPOINTS.md).

## Pruebas con Postman

En la carpeta `postman/` se encuentra la colección `API_Autenticacion.postman_collection.json`, lista para importar en Postman (Import → File) y ejecutar las pruebas de registro y login.

## Control de versiones

Este proyecto fue inicializado con Git. Para conectarlo a un repositorio remoto (GitHub/GitLab):

```bash
git remote add origin <URL_DEL_REPOSITORIO_REMOTO>
git branch -M main
git push -u origin main
```

## Autor

Joan Sebastian Diago — Evidencia GA7-220501096-AA5-EV01 / EV02
