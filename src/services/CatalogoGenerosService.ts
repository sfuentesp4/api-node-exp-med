import { AppDataSource } from "../config/AppDataSource";
import { CatalogoGeneros } from "../entities/CatalogoGeneros";

export class CatalogoGenerosService {
  // Obtener todos los estados
  static async obtenerTodos(): Promise<CatalogoGeneros[]> {
    const estadosRepo = AppDataSource.getRepository(CatalogoGeneros);
    return await estadosRepo.find();
  }

  // Crear un nuevo estado
  static async crearEstado(data: Partial<CatalogoGeneros>): Promise<CatalogoGeneros> {
    const estadosRepo = AppDataSource.getRepository(CatalogoGeneros);
    const nuevoEstado = estadosRepo.create(data);
    return await estadosRepo.save(nuevoEstado);
  }

  // Obtener un estado por ID
  static async obtenerPorId(id: string): Promise<CatalogoGeneros | undefined> {
    const estadosRepo = AppDataSource.getRepository(CatalogoGeneros);
    const estado = await estadosRepo.findOne({ where: { generoId: id } });
    return estado ?? undefined;
  }

  // Actualizar un estado existente
  static async actualizarEstado(id: string, data: Partial<CatalogoGeneros>): Promise<CatalogoGeneros | undefined> {
    const estadosRepo = AppDataSource.getRepository(CatalogoGeneros);
    let estado = await estadosRepo.findOne({ where: { generoId: id } });
    if (!estado) return undefined;

    estadosRepo.merge(estado, data);
    return await estadosRepo.save(estado);
  }

  // Eliminar un estado (borrado lógico)
  static async eliminarEstado(id: string): Promise<boolean> {
    const estadosRepo = AppDataSource.getRepository(CatalogoGeneros);
    const estado = await estadosRepo.findOne({ where: { generoId: id } });
    if (!estado) return false;

    estado.activo = false;
    estado.fechaEliminacion = new Date();
    await estadosRepo.save(estado);
    return true;
  }
}