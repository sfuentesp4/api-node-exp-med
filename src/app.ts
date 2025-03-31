// src/app.ts
import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';

import cors from "cors";

import usuarioRoutes from './routes/usuario.routes';
import authRoutes from './routes/auth.routes';
import catalogoEstadosCitaRoutes from './routes/catalogoEstadosCita.routes';
import catalogoEstadosOrdenLaboratorio from './routes/catalogoEstadosOrdenLaboratorio.routes';

dotenv.config();

const app = express();

// Configuración básica de CORS (permitir cualquier origen)
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rutas de la API
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/catalogo-estados-cita', catalogoEstadosCitaRoutes);
app.use('/api/catalogo-estados-orden-laboratorio', catalogoEstadosOrdenLaboratorio);

export default app;