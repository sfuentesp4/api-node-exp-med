import { Router } from "express";
import { CatalogoPruebasLaboratorioController } from "../controllers/CatalogoPruebasLaboratorioController";
import { authenticateJWT } from "../middlewares/auth.middleware"; // Middleware que valida el token JWT
import { authorizeRoles } from "../middlewares/role.middleware"; // Middleware que restringe acceso según rol

const router = Router();

// Rutas
router.get("/", authenticateJWT, authorizeRoles("Administrador"),  CatalogoPruebasLaboratorioController.obtenerTodos);
router.post("/", authenticateJWT, authorizeRoles("Administrador"),  CatalogoPruebasLaboratorioController.crearEstado);
router.get("/:id", authenticateJWT, authorizeRoles("Administrador"),  CatalogoPruebasLaboratorioController.obtenerPorId);
router.put("/:id", authenticateJWT, authorizeRoles("Administrador"),  CatalogoPruebasLaboratorioController.actualizarEstado);
router.delete("/:id", authenticateJWT, authorizeRoles("Administrador"),  CatalogoPruebasLaboratorioController.eliminarEstado);

export default router;