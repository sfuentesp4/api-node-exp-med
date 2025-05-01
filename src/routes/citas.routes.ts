import { Router } from "express";
import { CitasController } from "../controllers/CitasController";
import { authenticateJWT } from "../middlewares/auth.middleware"; // Middleware que valida el token JWT
import { authorizeRoles } from "../middlewares/role.middleware"; // Middleware que restringe acceso según rol

const router = Router();

// Rutas
router.get("/", authenticateJWT, authorizeRoles("Administrador"), CitasController.obtenerTodos);
router.post("/", authenticateJWT, authorizeRoles("","Administrador"), CitasController.crearCita);
router.get("/:id", authenticateJWT, authorizeRoles("Administrador"), CitasController.obtenerPorId);
router.put("/:id", authenticateJWT, authorizeRoles("Administrador"), CitasController.actualizarCita);
router.delete("/:id", authenticateJWT, authorizeRoles("Administrador"), CitasController.eliminarCita);

export default router;