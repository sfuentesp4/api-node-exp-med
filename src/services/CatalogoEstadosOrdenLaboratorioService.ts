import { AppDataSource } from "../config/AppDataSource";
import { CatalogoEstadosOrdenLaboratorio } from "../entities/CatalogoEstadosOrdenLaboratorio";

export class CatalogoEstadosOrdenLaboratorioService {
  // Obtener todos los estados
  static async obtenerTodos(): Promise<CatalogoEstadosOrdenLaboratorio[]> {
    const estadosRepo = AppDataSource.getRepository(CatalogoEstadosOrdenLaboratorio);
    return await estadosRepo.find();
  }

  // Crear un nuevo estado
  static async crearEstado(data: Partial<CatalogoEstadosOrdenLaboratorio>): Promise<CatalogoEstadosOrdenLaboratorio> {
    const estadosRepo = AppDataSource.getRepository(CatalogoEstadosOrdenLaboratorio);
    const nuevoEstado = estadosRepo.create(data);
    return await estadosRepo.save(nuevoEstado);
  }

  // Obtener un estado por ID
  static async obtenerPorId(id: number): Promise<CatalogoEstadosOrdenLaboratorio | undefined> {
    const estadosRepo = AppDataSource.getRepository(CatalogoEstadosOrdenLaboratorio);
    const estado = await estadosRepo.findOne({ where: { estadoId: id } });
    return estado ?? undefined;
  }

  // Actualizar un estado existente
  static async actualizarEstado(id: number, data: Partial<CatalogoEstadosOrdenLaboratorio>): Promise<CatalogoEstadosOrdenLaboratorio | undefined> {
    const estadosRepo = AppDataSource.getRepository(CatalogoEstadosOrdenLaboratorio);
    let estado = await estadosRepo.findOne({ where: { estadoId: id } });
    if (!estado) return undefined;

    estadosRepo.merge(estado, data);
    return await estadosRepo.save(estado);
  }

  // Eliminar un estado (borrado lógico)
  static async eliminarEstado(id: number): Promise<boolean> {
    const estadosRepo = AppDataSource.getRepository(CatalogoEstadosOrdenLaboratorio);
    const estado = await estadosRepo.findOne({ where: { estadoId: id } });
    if (!estado) return false;

    estado.activo = false;
    estado.fechaEliminacion = new Date();
    await estadosRepo.save(estado);
    return true;
  }
}