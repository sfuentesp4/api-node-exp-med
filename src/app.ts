// src/app.ts
import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';

import cors from "cors";

import usuarioRoutes from './routes/usuario.routes';
import authRoutes from './routes/auth.routes';
import catalogoEstadosCitaRoutes from './routes/catalogoEstadosCita.routes';
import catalogoEstadosOrdenLaboratorio from './routes/catalogoEstadosOrdenLaboratorio.routes';
import catalogoDiagnosticos from './routes/catalogoDiagnosticos.routes';
import catalogoGeneros from './routes/catalogoGeneros.routes'
import catalogoEstadosFactura  from './routes/catalogoEstadosFactura.routes';
import catalogoMedicamentos from './routes/catalogoMedicamentos.routes';

dotenv.config();

const app = express();

// Configuración básica de CORS (permitir cualquier origen)
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/catalogo-estados-cita', catalogoEstadosCitaRoutes);
app.use('/api/catalogo-estados-orden-laboratorio', catalogoEstadosOrdenLaboratorio);
app.use('/api/catalogo-diagnosticos', catalogoDiagnosticos);
app.use('/api/catalogo-generos', catalogoGeneros);
app.use('/api/catalogo-estados-factura', catalogoEstadosFactura);
app.use('/api/catalogo-medicamentos', catalogoMedicamentos);

export default app;