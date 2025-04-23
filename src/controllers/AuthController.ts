// src/controllers/AuthController.ts
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
//import { getRepository } from 'typeorm';
import { Usuarios } from '../entities/Usuarios';
import { AppDataSource } from '../config/AppDataSource';


export class AuthController {
  static async login(req: Request, res: Response): Promise<void> {
    
    try {
      const { correoElectronico, contrasena } = req.body;
      
      // Busca el usuario por su nombre
      const usuarioRepo = AppDataSource.getRepository(Usuarios);
      // Se carga también la relación de rol, para incluirla en el token
      const usuario = await usuarioRepo.findOne({
        where: { correoElectronico: correoElectronico },
        relations: ['rol', 'rol.rolesMenus.menu'],
      });

      if (!usuario) {
        res.status(404).json({ mensaje: 'Usuario no encontrado' });
        return;
      }

      // Compara la contraseña recibida con la almacenada (se asume que se almacenó el hash en formato Buffer)
      // Convierte el Buffer a cadena para comparar
      const storedHash = usuario.contrasena.toString('utf8');
      const esPasswordValido = await bcrypt.compare(contrasena, storedHash);

      console.log('esPasswordValido', esPasswordValido);

      if (!esPasswordValido) {
        res.status(401).json({ mensaje: 'Credenciales inválidas' });
        return;
      }

      // Genera el token, incluyendo algunos datos básicos del usuario
      const token = jwt.sign(
        {
          id: usuario.usuarioId,
          correoElectronico: usuario.correoElectronico,
          rol: usuario.rol.descripcion, // o el campo que identifique el rol
        },
        process.env.JWT_SECRET as string,
        { expiresIn: '1h' }
      );

      usuario.contrasena = Buffer.alloc(0); // Limpia la contraseña antes de enviar la respuesta

      // Devuelve el token y los datos del usuario (sin la contraseña)
      res.json({ token, usuario });
      
    } catch (error) {
      res.status(500).json({ mensaje: 'Error en la autenticación', error });
    }
  }
}