# Endpoints de la API de Autenticación

**URL base (local):** `http://localhost:3000`

| # | Método | Endpoint             | Descripción                                   | Body (JSON)                                              |
|---|--------|-----------------------|------------------------------------------------|------------------------------------------------------------|
| 1 | GET    | `/`                    | Verifica que el servidor esté activo           | —                                                          |
| 2 | POST   | `/api/auth/registro`   | Registra un nuevo usuario                      | `{ "usuario": "juanperez", "contrasena": "Clave1234" }`    |
| 3 | POST   | `/api/auth/login`      | Inicia sesión / valida credenciales            | `{ "usuario": "juanperez", "contrasena": "Clave1234" }`    |

## Respuestas esperadas

### POST /api/auth/registro
- **201 Created** – Registro exitoso:
```json
{ "exito": true, "mensaje": "Usuario registrado exitosamente.", "datos": { "id": 1, "usuario": "juanperez" } }
```
- **409 Conflict** – Usuario ya existe:
```json
{ "exito": false, "mensaje": "El usuario ya se encuentra registrado." }
```

### POST /api/auth/login
- **200 OK** – Autenticación satisfactoria:
```json
{ "exito": true, "mensaje": "Autenticacion satisfactoria.", "token": "..." }
```
- **401 Unauthorized** – Error en la autenticación:
```json
{ "exito": false, "mensaje": "Error en la autenticacion: usuario o contrasena incorrectos." }
```
