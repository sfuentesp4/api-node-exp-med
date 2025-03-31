// src/middlewares/role.middleware.ts
import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth.middleware';

export const authorizeRoles = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    // Se verifica que el usuario esté autenticado
    if (!req.user) {
      res.status(401).json({ message: 'Usuario no autenticado' });
    }
    // Se valida que el rol del usuario esté entre los permitidos
    if (req.user && !roles.includes(req.user.rol)) {
      res.status(403).json({ message: 'Acceso denegado: rol no autorizado' });
    }
    // Si cumple la condición, continúa con el siguiente middleware o controlador
    next();
  };
};