import { Request, Response } from "express";
import { EspecialidadesService } from "../services/EspecialidadesService";

export class EspecialidadesController {
  // Obtiene todas las especialidades
  static async obtenerTodas(req: Request, res: Response): Promise<void> {
    try {
      const especialidades = await EspecialidadesService.obtenerTodas();
      res.status(200).json(especialidades);
    } catch (error) {
      res.status(500).json({ mensaje: "Error al obtener los registros", error });
    }
  }

  // Obtiene una especialidad específica por ID
  static async obtenerPorId(req: Request, res: Response): Promise<void> {
    try {
      const especialidad = await EspecialidadesService.obtenerPorId(Number(req.params.id));
      if (!especialidad) {
        res.status(404).json({ mensaje: "Registro no encontrado" });
        return;
      }
      res.status(200).json(especialidad);
    } catch (error) {
      res.status(500).json({ mensaje: "Error al obtener el registro", error });
    }
  }

    // Crea una nueva especialidad
    static async crear(req: Request, res: Response): Promise<void> {
        try {
            const nuevaEspecialidad = await EspecialidadesService.crear(req.body);
            res.status(201).json(nuevaEspecialidad);
        } catch (error) {
            res.status(500).json({ mensaje: "Error al crear el registro", error });
        }
    }

    // Actualiza una especialidad existente
    static async actualizar(req: Request, res: Response): Promise<void> {
        try {
            const especialidadActualizada = await EspecialidadesService.actualizar(Number(req.params.id), req.body);
            if (!especialidadActualizada) {
                res.status(404).json({ mensaje: "Registro no encontrado" });
                return;
            }
            res.status(200).json(especialidadActualizada);
        } catch (error) {
            res.status(500).json({ mensaje: "Error al actualizar el registro", error });
        }
    }
    
    // Elimina una especialidad
    static async eliminar(req: Request, res: Response): Promise<void> {
        try {
            await EspecialidadesService.eliminar(Number(req.params.id));
            res.status(200).json({ mensaje: "Registro eliminado exitosamente" });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al eliminar el registro", error });
        }
    }
} 