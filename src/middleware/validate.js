// middleware/validate.js
// -----------------------------------------------------------------------
// Middleware encargado de validar que el usuario y la contrasena
// hayan sido enviados correctamente en el cuerpo (body) de la peticion,
// antes de que la logica del controlador se ejecute.
// -----------------------------------------------------------------------

function validarCredenciales(req, res, next) {
  const { usuario, contrasena } = req.body;

  // Se valida que ambos campos existan
  if (!usuario || !contrasena) {
    return res.status(400).json({
      exito: false,
      mensaje: 'Los campos "usuario" y "contrasena" son obligatorios.',
    });
  }

  // Se valida una longitud minima basica para evitar datos vacios o muy cortos
  if (usuario.trim().length < 3) {
    return res.status(400).json({
      exito: false,
      mensaje: 'El usuario debe tener al menos 3 caracteres.',
    });
  }

  if (contrasena.length < 4) {
    return res.status(400).json({
      exito: false,
      mensaje: 'La contrasena debe tener al menos 4 caracteres.',
    });
  }

  // Si todo esta bien, se continua hacia el siguiente middleware/controlador
  next();
}

module.exports = { validarCredenciales };
