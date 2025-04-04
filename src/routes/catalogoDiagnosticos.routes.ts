import { Router } from "express";
import { CatalogoDiagnosticosController } from "../controllers/CatalogoDiagnosticosController";
import { authenticateJWT } from "../middlewares/auth.middleware"; // Middleware que valida el token JWT
import { authorizeRoles } from "../middlewares/role.middleware"; // Middleware que restringe acceso según rol

const router = Router();

// Rutas
router.get("/", authenticateJWT, authorizeRoles("Administrador"),  CatalogoDiagnosticosController.obtenerTodos);
router.post("/", authenticateJWT, authorizeRoles("Administrador"),  CatalogoDiagnosticosController.crearEstado);
router.get("/:id", authenticateJWT, authorizeRoles("Administrador"),  CatalogoDiagnosticosController.obtenerPorId);
router.put("/:id", authenticateJWT, authorizeRoles("Administrador"),  CatalogoDiagnosticosController.actualizarEstado);
router.delete("/:id", authenticateJWT, authorizeRoles("Administrador"),  CatalogoDiagnosticosController.eliminarEstado);

export default router;