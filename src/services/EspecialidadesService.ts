import { Especialidades } from "../entities/Especialidades";
import { AppDataSource } from '../config/AppDataSource';

export class EspecialidadesService {
  // Obtiene todas las especialidades
  static async obtenerTodas(): Promise<Especialidades[]> {
    const especialidadRepo = AppDataSource.getRepository(Especialidades);
    return await especialidadRepo.find({ where: { activo: true } });
  }

  // Obtiene una especialidad específica por ID
  static async obtenerPorId(id: number): Promise<Especialidades | undefined> {
    const especialidadRepo = AppDataSource.getRepository(Especialidades);
    const especialidad = await especialidadRepo.findOne({ where: { especialidadId: id, activo: true } });
    return especialidad || undefined;
  }

  static async crear(data: Partial<Especialidades>): Promise<Especialidades> {
    const especialidadRepo = AppDataSource.getRepository(Especialidades);
    const nuevaEspecialidad = especialidadRepo.create(data);
    return await especialidadRepo.save(nuevaEspecialidad);
  }

  static async actualizar(id: number, data: Partial<Especialidades>): Promise<Especialidades | undefined> {
    const especialidadRepo = AppDataSource.getRepository(Especialidades);
    let especialidad = await especialidadRepo.findOne({ where: { especialidadId: id, activo: true } });
    if (!especialidad) return undefined;

    especialidadRepo.merge(especialidad, data);
    return await especialidadRepo.save(especialidad);
  }
  
    static async eliminar(id: number): Promise<void> {
        const especialidadRepo = AppDataSource.getRepository(Especialidades);
        let especialidad = await especialidadRepo.findOne({ where: { especialidadId: id, activo: true } });
        if (!especialidad) throw new Error("Especialidad no encontrada");

        especialidad.activo = false;
        await especialidadRepo.save(especialidad);
    }
}
