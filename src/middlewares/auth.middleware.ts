// src/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Define la interfaz para el payload del JWT
interface JwtPayload {
  id: number;
  nombreUsuario: string;
  rol: string;
  iat: number;
  exp: number;
}

// Extiende la interfaz Request para incluir la propiedad "user"
export interface AuthRequest extends Request {
  user?: JwtPayload;
}

export const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction): void => {
  // Obtiene el token del encabezado Authorization
  const authHeader = req.headers.authorization;
  
  if (authHeader && authHeader.startsWith('Bearer ')) {
    // Se extrae el token
    const token = authHeader.split(' ')[1];
    console.log(token);

    try {
      // Se verifica y decodifica el token usando la clave secreta (definida en el archivo .env)
      const secret = process.env.JWT_SECRET as string;
      const decoded = jwt.verify(token, secret) as JwtPayload;
      // Se asigna el payload decodificado al objeto "req.user"
      req.user = decoded;
      next();
    } catch (error) {
      res.status(403).json({ message: 'Token inválido o expirado' });
    }
  } else {
    res.status(401).json({ message: 'No se proporcionó token' });
  }
};