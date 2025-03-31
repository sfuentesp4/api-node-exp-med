// src/server.ts
import app from "./app";
import { initializeDB } from './config/initializeDB';

export const startServer = () => {

  // Inicializa la conexión a la base de datos
  initializeDB().then(() => {
    // Arranca el servidor una vez que la conexión esté lista
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  }).catch((error) => {
    console.error('No se pudo conectar a la base de datos:', error);
  });

};

// Ejecutar automáticamente si este archivo es el módulo principal
if (require.main === module) {
  startServer();
}