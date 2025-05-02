import { Request, Response } from "express";
import { DoctoresService } from "../services/DoctoresService";

export class DoctoresController {
  // Obtiene todos los doctores
  static async getDoctores(req: Request, res: Response): Promise<void> {
    try {
      const doctores = await DoctoresService.obtenerTodos();
      res.status(200).json(doctores);
    } catch (error) {
      console.error("Error al obtener doctores:", error);
      res.status(500).json({ mensaje: "Error al obtener doctores", error: (error as Error).message });
    }
  }

  // Crea un nuevo doctor
  static async crearDoctor(req: Request, res: Response): Promise<void> {
    try {
      const nuevoDoctor = await DoctoresService.crear(req.body);
      res.status(201).json({
        mensaje: "Doctor creado exitosamente",
        doctor: nuevoDoctor
      });
    } catch (error) {
      console.error("Error al crear doctor:", error);
      res.status(500).json({ mensaje: "Error al crear doctor", error: (error as Error).message });
    }
  }

  // Obtiene un doctor por su ID
  static async obtenerDoctorPorId(req: Request, res: Response): Promise<void> {
    try {
      const doctorId = Number(req.params.id);
      
      if (isNaN(doctorId)) {
        res.status(400).json({ mensaje: "ID de doctor inválido" });
        return;
      }
      
      const doctor = await DoctoresService.obtenerPorId(doctorId);
      
      if (!doctor) {
        res.status(404).json({ mensaje: "Doctor no encontrado" });
        return;
      }
      
      res.status(200).json(doctor);
    } catch (error) {
      console.error("Error al obtener doctor:", error);
      res.status(500).json({ mensaje: "Error al obtener doctor", error: (error as Error).message });
    }
  }

  // Actualiza un doctor existente
  static async actualizarDoctor(req: Request, res: Response): Promise<void> {
    try {
      const doctorId = Number(req.params.id);
      
      if (isNaN(doctorId)) {
        res.status(400).json({ mensaje: "ID de doctor inválido" });
        return;
      }
      
      const doctorActualizado = await DoctoresService.actualizar(doctorId, req.body);
      
      if (!doctorActualizado) {
        res.status(404).json({ mensaje: "Doctor no encontrado" });
        return;
      }
      
      res.status(200).json({
        mensaje: "Doctor actualizado exitosamente",
        doctor: doctorActualizado
      });
    } catch (error) {
      console.error("Error al actualizar doctor:", error);
      res.status(500).json({ mensaje: "Error al actualizar doctor", error: (error as Error).message });
    }
  }

  // Elimina un doctor (borrado lógico)
  static async eliminarDoctor(req: Request, res: Response): Promise<void> {
    try {
      const doctorId = Number(req.params.id);
      
      if (isNaN(doctorId)) {
        res.status(400).json({ mensaje: "ID de doctor inválido" });
        return;
      }
      
      const resultado = await DoctoresService.eliminar(doctorId);
      
      if (!resultado) {
        res.status(404).json({ mensaje: "Doctor no encontrado" });
        return;
      }
      
      res.status(200).json({ mensaje: "Doctor eliminado exitosamente" });
    } catch (error) {
      console.error("Error al eliminar doctor:", error);
      res.status(500).json({ mensaje: "Error al eliminar doctor", error: (error as Error).message });
    }
  }
}



