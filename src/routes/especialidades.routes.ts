import { Router } from "express";
import { EspecialidadesController } from "../controllers/EspecialidadesController";
import { authenticateJWT } from "../middlewares/auth.middleware"; // Middleware que valida el token JWT
import { authorizeRoles } from "../middlewares/role.middleware";

const router = Router();

// Rutas
router.get("/", authenticateJWT, authorizeRoles("Administrador"), EspecialidadesController.obtenerTodas);
router.post("/", authenticateJWT, authorizeRoles("Administrador"), EspecialidadesController.crear);
router.get("/:id", authenticateJWT, authorizeRoles("Administrador"), EspecialidadesController.obtenerPorId);
router.put("/:id", authenticateJWT, authorizeRoles("Administrador"), EspecialidadesController.actualizar);
router.delete("/:id", authenticateJWT, authorizeRoles("Administrador"), EspecialidadesController.eliminar);

export default router;