import { Request, Response } from "express";
import { PacientesService } from "../services/PacientesService";

export class PacientesController {
  // Obtiene todos los pacientes
  static async getPacientes(req: Request, res: Response): Promise<void> {
    try {
      const pacientes = await PacientesService.obtenerTodos();
      res.status(200).json(pacientes);
    } catch (error) {
      console.error("Error al obtener pacientes:", error);
      res.status(500).json({ mensaje: "Error al obtener pacientes", error: (error as Error).message });
    }
  }

  // Crea un nuevo paciente
  static async crearPaciente(req: Request, res: Response): Promise<void> {
    try {
      const nuevoPaciente = await PacientesService.crear(req.body);
      res.status(201).json({
        mensaje: "Paciente creado exitosamente",
        paciente: nuevoPaciente
      });
    } catch (error) {
      console.error("Error al crear paciente:", error);
      res.status(500).json({ mensaje: "Error al crear paciente", error: (error as Error).message });
    }
  }

  // Obtiene un paciente por su ID
  static async obtenerPacientePorId(req: Request, res: Response): Promise<void> {
    try {
      const pacienteId = Number(req.params.id);
      
      if (isNaN(pacienteId)) {
        res.status(400).json({ mensaje: "ID de paciente inválido" });
        return;
      }
      
      const paciente = await PacientesService.obtenerPorId(pacienteId);
      
      if (!paciente) {
        res.status(404).json({ mensaje: "Paciente no encontrado" });
        return;
      }
      
      res.status(200).json(paciente);
    } catch (error) {
      console.error("Error al obtener paciente:", error);
      res.status(500).json({ mensaje: "Error al obtener paciente", error: (error as Error).message });
    }
  }

  // Actualiza un paciente existente
  static async actualizarPaciente(req: Request, res: Response): Promise<void> {
    try {
      const pacienteId = Number(req.params.id);
      
      if (isNaN(pacienteId)) {
        res.status(400).json({ mensaje: "ID de paciente inválido" });
        return;
      }
      
      const pacienteActualizado = await PacientesService.actualizar(pacienteId, req.body);
      
      if (!pacienteActualizado) {
        res.status(404).json({ mensaje: "Paciente no encontrado" });
        return;
      }
      
      res.status(200).json({
        mensaje: "Paciente actualizado exitosamente",
        paciente: pacienteActualizado
      });
    } catch (error) {
      console.error("Error al actualizar paciente:", error);
      res.status(500).json({ mensaje: "Error al actualizar paciente", error: (error as Error).message });
    }
  }

  // Elimina un paciente (borrado lógico)
  static async eliminarPaciente(req: Request, res: Response): Promise<void> {
    try {
      const pacienteId = Number(req.params.id);
      
      if (isNaN(pacienteId)) {
        res.status(400).json({ mensaje: "ID de paciente inválido" });
        return;
      }
      
      const resultado = await PacientesService.eliminar(pacienteId);
      
      if (!resultado) {
        res.status(404).json({ mensaje: "Paciente no encontrado" });
        return;
      }
      
      res.status(200).json({ mensaje: "Paciente eliminado exitosamente" });
    } catch (error) {
      console.error("Error al eliminar paciente:", error);
      res.status(500).json({ mensaje: "Error al eliminar paciente", error: (error as Error).message });
    }
  }

  // Buscar pacientes por nombre o apellido
  static async buscarPacientes(req: Request, res: Response): Promise<void> {
    try {
      const termino = req.query.termino as string;
      
      if (!termino || termino.length < 2) {
        res.status(400).json({ mensaje: "El término de búsqueda debe tener al menos 2 caracteres" });
        return;
      }
      
      const pacientes = await PacientesService.buscarPorNombreApellido(termino);
      res.status(200).json(pacientes);
    } catch (error) {
      console.error("Error al buscar pacientes:", error);
      res.status(500).json({ mensaje: "Error al buscar pacientes", error: (error as Error).message });
    }
  }
}

