import { Router } from "express";
import { CatalogoRolesController } from "../controllers/CatalogoRolesController";
import { authenticateJWT } from "../middlewares/auth.middleware"; // Middleware que valida el token JWT
import { authorizeRoles } from "../middlewares/role.middleware"; // Middleware que restringe acceso según rol

const router = Router();

// Rutas
router.get("/", authenticateJWT, authorizeRoles("Administrador"),  CatalogoRolesController.obtenerTodos);
router.post("/", authenticateJWT, authorizeRoles("Administrador"),  CatalogoRolesController.crearEstado);
router.get("/:id", authenticateJWT, authorizeRoles("Administrador"),  CatalogoRolesController.obtenerPorId);
router.put("/:id", authenticateJWT, authorizeRoles("Administrador"),  CatalogoRolesController.actualizarEstado);
router.delete("/:id", authenticateJWT, authorizeRoles("Administrador"),  CatalogoRolesController.eliminarEstado);

export default router;