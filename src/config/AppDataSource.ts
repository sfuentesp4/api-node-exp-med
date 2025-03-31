import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

// Carga las variables de entorno desde el archivo .env
dotenv.config();

// Configuración del DataSource (la conexión)
export const AppDataSource = new DataSource({
  type: 'mssql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: true,
  entities: ['src/entities/*.ts'], // Ajusta la ruta de las entidades
  options: {
    encrypt: false, // Requerido para conexiones seguras (Azure)
  },
});