import { Router } from "express";
import { CatalogoGenerosController } from "../controllers/CatalogoGenerosController";
import { authenticateJWT } from "../middlewares/auth.middleware"; // Middleware que valida el token JWT
import { authorizeRoles } from "../middlewares/role.middleware"; // Middleware que restringe acceso según rol

const router = Router();

// Rutas
router.get("/", authenticateJWT, authorizeRoles("Administrador"),  CatalogoGenerosController.obtenerTodos);
router.post("/", authenticateJWT, authorizeRoles("Administrador"),  CatalogoGenerosController.crearEstado);
router.get("/:id", authenticateJWT, authorizeRoles("Administrador"),  CatalogoGenerosController.obtenerPorId);
router.put("/:id", authenticateJWT, authorizeRoles("Administrador"),  CatalogoGenerosController.actualizarEstado);
router.delete("/:id", authenticateJWT, authorizeRoles("Administrador"),  CatalogoGenerosController.eliminarEstado);

export default router;