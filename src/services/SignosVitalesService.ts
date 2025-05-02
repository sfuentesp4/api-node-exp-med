import { AppDataSource } from "../config/AppDataSource";
import { SignosVitales } from "../entities/SignosVitales";

export class SignosVitalesService {
  // Obtener todos los signos vitales
  static async obtenerTodos(): Promise<SignosVitales[]> {
    const repo = AppDataSource.getRepository(SignosVitales);
    return await repo.find({
      where: { activo: true },
      relations: ["paciente", "cita", "tomadoPor"]
    });
  }

  // Crear un nuevo signo vital
  static async crear(data: Partial<SignosVitales>): Promise<SignosVitales> {
    const repo = AppDataSource.getRepository(SignosVitales);
    const nuevo = repo.create(data);
    return await repo.save(nuevo);
  }

  // Obtener un signo vital por ID
  static async obtenerPorId(id: number): Promise<SignosVitales | undefined> {
    const repo = AppDataSource.getRepository(SignosVitales);
    const registro = await repo.findOne({
      where: { signoVitalId: id, activo: true },
      relations: ["paciente", "cita", "tomadoPor"]
    });
    return registro ?? undefined;
  }

  // Actualizar un signo vital existente
  static async actualizar(id: number, data: Partial<SignosVitales>): Promise<SignosVitales | undefined> {
    const repo = AppDataSource.getRepository(SignosVitales);
    let registro = await repo.findOne({ where: { signoVitalId: id, activo: true } });
    if (!registro) return undefined;

    repo.merge(registro, data);
    return await repo.save(registro);
  }

  // Eliminar un signo vital (borrado lógico)
  static async eliminar(id: number): Promise<boolean> {
    const repo = AppDataSource.getRepository(SignosVitales);
    const registro = await repo.findOne({ where: { signoVitalId: id, activo: true } });
    if (!registro) return false;

    registro.activo = false;
    registro.fechaEliminacion = new Date();
    await repo.save(registro);
    return true;
  }
}
