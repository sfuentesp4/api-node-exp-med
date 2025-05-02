import { Request, Response } from "express";
import { SignosVitalesService } from "../services/SignosVitalesService";

export class SignosVitalesController {
  static async obtenerTodos(req: Request, res: Response): Promise<void> {
    try {
      const signos = await SignosVitalesService.obtenerTodos();
      res.status(200).json(signos);
    } catch (error) {
      res.status(500).json({ mensaje: "Error al obtener los signos vitales", error });
    }
  }

  static async crear(req: Request, res: Response): Promise<void> {
    try {
      const nuevoSigno = await SignosVitalesService.crear(req.body);
      res.status(201).json(nuevoSigno);
    } catch (error) {
      res.status(500).json({ mensaje: "Error al crear el signo vital", error });
    }
  }

  static async obtenerPorId(req: Request, res: Response): Promise<void> {
    try {
      const signo = await SignosVitalesService.obtenerPorId(Number(req.params.id));
      if (!signo) {
        res.status(404).json({ mensaje: "Signo vital no encontrado" });
        return;
      }
      res.status(200).json(signo);
    } catch (error) {
      res.status(500).json({ mensaje: "Error al obtener el signo vital", error });
    }
  }

  static async actualizar(req: Request, res: Response): Promise<void> {
    try {
      const actualizado = await SignosVitalesService.actualizar(Number(req.params.id), req.body);
      if (!actualizado) {
        res.status(404).json({ mensaje: "Signo vital no encontrado" });
        return;
      }
      res.status(200).json(actualizado);
    } catch (error) {
      res.status(500).json({ mensaje: "Error al actualizar el signo vital", error });
    }
  }

  static async eliminar(req: Request, res: Response): Promise<void> {
    try {
      const eliminado = await SignosVitalesService.eliminar(Number(req.params.id));
      if (!eliminado) {
        res.status(404).json({ mensaje: "Signo vital no encontrado" });
        return;
      }
      res.status(200).json({ mensaje: "Signo vital eliminado exitosamente" });
    } catch (error) {
      res.status(500).json({ mensaje: "Error al eliminar el signo vital", error });
    }
  }
}
