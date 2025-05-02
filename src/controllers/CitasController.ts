import { Request,Response } from "express";
import { CitasService } from "../services/CitasService";

export class CitasController {
    static async obtenerTodos(req: Request, res: Response): Promise<void> {
        try {
            const citas = await CitasService.obtenerTodos();
            res.status(200).json(citas);
        } catch (error) {
            res.status(500).json({ mensaje: "Error al obtener los registros", error });
        }
    }

    static async crearCita(req: Request, res: Response): Promise<void> {
        try {
            const nuevaCita = await CitasService.crearCita(req.body);
            res.status(201).json(nuevaCita);
        } catch (error) {
            res.status(500).json({ mensaje: "Error al crear el registro", error });
        }
    }

    static async obtenerPorId(req: Request, res: Response): Promise<void> {
        try {
            const cita = await CitasService.obtenerPorId(Number(req.params.id));
            if (!cita) {
                res.status(404).json({ mensaje: "Registro no encontrado" });
                return;
            }
            res.status(200).json(cita);
        } catch (error) {
            res.status(500).json({ mensaje: "Error al obtener el registro", error });
        }
    }

    static async actualizarCita(req: Request, res: Response): Promise<void> {
        try {
            const citaActualizada = await CitasService.actualizarCita(
                Number(req.params.id), 
                req.body
            );
            
            if (!citaActualizada) {
                res.status(404).json({ mensaje: "Registro no encontrado" });
                return;
            }
            
            res.status(200).json(citaActualizada);
        } catch (error : any){
            if (error.message.includes('no existe en la tabla')) {
                res.status(400).json({ 
                    mensaje: "Error de validación",
                    error: error.message 
                });
            } else {
                res.status(500).json({ 
                    mensaje: "Error al actualizar el registro", 
                    error: error.message 
                });
            }
        }
    }

    static async eliminarCita(req: Request, res: Response): Promise<void> {
        try {
            const resultado = await CitasService.eliminarCita(Number(req.params.id));
            if (!resultado) {
                res.status(404).json({ mensaje: "Registro no encontrado" });
                return;
            }
            res.status(200).json({ mensaje: "Registro eliminado correctamente" });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al eliminar el registro", error });
        }
    }
}    