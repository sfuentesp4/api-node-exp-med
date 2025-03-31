import { Request, Response } from "express";
import { UsuarioService } from "../services/UsuarioService";

export class UsuarioController {
  // Obtiene todos los usuarios
  static async getUsuarios(req: Request, res: Response): Promise<void> {
    try {
      const usuarios = await UsuarioService.obtenerTodos();
      res.status(200).json(usuarios);
    } catch (error) {
      res.status(500).json({ mensaje: "Error al obtener usuarios", error });
    }
  }

  // Crea un nuevo usuario
  static async crearUsuario(req: Request, res: Response): Promise<void> {
    try {
      const nuevoUsuario = await UsuarioService.crear(req.body);
      res.status(201).json(nuevoUsuario);
    } catch (error) {
      res.status(500).json({ mensaje: "Error al crear usuario", error });
    }
  }

  // Obtiene un usuario por su ID
  static async obtenerUsuarioPorId(req: Request, res: Response): Promise<void> {
    try {
      const usuarioId = Number(req.params.id);
      const usuario = await UsuarioService.obtenerPorId(usuarioId);
      if (!usuario) {
        res.status(404).json({ mensaje: "Usuario no encontrado" });
      }
      res.status(200).json(usuario);
    } catch (error) {
      res.status(500).json({ mensaje: "Error al obtener usuario", error });
    }
  }

  // Actualiza un usuario existente
  static async actualizarUsuario(req: Request, res: Response): Promise<void> {
    try {
      const usuarioId = Number(req.params.id);
      const usuarioActualizado = await UsuarioService.actualizar(usuarioId, req.body);
      if (!usuarioActualizado) {
        res.status(404).json({ mensaje: "Usuario no encontrado" });
      }
      res.status(200).json(usuarioActualizado);
    } catch (error) {
      res.status(500).json({ mensaje: "Error al actualizar usuario", error });
    }
  }

  // Elimina un usuario (borrado lógico)
  static async eliminarUsuario(req: Request, res: Response): Promise<void> {
    try {
      const usuarioId = Number(req.params.id);
      const resultado = await UsuarioService.eliminar(usuarioId);
      if (!resultado) {
        res.status(404).json({ mensaje: "Usuario no encontrado" });
      }
      res.status(200).json({ mensaje: "Usuario eliminado exitosamente" });
    } catch (error) {
      res.status(500).json({ mensaje: "Error al eliminar usuario", error });
    }
  }
}