import { Router } from "express";
import { CatalogoEstadosFacturaController } from "../controllers/CatalogoEstadosFacturaController";
import { authenticateJWT } from "../middlewares/auth.middleware"; // Middleware que valida el token JWT
import { authorizeRoles } from "../middlewares/role.middleware"; // Middleware que restringe acceso según rol

const router = Router();

// Rutas
router.get("/", authenticateJWT, authorizeRoles("Administrador"),  CatalogoEstadosFacturaController.obtenerTodos);
router.post("/", authenticateJWT, authorizeRoles("Administrador"),  CatalogoEstadosFacturaController.crearEstado);
router.get("/:id", authenticateJWT, authorizeRoles("Administrador"),  CatalogoEstadosFacturaController.obtenerPorId);
router.put("/:id", authenticateJWT, authorizeRoles("Administrador"),  CatalogoEstadosFacturaController.actualizarEstado);
router.delete("/:id", authenticateJWT, authorizeRoles("Administrador"),  CatalogoEstadosFacturaController.eliminarEstado);

export default router;