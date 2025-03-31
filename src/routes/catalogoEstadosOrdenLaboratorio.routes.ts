import { Router } from "express";
import { CatalogoEstadosOrdenLaboratorioController } from "../controllers/CatalogoEstadosOrdenLaboratorioController";
import { authenticateJWT } from "../middlewares/auth.middleware"; // Middleware que valida el token JWT
import { authorizeRoles } from "../middlewares/role.middleware"; // Middleware que restringe acceso según rol

const router = Router();

// Rutas
router.get("/", authenticateJWT, authorizeRoles("Administrador"),  CatalogoEstadosOrdenLaboratorioController.obtenerTodos);
router.post("/", authenticateJWT, authorizeRoles("Administrador"),  CatalogoEstadosOrdenLaboratorioController.crearEstado);
router.get("/:id", authenticateJWT, authorizeRoles("Administrador"),  CatalogoEstadosOrdenLaboratorioController.obtenerPorId);
router.put("/:id", authenticateJWT, authorizeRoles("Administrador"),  CatalogoEstadosOrdenLaboratorioController.actualizarEstado);
router.delete("/:id", authenticateJWT, authorizeRoles("Administrador"),  CatalogoEstadosOrdenLaboratorioController.eliminarEstado);

export default router;