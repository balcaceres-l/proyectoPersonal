// backend/src/Services/usuarioService.js
import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import  pool  from "../Config/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Crear usuario
export const crearUsuario = async (nombre, correo, password, rol) => {
  let conn;
  try {
    conn = await pool.getConnection();

    // Verificar si el correo ya existe
    const [existe] = await conn.query("SELECT * FROM usuario WHERE correo = ?", [correo]);
    if (existe) {
      const error = new Error("El correo ya está registrado");
      error.statusCode = 400;
      throw error;
    }

    // Hashear contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insertar nuevo usuario
    const result = await conn.query(
      "INSERT INTO usuario (nombre, correo, password, rol) VALUES (?, ?, ?, ?)",
      [nombre, correo, hashedPassword, rol]
    );

    return {
      id: result.insertId,
      nombre,
      correo,
      rol,
    };
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.release();
  }
};

// Login usuario (sin JWT)
export const loginUsuario = async (correo, password) => {
  let conn;
  try {
    conn = await pool.getConnection();

    const [usuario] = await conn.query("SELECT * FROM usuario WHERE correo = ?", [correo]);
    

    if (!usuario) {
      const error = new Error("Usuario no encontrado");
      error.statusCode = 401;
      throw error;
    }

    const esValida = await bcrypt.compare(password, usuario.password);
    if (!esValida) {
      const error = new Error("Contraseña incorrecta");
      error.statusCode = 401;
      throw error;
    }

    // Devolvemos los datos sin la contraseña
    const { password: _, ...usuarioSinPass } = usuario;
    return usuarioSinPass;
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.release();
  }
};

// Obtener usuario por ID
export const obtenerUsuarioPorId = async (id) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const [usuario] = await conn.query("SELECT * FROM usuario WHERE id = ?", [id]);
    return usuario || null;
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.release();
  }
};

// Actualizar usuario
export const actualizarUsuario = async (id, datosActualizados) => {
  let conn;
  try {
    conn = await pool.getConnection();

    // Si hay una nueva foto, eliminar la anterior
    if (datosActualizados.foto_perfil) {
      const [usuarioActual] = await conn.query("SELECT foto_perfil FROM usuario WHERE id = ?", [id]);
      if (usuarioActual && usuarioActual.foto_perfil) {
        const rutaAnterior = path.join(__dirname, "../uploads/fotoPerfil", usuarioActual.foto_perfil);
        if (fs.existsSync(rutaAnterior)) {
          try {
            fs.unlinkSync(rutaAnterior);
            console.log("Foto anterior eliminada:", usuarioActual.foto_perfil);
          } catch (error) {
            console.error(" Error al eliminar foto anterior:", error);
          }
        }
      }
    }

    // Construir consulta dinámica de actualización
    const campos = [];
    const valores = [];
    for (const [key, value] of Object.entries(datosActualizados)) {
      campos.push(`${key} = ?`);
      valores.push(value);
    }

    if (campos.length === 0) return null;

    valores.push(id);

    const query = `UPDATE usuario SET ${campos.join(", ")} WHERE id = ?`;
    const result = await conn.query(query, valores);

    if (result.affectedRows === 0) return null;

    const [usuarioActualizado] = await conn.query(
      "SELECT id, nombre, correo, rol, idempresa, foto_perfil, curriculum_path FROM usuario WHERE id = ?",
      [id]
    );

    return usuarioActualizado;
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.release();
  }
};

// Eliminar usuario
export const eliminarUsuario = async (id) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query("DELETE FROM usuario WHERE id = ?", [id]);
    return result.affectedRows > 0;
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.release();
  }
};
