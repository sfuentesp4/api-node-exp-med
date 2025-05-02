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
import catalogoRoles from './routes/catalogoRoles.routes';
import catalogoPruebasLaboratorio from './routes/catalogoPruebasLaboratorio.routes';
import menus from './routes/menu.routes';
import rolesMenus from './routes/rolesMenus.routes';
import citas from './routes/citas.routes';
import doctoresRoutes from './routes/doctores.routes';
import pacientes from './routes/pacientes.routes';

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
app.use('/api/catalogo-roles', catalogoRoles);
app.use('/api/catalogo-pruebas-laboratorio', catalogoPruebasLaboratorio);
app.use('/api/menu', menus);
app.use('/api/roles-menus', rolesMenus);
app.use('/api/citas', citas);
app.use('/api/doctores', doctoresRoutes);
app.use('/api/pacientes', pacientes);
export default app;