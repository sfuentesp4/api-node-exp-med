import { Router } from "express";
import { UsuarioController } from "../controllers/UsuarioController";
import { authenticateJWT } from "../middlewares/auth.middleware"; // Middleware que valida el token JWT
import { authorizeRoles } from "../middlewares/role.middleware"; // Middleware que restringe acceso según rol

const router = Router();

// Ruta para obtener todos los usuarios. Solo el rol "Administrador" tiene acceso.
router.get("/",authenticateJWT, authorizeRoles("Administrador"), UsuarioController.getUsuarios);

// Ruta para crear un nuevo usuario.
router.post("/",authenticateJWT, authorizeRoles("Administrador") , UsuarioController.crearUsuario);

// Ruta para obtener un usuario por ID.
router.get("/:id", authenticateJWT, authorizeRoles("Administrador"), UsuarioController.obtenerUsuarioPorId);

// Ruta para actualizar un usuario.
router.put("/:id", authenticateJWT, authorizeRoles("Administrador"), UsuarioController.actualizarUsuario);

// Ruta para eliminar (borrado lógico) un usuario.
router.delete("/:id", authenticateJWT, authorizeRoles("Administrador"), UsuarioController.eliminarUsuario);

router.post("/registro", UsuarioController.crearUsuario); // Ruta para registrar un nuevo usuario (sin autenticación previa)

export default router;