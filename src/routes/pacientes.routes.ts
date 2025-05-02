import { Router } from "express";
import { PacientesController } from "../controllers/PacientesController";
import { authenticateJWT } from "../middlewares/auth.middleware"; // Middleware que valida el token JWT
import { authorizeRoles } from "../middlewares/role.middleware"; // Middleware que restringe acceso según rol

const router = Router();

// Ruta para obtener todos los pacientes
router.get("/", authenticateJWT, PacientesController.getPacientes);

// Ruta para buscar pacientes por nombre o apellido
router.get("/buscar", authenticateJWT, PacientesController.buscarPacientes);

// Ruta para obtener un paciente por ID
router.get("/:id", authenticateJWT, PacientesController.obtenerPacientePorId);

// Ruta para crear un nuevo paciente (solo administradores y recepcionistas)
router.post("/", authenticateJWT, authorizeRoles("Administrador", "Recepcionista"), PacientesController.crearPaciente);

// Ruta para actualizar un paciente (solo administradores y recepcionistas)
router.put("/:id", authenticateJWT, authorizeRoles("Administrador", "Recepcionista"), PacientesController.actualizarPaciente);

// Ruta para eliminar un paciente (solo administradores)
router.delete("/:id", authenticateJWT, authorizeRoles("Administrador"), PacientesController.eliminarPaciente);

export default router;

