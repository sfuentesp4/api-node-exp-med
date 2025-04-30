import { Router } from "express";
import { RolesMenusController } from "../controllers/RolesMenusController";
import { authenticateJWT } from "../middlewares/auth.middleware"; // Middleware que valida el token JWT
import { authorizeRoles } from "../middlewares/role.middleware"; // Middleware que restringe acceso según rol

const router = Router();

// Rutas
router.get("/", authenticateJWT, authorizeRoles("Administrador"), RolesMenusController.obtenerTodos);
router.post("/", authenticateJWT, authorizeRoles("Administrador"), RolesMenusController.crearRolMenu);
router.get("/:id", authenticateJWT, authorizeRoles("Administrador"), RolesMenusController.obtenerPorId);
router.put("/:id", authenticateJWT, authorizeRoles("Administrador"), RolesMenusController.actualizarRolMenu);
router.delete("/:id", authenticateJWT, authorizeRoles("Administrador"), RolesMenusController.eliminarRolMenu);
router.get("/rol/:rolId", authenticateJWT, authorizeRoles("Administrador"), RolesMenusController.obtenerPorRolId);

export default router;