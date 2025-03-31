// src/routes/auth.routes.ts
import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';

const router = Router();

// Define la ruta que recibirá POST para loguearse y generar el token
router.post('/login', AuthController.login);

export default router;