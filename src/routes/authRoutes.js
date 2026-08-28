// routes/authRoutes.js
// -----------------------------------------------------------------------
// Define los endpoints (rutas) relacionados con la autenticacion
// y los conecta con su respectivo controlador y middleware de validacion.
// -----------------------------------------------------------------------

const express = require('express');
const router = express.Router();

const { registrar, iniciarSesion } = require('../controllers/authController');
const { validarCredenciales } = require('../middleware/validate');

// Endpoint para registrar un nuevo usuario
// Metodo: POST | Ruta: /api/auth/registro
router.post('/registro', validarCredenciales, registrar);

// Endpoint para iniciar sesion
// Metodo: POST | Ruta: /api/auth/login
router.post('/login', validarCredenciales, iniciarSesion);

module.exports = router;
