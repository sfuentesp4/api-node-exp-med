import { AppDataSource } from "../config/AppDataSource";
import { CatalogoPruebasLaboratorio } from "../entities/CatalogoPruebasLaboratorio";

export class CatalogoPruebasLaboratorioService {
  // Obtener todos los estados
  static async obtenerTodos(): Promise<CatalogoPruebasLaboratorio[]> {
    const estadosRepo = AppDataSource.getRepository(CatalogoPruebasLaboratorio);
    return await estadosRepo.find();
  }

  // Crear un nuevo estado
  static async crearEstado(data: Partial<CatalogoPruebasLaboratorio>): Promise<CatalogoPruebasLaboratorio> {
    const estadosRepo = AppDataSource.getRepository(CatalogoPruebasLaboratorio);
    const nuevoEstado = estadosRepo.create(data);
    return await estadosRepo.save(nuevoEstado);
  }

  // Obtener un estado por ID
  static async obtenerPorId(id: number): Promise<CatalogoPruebasLaboratorio | undefined> {
    const estadosRepo = AppDataSource.getRepository(CatalogoPruebasLaboratorio);
    const estado = await estadosRepo.findOne({ where: { pruebaId: id } });
    return estado ?? undefined;
  }

  // Actualizar un estado existente
  static async actualizarEstado(id: number, data: Partial<CatalogoPruebasLaboratorio>): Promise<CatalogoPruebasLaboratorio | undefined> {
    const estadosRepo = AppDataSource.getRepository(CatalogoPruebasLaboratorio);
    let estado = await estadosRepo.findOne({ where: { pruebaId: id } });
    if (!estado) return undefined;

    estadosRepo.merge(estado, data);
    return await estadosRepo.save(estado);
  }

  // Eliminar un estado (borrado lógico)
  static async eliminarEstado(id: number): Promise<boolean> {
    const estadosRepo = AppDataSource.getRepository(CatalogoPruebasLaboratorio);
    const estado = await estadosRepo.findOne({ where: { pruebaId: id } });
    if (!estado) return false;

    estado.activo = false;
    estado.fechaEliminacion = new Date();
    await estadosRepo.save(estado);
    return true;
  }
}