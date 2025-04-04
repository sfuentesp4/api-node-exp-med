import { AppDataSource } from "../config/AppDataSource";
import { CatalogoDiagnosticos } from "../entities/CatalogoDiagnosticos";

export class CatalogoDiagnosticosService {
  // Obtener todos los estados
  static async obtenerTodos(): Promise<CatalogoDiagnosticos[]> {
    const estadosRepo = AppDataSource.getRepository(CatalogoDiagnosticos);
    return await estadosRepo.find();
  }

  // Crear un nuevo estado
  static async crearEstado(data: Partial<CatalogoDiagnosticos>): Promise<CatalogoDiagnosticos> {
    const estadosRepo = AppDataSource.getRepository(CatalogoDiagnosticos);
    const nuevoEstado = estadosRepo.create(data);
    return await estadosRepo.save(nuevoEstado);
  }

  // Obtener un estado por ID
  static async obtenerPorId(id: number): Promise<CatalogoDiagnosticos | undefined> {
    const estadosRepo = AppDataSource.getRepository(CatalogoDiagnosticos);
    const estado = await estadosRepo.findOne({ where: { diagnosticoId: id } });
    return estado ?? undefined;
  }

  // Actualizar un estado existente
  static async actualizarEstado(id: number, data: Partial<CatalogoDiagnosticos>): Promise<CatalogoDiagnosticos | undefined> {
    const estadosRepo = AppDataSource.getRepository(CatalogoDiagnosticos);
    let estado = await estadosRepo.findOne({ where: { diagnosticoId: id } });
    if (!estado) return undefined;

    estadosRepo.merge(estado, data);
    return await estadosRepo.save(estado);
  }

  // Eliminar un estado (borrado lógico)
  static async eliminarEstado(id: number): Promise<boolean> {
    const estadosRepo = AppDataSource.getRepository(CatalogoDiagnosticos);
    const estado = await estadosRepo.findOne({ where: { diagnosticoId: id } });
    if (!estado) return false;

    estado.activo = false;
    estado.fechaEliminacion = new Date();
    await estadosRepo.save(estado);
    return true;
  }
}