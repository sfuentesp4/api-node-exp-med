import { Request, Response } from "express";
import { RolesMenusService } from "../services/RolesMenusService";

export class RolesMenusController {
    static async obtenerTodos(req: Request, res: Response): Promise<void> {
        try {
            const rolesMenus = await RolesMenusService.obtenerTodos();
            res.status(200).json(rolesMenus);
        } catch (error) {
            res.status(500).json({ mensaje: "Error al obtener los registros", error });
        }
    }

    static async crearRolMenu(req: Request, res: Response): Promise<void> {
        try {
            const nuevoRolMenu = await RolesMenusService.crearRolMenu(req.body);
            res.status(201).json(nuevoRolMenu);
        } catch (error) {
            res.status(500).json({ mensaje: "Error al crear el registro", error });
        }
    }

    static async obtenerPorId(req: Request, res: Response): Promise<void> {
        try {
            const rolMenu = await RolesMenusService.obtenerPorId(Number(req.params.id));
            if (!rolMenu) {
                res.status(404).json({ mensaje: "Registro no encontrado" });
                return;
            }
            res.status(200).json(rolMenu);
        } catch (error) {
            res.status(500).json({ mensaje: "Error al obtener el registro", error });
        }
    }

    static async actualizarRolMenu(req: Request, res: Response): Promise<void> {
        try {
            const rolMenuActualizado = await RolesMenusService.actualizarRolMenu(
                Number(req.params.id), 
                req.body
            );
            
            if (!rolMenuActualizado) {
                res.status(404).json({ mensaje: "Registro no encontrado" });
                return;
            }
            
            res.status(200).json(rolMenuActualizado);
        } catch (error: any) {
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

    static async eliminarRolMenu(req: Request, res: Response): Promise<void> {
        try {
            const resultado = await RolesMenusService.eliminarRolMenu(Number(req.params.id));
            if (!resultado) {
                res.status(404).json({ mensaje: "Registro no encontrado" });
                return;
            }
            res.status(200).json({ mensaje: "Registro eliminado exitosamente" });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al eliminar el registro", error });
        }
    }

    static async obtenerPorRolId(req: Request, res: Response): Promise<void> {
        try {
            const rolId = Number(req.params.rolId);
            const activo = req.query.activo ? req.query.activo === 'true' : undefined;
            
            const rolesMenus = await RolesMenusService.obtenerPorRolId(rolId, activo);
            
            if (rolesMenus.length === 0) {
                res.status(404).json({ 
                    mensaje: `No se encontraron menús para el rol con ID ${rolId}`,
                    data: []
                });
                return;
            }
            
            res.status(200).json({
                mensaje: `Menús encontrados para el rol ID ${rolId}`,
                data: rolesMenus
            });
        } catch (error) {
            res.status(500).json({ 
                mensaje: "Error al obtener los menús del rol",
                error: error instanceof Error ? error.message : error
            });
        }
    }
}   