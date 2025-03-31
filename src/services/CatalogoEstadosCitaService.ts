import { AppDataSource } from "../config/AppDataSource";
import { CatalogoEstadosCita } from "../entities/CatalogoEstadosCita";

export class CatalogoEstadosCitaService {
  // Obtener todos los estados
  static async obtenerTodos(): Promise<CatalogoEstadosCita[]> {
    const estadosRepo = AppDataSource.getRepository(CatalogoEstadosCita);
    return await estadosRepo.find();
  }

  // Crear un nuevo estado
  static async crearEstado(data: Partial<CatalogoEstadosCita>): Promise<CatalogoEstadosCita> {
    const estadosRepo = AppDataSource.getRepository(CatalogoEstadosCita);
    const nuevoEstado = estadosRepo.create(data);
    return await estadosRepo.save(nuevoEstado);
  }

  // Obtener un estado por ID
  static async obtenerPorId(id: number): Promise<CatalogoEstadosCita | undefined> {
    const estadosRepo = AppDataSource.getRepository(CatalogoEstadosCita);
    const estado = await estadosRepo.findOne({ where: { estadoId: id } });
    return estado ?? undefined;
  }

  // Actualizar un estado existente
  static async actualizarEstado(id: number, data: Partial<CatalogoEstadosCita>): Promise<CatalogoEstadosCita | undefined> {
    const estadosRepo = AppDataSource.getRepository(CatalogoEstadosCita);
    let estado = await estadosRepo.findOne({ where: { estadoId: id } });
    if (!estado) return undefined;

    estadosRepo.merge(estado, data);
    return await estadosRepo.save(estado);
  }

  // Eliminar un estado (borrado lógico)
  static async eliminarEstado(id: number): Promise<boolean> {
    const estadosRepo = AppDataSource.getRepository(CatalogoEstadosCita);
    const estado = await estadosRepo.findOne({ where: { estadoId: id } });
    if (!estado) return false;

    estado.activo = false;
    estado.fechaEliminacion = new Date();
    await estadosRepo.save(estado);
    return true;
  }
}