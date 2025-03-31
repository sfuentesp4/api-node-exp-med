//import { getRepository } from "typeorm";
import { Usuarios } from "../entities/Usuarios";
import bcrypt from "bcrypt";
import { AppDataSource } from '../config/AppDataSource';


export class UsuarioService {
  // Obtiene todos los usuarios incluyendo la relación con el rol
  static async obtenerTodos(): Promise<Usuarios[]> {
    const usuarioRepo = AppDataSource.getRepository(Usuarios);
    return await usuarioRepo.find({ relations: ["rol"] });
  }

  // Obtiene un usuario específico por ID
  static async obtenerPorId(id: number): Promise<Usuarios | undefined> {
    const usuarioRepo = AppDataSource.getRepository(Usuarios);
    const usuario = await usuarioRepo.findOne({ where: { usuarioId: id }, relations: ["rol"] });
    return usuario || undefined;
}

  // Crea un nuevo usuario y encripta la contraseña
  static async crear(data: Partial<Usuarios>): Promise<Usuarios> {
    if (!data.contrasena) {
      throw new Error("La contraseña es requerida");
    }
    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(data.contrasena.toString(), 10);
    data.contrasena = Buffer.from(hashedPassword);
    const usuarioRepo = AppDataSource.getRepository(Usuarios);
    const nuevoUsuario = usuarioRepo.create(data);
    return await usuarioRepo.save(nuevoUsuario);
  }

  // Actualiza un usuario y, si se envía una nueva contraseña, la cifra
  static async actualizar(id: number, data: Partial<Usuarios>): Promise<Usuarios | undefined> {
    const usuarioRepo = AppDataSource.getRepository(Usuarios);
    let usuario = await usuarioRepo.findOne( { where: { usuarioId: id } });
    if (!usuario) return undefined;
    
    if (data.contrasena) {
      const hashedPassword = await bcrypt.hash(data.contrasena.toString(), 10);
      data.contrasena = Buffer.from(hashedPassword);
    }
    
    usuarioRepo.merge(usuario, data);
    return await usuarioRepo.save(usuario);
  }

  // Elimina un usuario de forma lógica (actualizando el estado y fecha de eliminación)
  static async eliminar(id: number): Promise<boolean> {
    const usuarioRepo = AppDataSource.getRepository(Usuarios);
    const usuario = await usuarioRepo.findOne( { where: { usuarioId: id } });
    if (!usuario) return false;

    usuario.activo = false;
    usuario.fechaEliminacion = new Date();
    await usuarioRepo.save(usuario);
    return true;
  }
}