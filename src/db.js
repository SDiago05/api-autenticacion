// db.js
// -----------------------------------------------------------------------
// Este archivo se encarga de "persistir" los usuarios registrados.
// Para mantener el proyecto simple y sin dependencias nativas que haya
// que compilar (como better-sqlite3, que requiere Visual Studio Build
// Tools en Windows), se usa un archivo JSON como base de datos.
// Se exponen funciones sencillas que imitan lo que haria una base de
// datos real: buscar por usuario, insertar y listar.
// -----------------------------------------------------------------------

const fs = require('fs');
const path = require('path');

// Ruta del archivo que actua como "base de datos"
const dbPath = path.join(__dirname, '..', 'usuarios.json');

// Si el archivo no existe todavia (primera vez que se ejecuta el proyecto),
// se crea con un arreglo vacio.
if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, JSON.stringify([], null, 2));
}

// Lee y devuelve todos los usuarios guardados actualmente en el archivo
function leerUsuarios() {
  const contenido = fs.readFileSync(dbPath, 'utf-8');
  return JSON.parse(contenido);
}

// Sobrescribe el archivo con la lista de usuarios actualizada
function guardarUsuarios(usuarios) {
  fs.writeFileSync(dbPath, JSON.stringify(usuarios, null, 2));
}

// Busca un usuario por su nombre de usuario. Devuelve el objeto encontrado
// o undefined si no existe.
function buscarPorUsuario(nombreUsuario) {
  const usuarios = leerUsuarios();
  return usuarios.find((u) => u.usuario === nombreUsuario);
}

// Inserta un nuevo usuario (con la contrasena ya cifrada) y devuelve el
// registro creado, incluyendo un id autoincremental sencillo.
function insertarUsuario(usuario, contrasenaHasheada) {
  const usuarios = leerUsuarios();
  const nuevoUsuario = {
    id: usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1,
    usuario,
    contrasena: contrasenaHasheada,
    fecha_creacion: new Date().toISOString(),
  };
  usuarios.push(nuevoUsuario);
  guardarUsuarios(usuarios);
  return nuevoUsuario;
}

module.exports = { buscarPorUsuario, insertarUsuario };
