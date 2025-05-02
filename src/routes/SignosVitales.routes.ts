import { Router } from "express";
import { SignosVitalesController } from "../controllers/SignosVitalesController";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";

const router = Router();

// Rutas para Signos Vitales
router.get("/", authenticateJWT, authorizeRoles("Administrador"), SignosVitalesController.obtenerTodos);
router.post("/", authenticateJWT, authorizeRoles("Administrador"), SignosVitalesController.crear);
router.get("/:id", authenticateJWT, authorizeRoles("Administrador"), SignosVitalesController.obtenerPorId);
router.put("/:id", authenticateJWT, authorizeRoles("Administrador"), SignosVitalesController.actualizar);
router.delete("/:id", authenticateJWT, authorizeRoles("Administrador"), SignosVitalesController.eliminar);

export default router;
