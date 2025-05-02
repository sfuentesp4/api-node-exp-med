import { Router } from "express";
import { DoctoresController } from "../controllers/DoctoresController";
import { authenticateJWT } from "../middlewares/auth.middleware"; // Middleware que valida el token JWT
import { authorizeRoles } from "../middlewares/role.middleware"; // Middleware que restringe acceso según rol

const router = Router();

// Ruta para obtener todos los doctores
router.get("/", authenticateJWT, DoctoresController.getDoctores);

// Ruta para obtener un doctor por ID
router.get("/:id", authenticateJWT, DoctoresController.obtenerDoctorPorId);

// Ruta para crear un nuevo doctor (solo administradores)
router.post("/", authenticateJWT, authorizeRoles("Administrador"), DoctoresController.crearDoctor);

// Ruta para actualizar un doctor (solo administradores)
router.put("/:id", authenticateJWT, authorizeRoles("Administrador"), DoctoresController.actualizarDoctor);

// Ruta para eliminar un doctor (solo administradores)
router.delete("/:id", authenticateJWT, authorizeRoles("Administrador"), DoctoresController.eliminarDoctor);

export default router;

