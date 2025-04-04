import { Request, Response } from "express";
import { CatalogoDiagnosticosService } from "../services/CatalogoDiagnosticosService";

export class CatalogoDiagnosticosController {
  static async obtenerTodos(req: Request, res: Response): Promise<void> {
    try {
      const estados = await CatalogoDiagnosticosService.obtenerTodos();
      res.status(200).json(estados);
    } catch (error) {
      res.status(500).json({ mensaje: "Error al obtener los estados", error });
    }
  }

  static async crearEstado(req: Request, res: Response): Promise<void> {
    try {
      const nuevoEstado = await CatalogoDiagnosticosService.crearEstado(req.body);
      res.status(201).json(nuevoEstado);
    } catch (error) {
      res.status(500).json({ mensaje: "Error al crear el estado", error });
    }
  }

  static async obtenerPorId(req: Request, res: Response): Promise<void> {
    try {
      const estado = await CatalogoDiagnosticosService.obtenerPorId(Number(req.params.id));
      if (!estado) {
        res.status(404).json({ mensaje: "Estado no encontrado" });
        return;
      }
      res.status(200).json(estado);
    } catch (error) {
      res.status(500).json({ mensaje: "Error al obtener el estado", error });
    }
  }

  static async actualizarEstado(req: Request, res: Response): Promise<void> {
    try {
      const estadoActualizado = await CatalogoDiagnosticosService.actualizarEstado(
        Number(req.params.id),
        req.body
      );
      if (!estadoActualizado) {
        res.status(404).json({ mensaje: "Estado no encontrado" });
        return;
      }
      res.status(200).json(estadoActualizado);
    } catch (error) {
      res.status(500).json({ mensaje: "Error al actualizar el estado", error });
    }
  }

  static async eliminarEstado(req: Request, res: Response): Promise<void> {
    try {
      const resultado = await CatalogoDiagnosticosService.eliminarEstado(Number(req.params.id));
      if (!resultado) {
        res.status(404).json({ mensaje: "Estado no encontrado" });
        return;
      }
      res.status(200).json({ mensaje: "Estado eliminado exitosamente" });
    } catch (error) {
      res.status(500).json({ mensaje: "Error al eliminar el estado", error });
    }
  }
}