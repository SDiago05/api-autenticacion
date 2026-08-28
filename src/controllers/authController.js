// controllers/authController.js
// -----------------------------------------------------------------------
// Aqui vive la logica de negocio de la autenticacion:
//   1. registrar()      -> crea un nuevo usuario en la base de datos
//   2. iniciarSesion()  -> valida credenciales y genera un token de acceso
// -----------------------------------------------------------------------

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

// Numero de "rondas" que usa bcrypt para generar el hash. A mayor numero,
// mas seguro pero mas lento. 10 es un valor estandar recomendado.
const SALT_ROUNDS = 10;

/**
 * POST /api/auth/registro
 * Registra un nuevo usuario en la base de datos.
 * La contrasena NUNCA se guarda en texto plano: se cifra con bcrypt.
 */
function registrar(req, res) {
  const { usuario, contrasena } = req.body;

  try {
    // Se verifica si el usuario ya existe para evitar duplicados
    const existente = db
      .prepare('SELECT id FROM usuarios WHERE usuario = ?')
      .get(usuario);

    if (existente) {
      return res.status(409).json({
        exito: false,
        mensaje: 'El usuario ya se encuentra registrado.',
      });
    }

    // Se genera el hash de la contrasena (cifrado unidireccional)
    const hashContrasena = bcrypt.hashSync(contrasena, SALT_ROUNDS);

    // Se inserta el nuevo usuario en la tabla "usuarios"
    const resultado = db
      .prepare('INSERT INTO usuarios (usuario, contrasena) VALUES (?, ?)')
      .run(usuario, hashContrasena);

    return res.status(201).json({
      exito: true,
      mensaje: 'Usuario registrado exitosamente.',
      datos: { id: resultado.lastInsertRowid, usuario },
    });
  } catch (error) {
    // Cualquier error inesperado (ej: fallo de base de datos) se captura aqui
    console.error('Error en registrar():', error.message);
    return res.status(500).json({
      exito: false,
      mensaje: 'Error interno del servidor al registrar el usuario.',
    });
  }
}

/**
 * POST /api/auth/login
 * Valida las credenciales del usuario.
 * - Si son correctas -> responde con mensaje de autenticacion satisfactoria + token JWT.
 * - Si son incorrectas -> responde con mensaje de error en la autenticacion.
 */
function iniciarSesion(req, res) {
  const { usuario, contrasena } = req.body;

  try {
    // Se busca el usuario en la base de datos
    const registro = db
      .prepare('SELECT * FROM usuarios WHERE usuario = ?')
      .get(usuario);

    // Si el usuario no existe, se responde con error de autenticacion.
    // (No se especifica si fue el usuario o la contrasena, por seguridad)
    if (!registro) {
      return res.status(401).json({
        exito: false,
        mensaje: 'Error en la autenticacion: usuario o contrasena incorrectos.',
      });
    }

    // Se compara la contrasena enviada contra el hash guardado en la base de datos
    const contrasenaValida = bcrypt.compareSync(contrasena, registro.contrasena);

    if (!contrasenaValida) {
      return res.status(401).json({
        exito: false,
        mensaje: 'Error en la autenticacion: usuario o contrasena incorrectos.',
      });
    }

    // Si las credenciales son correctas, se genera un token JWT
    // que el cliente podria usar en futuras peticiones protegidas.
    const token = jwt.sign(
      { id: registro.id, usuario: registro.usuario },
      process.env.JWT_SECRET || 'clave_secreta_super_segura_cambiar_en_produccion',
      { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
    );

    return res.status(200).json({
      exito: true,
      mensaje: 'Autenticacion satisfactoria.',
      token,
    });
  } catch (error) {
    console.error('Error en iniciarSesion():', error.message);
    return res.status(500).json({
      exito: false,
      mensaje: 'Error interno del servidor al iniciar sesion.',
    });
  }
}

module.exports = { registrar, iniciarSesion };
