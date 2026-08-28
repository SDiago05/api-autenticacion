// db.js
// -----------------------------------------------------------------------
// Este archivo se encarga de crear la conexion a la base de datos SQLite
// y de asegurar que la tabla "usuarios" exista antes de que la API la use.
// Se usa SQLite porque es una base de datos liviana que no requiere
// instalar un servidor aparte, ideal para un proyecto academico/demo.
// -----------------------------------------------------------------------

const Database = require('better-sqlite3');
const path = require('path');

// Se crea (o se abre si ya existe) el archivo database.sqlite en la raiz del proyecto
const dbPath = path.join(__dirname, '..', 'database.sqlite');
const db = new Database(dbPath);

// Sentencia SQL para crear la tabla de usuarios si no existe todavia.
// - id: identificador unico autoincremental
// - usuario: nombre de usuario, debe ser unico (no se pueden repetir)
// - contrasena: aqui NUNCA se guarda en texto plano, se guarda ya cifrada (hash)
// - fecha_creacion: fecha en la que el usuario se registro
db.exec(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario TEXT UNIQUE NOT NULL,
    contrasena TEXT NOT NULL,
    fecha_creacion TEXT DEFAULT CURRENT_TIMESTAMP
  )
`);

// Se exporta la conexion para que los demas archivos (controladores) puedan usarla
module.exports = db;
