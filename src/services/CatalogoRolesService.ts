import { AppDataSource } from "../config/AppDataSource";
import { CatalogoRoles } from "../entities/CatalogoRoles";

export class CatalogoRolesService {
  // Obtener todos los estados
  static async obtenerTodos(): Promise<CatalogoRoles[]> {
    const estadosRepo = AppDataSource.getRepository(CatalogoRoles);
    return await estadosRepo.find();
  }

  // Crear un nuevo estado
  static async crearEstado(data: Partial<CatalogoRoles>): Promise<CatalogoRoles> {
    const estadosRepo = AppDataSource.getRepository(CatalogoRoles);
    const nuevoEstado = estadosRepo.create(data);
    return await estadosRepo.save(nuevoEstado);
  }

  // Obtener un estado por ID
  static async obtenerPorId(id: number): Promise<CatalogoRoles | undefined> {
    const estadosRepo = AppDataSource.getRepository(CatalogoRoles);
    const estado = await estadosRepo.findOne({ where: { rolId: id } });
    return estado ?? undefined;
  }

  // Actualizar un estado existente
  static async actualizarEstado(id: number, data: Partial<CatalogoRoles>): Promise<CatalogoRoles | undefined> {
    const estadosRepo = AppDataSource.getRepository(CatalogoRoles);
    let estado = await estadosRepo.findOne({ where: { rolId: id } });
    if (!estado) return undefined;

    estadosRepo.merge(estado, data);
    return await estadosRepo.save(estado);
  }

  // Eliminar un estado (borrado lógico)
  static async eliminarEstado(id: number): Promise<boolean> {
    const estadosRepo = AppDataSource.getRepository(CatalogoRoles);
    const estado = await estadosRepo.findOne({ where: { rolId: id } });
    if (!estado) return false;

    estado.activo = false;
    estado.fechaEliminacion = new Date();
    await estadosRepo.save(estado);
    return true;
  }
}