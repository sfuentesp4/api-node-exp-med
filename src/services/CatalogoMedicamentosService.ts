import { AppDataSource } from "../config/AppDataSource";
import { CatalogoMedicamentos } from "../entities/CatalogoMedicamentos";

export class CatalogoMedicamentosService {
  // Obtener todos los estados
  static async obtenerTodos(): Promise<CatalogoMedicamentos[]> {
    const estadosRepo = AppDataSource.getRepository(CatalogoMedicamentos);
    return await estadosRepo.find();
  }

  // Crear un nuevo estado
  static async crearEstado(data: Partial<CatalogoMedicamentos>): Promise<CatalogoMedicamentos> {
    const estadosRepo = AppDataSource.getRepository(CatalogoMedicamentos);
    const nuevoEstado = estadosRepo.create(data);
    return await estadosRepo.save(nuevoEstado);
  }

  // Obtener un estado por ID
  static async obtenerPorId(id: number): Promise<CatalogoMedicamentos | undefined> {
    const estadosRepo = AppDataSource.getRepository(CatalogoMedicamentos);
    const estado = await estadosRepo.findOne({ where: { medicamentoId: id } });
    return estado ?? undefined;
  }

  // Actualizar un estado existente
  static async actualizarEstado(id: number, data: Partial<CatalogoMedicamentos>): Promise<CatalogoMedicamentos | undefined> {
    const estadosRepo = AppDataSource.getRepository(CatalogoMedicamentos);
    let estado = await estadosRepo.findOne({ where: { medicamentoId: id } });
    if (!estado) return undefined;

    estadosRepo.merge(estado, data);
    return await estadosRepo.save(estado);
  }

  // Eliminar un estado (borrado lógico)
  static async eliminarEstado(id: number): Promise<boolean> {
    const estadosRepo = AppDataSource.getRepository(CatalogoMedicamentos);
    const estado = await estadosRepo.findOne({ where: { medicamentoId: id } });
    if (!estado) return false;

    estado.activo = false;
    estado.fechaEliminacion = new Date();
    await estadosRepo.save(estado);
    return true;
  }
}