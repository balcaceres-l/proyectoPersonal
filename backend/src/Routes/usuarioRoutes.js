// backend/src/Routes/usuarioRoutes.js
import { Router } from "express";
import * as userController from "../Controllers/usuarioController.js";
import { createUserValidators, runValidations } from "../Middleware/validator.js";
import uploadProfile from "../Config/multerProfile.js";

const router = Router();

// Crear usuario
router.post(
  "/",
  runValidations(createUserValidators),
  userController.postCrearUsuario
);

// Login (sin JWT)
router.post("/login", userController.loginUsuario);

router.get("/:id", userController.obtenerUsuarioPorId);
router.put(
  "/:id",
  
  (req, res, next) => {
    uploadProfile.single("foto_perfil")(req, res, (err) => {
      if (err) {
        console.error("Error de Multer:", err);

        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({ message: "El archivo es demasiado grande" });
        }
        if (err.code === "LIMIT_UNEXPECTED_FILE") {
          return res.status(400).json({ message: "Campo de archivo inesperado" });
        }
        return res.status(400).json({ message: `Error al subir archivo: ${err.message}` });
      }
      next();
    });
  },
  userController.putActualizarUsuario
);

// Eliminar usuario
router.delete("/:id", userController.deleteUsuario);

export default router;
