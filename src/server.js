// server.js
// -----------------------------------------------------------------------
// Punto de entrada de la aplicacion. Aqui se configura el servidor
// Express, los middlewares globales y se montan las rutas de la API.
// -----------------------------------------------------------------------

require('dotenv').config(); // Carga las variables definidas en el archivo .env

const express = require('express');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware global: permite que Express entienda cuerpos de peticion en formato JSON
app.use(express.json());

// Ruta de prueba para verificar que el servidor esta corriendo
app.get('/', (req, res) => {
  res.status(200).json({
    exito: true,
    mensaje: 'API de autenticacion funcionando correctamente.',
  });
});

// Se montan todas las rutas de autenticacion bajo el prefijo /api/auth
// Esto significa que quedan disponibles:
//   POST /api/auth/registro
//   POST /api/auth/login
app.use('/api/auth', authRoutes);

// Middleware para manejar rutas que no existen (Error 404)
app.use((req, res) => {
  res.status(404).json({
    exito: false,
    mensaje: 'Recurso no encontrado.',
  });
});

// Se inicia el servidor en el puerto configurado
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
