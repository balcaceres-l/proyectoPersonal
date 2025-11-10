// backend/src/Controllers/usuarioController.js
import * as usuarioService from "../Services/usuarioService.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Crear usuario
export const postCrearUsuario = async (req, res, next) => {
  try {
    console.log('🟣 [Controller] POST /api/usuarios ejecutado');
    console.log('📦 Cuerpo recibido:', req.body);

    const { nombre, correo, password, rol } = req.body;

    if (!nombre || !correo || !password || !rol) {
      console.log('⚠️ Faltan campos obligatorios');
      const error = new Error("Todos los campos son obligatorios");
      error.statusCode = 400;
      throw error;
    }

    // 🔹 Crear usuario mediante el servicio
    const nuevoUsuario = await usuarioService.crearUsuario(nombre, correo, password, rol);
    console.log('🟢 Usuario creado desde el servicio:', nuevoUsuario);

    // 🔹 Convertir BigInt → String (para evitar el error "Do not know how to serialize a BigInt")
    const safeUsuario = JSON.parse(
      JSON.stringify(nuevoUsuario, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
      )
    );

    console.log('📤 Usuario preparado para enviar:', safeUsuario);

    // 🔹 Enviar respuesta
    res.status(201).json({
      message: "Usuario creado correctamente",
      data: safeUsuario,
    });
  } catch (err) {
    console.error('🔴 Error en postCrearUsuario:', err);
    next(err);
  }
};

// Obtener usuario por ID
export const obtenerUsuarioPorId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const usuario = await usuarioService.obtenerUsuarioPorId(id);

    if (!usuario) {
      const error = new Error("Usuario no encontrado");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json(usuario);
  } catch (err) {
    next(err);
  }
};

// Actualizar usuario (sin autenticación JWT)
export const putActualizarUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;

    let datosActualizados = { ...req.body };
    if (req.file) {
      datosActualizados.foto_perfil = req.file.filename;
    }

    // Limpieza de campos no modificables
    delete datosActualizados.password;
    delete datosActualizados.contraseña;
    delete datosActualizados.rol;
    delete datosActualizados.id;
    delete datosActualizados.curriculum_path;
    delete datosActualizados.idempresa;

    // Convertir strings vacíos o "null"/"undefined" a null
    Object.keys(datosActualizados).forEach((key) => {
      if (
        datosActualizados[key] === "" ||
        datosActualizados[key] === "null" ||
        datosActualizados[key] === "undefined"
      ) {
        datosActualizados[key] = null;
      }
    });

    const usuarioActualizado = await usuarioService.actualizarUsuario(
      id,
      datosActualizados
    );

    if (!usuarioActualizado) {
      const error = new Error("Usuario no encontrado");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json(usuarioActualizado);
  } catch (err) {
    console.error("❌ Error en putActualizarUsuario:", err);
    if (req.file) {
      const rutaArchivo = path.join(
        __dirname,
        "../uploads/fotoPerfil",
        req.file.filename
      );
      if (fs.existsSync(rutaArchivo)) {
        fs.unlinkSync(rutaArchivo);
        console.log("🗑️ Archivo eliminado por error:", req.file.filename);
      }
    }
    next(err);
  }
};

// Eliminar usuario (sin autenticación JWT)
export const deleteUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;
    const eliminado = await usuarioService.eliminarUsuario(id);

    if (!eliminado) {
      const error = new Error("Usuario no encontrado");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ mensaje: "Usuario eliminado correctamente" });
  } catch (err) {
    next(err);
  }
};

export const loginUsuario = async (req, res, next) => {
  try {
    console.log("🟣 [Controller] POST /api/usuarios/login ejecutado");
    console.log("📦 Cuerpo recibido:", req.body);

    const { correo, password } = req.body;

    if (!correo || !password) {
      const error = new Error("Correo y contraseña son obligatorios");
      error.statusCode = 400;
      throw error;
    }

    const usuario = await usuarioService.loginUsuario(correo, password);
    console.log("Usuario autenticado:", usuario);
    console.log("📩 Contraseña recibida del front:", password);
    console.log("🧱 Hash guardado en BD:", usuario?.password);
    res.status(200).json({
      message: "Inicio de sesión exitoso",
      data: usuario,
    });
  } catch (err) {
    console.error("🔴 Error en loginUsuario:", err);
    next(err);
  }
};