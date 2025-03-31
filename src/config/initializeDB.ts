import { AppDataSource } from './AppDataSource';

// Función para inicializar la conexión a la base de datos
export const initializeDB = async () => {
  if (!AppDataSource.isInitialized) {
    try {
      await AppDataSource.initialize();
      console.log('Conexión a la base de datos establecida correctamente');
    } catch (error) {
      console.error('Error al inicializar la conexión a la base de datos:', error);
      throw error;
    }
  }
};