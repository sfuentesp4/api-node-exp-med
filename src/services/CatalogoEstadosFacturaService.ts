import { AppDataSource } from "../config/AppDataSource";
import { CatalogoEstadosFactura } from "../entities/CatalogoEstadosFactura";

export class CatalogoEstadosFacturaService {
  // Obtener todos los estados
  static async obtenerTodos(): Promise<CatalogoEstadosFactura[]> {
    const estadosRepo = AppDataSource.getRepository(CatalogoEstadosFactura);
    return await estadosRepo.find();
  }

  // Crear un nuevo estado
  static async crearEstado(data: Partial<CatalogoEstadosFactura>): Promise<CatalogoEstadosFactura> {
    const estadosRepo = AppDataSource.getRepository(CatalogoEstadosFactura);
    const nuevoEstado = estadosRepo.create(data);
    return await estadosRepo.save(nuevoEstado);
  }

  // Obtener un estado por ID
  static async obtenerPorId(id: number): Promise<CatalogoEstadosFactura | undefined> {
    const estadosRepo = AppDataSource.getRepository(CatalogoEstadosFactura);
    const estado = await estadosRepo.findOne({ where: { estadoId: id } });
    return estado ?? undefined;
  }

  // Actualizar un estado existente
  static async actualizarEstado(id: number, data: Partial<CatalogoEstadosFactura>): Promise<CatalogoEstadosFactura | undefined> {
    const estadosRepo = AppDataSource.getRepository(CatalogoEstadosFactura);
    let estado = await estadosRepo.findOne({ where: { estadoId: id } });
    if (!estado) return undefined;

    estadosRepo.merge(estado, data);
    return await estadosRepo.save(estado);
  }

  // Eliminar un estado (borrado lógico)
  static async eliminarEstado(id: number): Promise<boolean> {
    const estadosRepo = AppDataSource.getRepository(CatalogoEstadosFactura);
    const estado = await estadosRepo.findOne({ where: { estadoId: id } });
    if (!estado) return false;

    estado.activo = false;
    estado.fechaEliminacion = new Date();
    await estadosRepo.save(estado);
    return true;
  }
}