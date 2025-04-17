import { Router } from "express";
import { MenuController } from "../controllers/MenuController";
import { authenticateJWT } from "../middlewares/auth.middleware"; // Middleware que valida el token JWT
import { authorizeRoles } from "../middlewares/role.middleware"; // Middleware que restringe acceso según rol

const router = Router();

// Rutas
router.get("/", authenticateJWT, authorizeRoles("Administrador"), MenuController.obtenerTodos);
router.post("/", authenticateJWT, authorizeRoles("Administrador"), MenuController.crearMenu);
router.get("/:id", authenticateJWT, authorizeRoles("Administrador"), MenuController.obtenerPorId);
router.put("/:id", authenticateJWT, authorizeRoles("Administrador"), MenuController.actualizarMenu);
router.delete("/:id", authenticateJWT, authorizeRoles("Administrador"), MenuController.eliminarMenu);

export default router;