import { Request, Response } from "express";
import { MenuService } from "../services/MenuService";

export class MenuController {
    static async obtenerTodos(req: Request, res: Response): Promise<void> {
        try {
        const menus = await MenuService.obtenerTodos();
        res.status(200).json(menus);
        } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener los registros", error });
        }
    }
    
    static async crearMenu(req: Request, res: Response): Promise<void> {
        try {
        const nuevoMenu = await MenuService.crearMenu(req.body);
        res.status(201).json(nuevoMenu);
        } catch (error) {
        res.status(500).json({ mensaje: "Error al crear el registro", error });
        }
    }
    
    static async obtenerPorId(req: Request, res: Response): Promise<void> {
        try {
        const menu = await MenuService.obtenerPorId(Number(req.params.id));
        if (!menu) {
            res.status(404).json({ mensaje: "Registro no encontrado" });
            return;
        }
        res.status(200).json(menu);
        } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener el registro", error });
        }
    }
    
    static async actualizarMenu(req: Request, res: Response): Promise<void> {
        try {
        const menuActualizado = await MenuService.actualizarMenu(Number(req.params.id),req.body);
        if (!menuActualizado) {
            res.status(404).json({ mensaje: "Registro no encontrado" });
            return;
        }
        res.status(200).json(menuActualizado);
        } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar el registro", error });
        }
    }
    
    static async eliminarMenu(req: Request, res: Response): Promise<void> {
        try {
        const resultado = await MenuService.eliminarMenu(Number(req.params.id));
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