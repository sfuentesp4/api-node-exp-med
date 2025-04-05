import { Request, Response } from "express";
import { CatalogoRolesService } from "../services/CatalogoRolesService";

export class CatalogoRolesController {
  static async obtenerTodos(req: Request, res: Response): Promise<void> {
    try {
      const estados = await CatalogoRolesService.obtenerTodos();
      res.status(200).json(estados);
    } catch (error) {
      res.status(500).json({ mensaje: "Error al obtener los registros", error });
    }
  }

  static async crearEstado(req: Request, res: Response): Promise<void> {
    try {
      const nuevoEstado = await CatalogoRolesService.crearEstado(req.body);
      res.status(201).json(nuevoEstado);
    } catch (error) {
      res.status(500).json({ mensaje: "Error al crear el registro", error });
    }
  }

  static async obtenerPorId(req: Request, res: Response): Promise<void> {
    try {
      const estado = await CatalogoRolesService.obtenerPorId(Number(req.params.id));
      if (!estado) {
        res.status(404).json({ mensaje: "Registro no encontrado" });
        return;
      }
      res.status(200).json(estado);
    } catch (error) {
      res.status(500).json({ mensaje: "Error al obtener el registro", error });
    }
  }

  static async actualizarEstado(req: Request, res: Response): Promise<void> {
    try {
      const estadoActualizado = await CatalogoRolesService.actualizarEstado(
        Number(req.params.id),
        req.body
      );
      if (!estadoActualizado) {
        res.status(404).json({ mensaje: "Registro no encontrado" });
        return;
      }
      res.status(200).json(estadoActualizado);
    } catch (error) {
      res.status(500).json({ mensaje: "Error al actualizar el registro", error });
    }
  }

  static async eliminarEstado(req: Request, res: Response): Promise<void> {
    try {
      const resultado = await CatalogoRolesService.eliminarEstado(Number(req.params.id));
      if (!resultado) {
        res.status(404).json({ mensaje: "Registro no encontrado" });
        return;
      }
      res.status(200).json({ mensaje: "Registro eliminado exitosamente" });
    } catch (error) {
      res.status(500).json({ mensaje: "Error al eliminar el registro", error });
    }
  }
}