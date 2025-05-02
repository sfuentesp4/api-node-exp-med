import { Pacientes } from "../entities/Pacientes";
import { AppDataSource } from '../config/AppDataSource';

export class PacientesService {
  // Obtiene todos los pacientes
  static async obtenerTodos(): Promise<Pacientes[]> {
    const pacienteRepo = AppDataSource.getRepository(Pacientes);
    return await pacienteRepo.find({ 
      relations: ["usuario", "genero"],
      where: { activo: true } 
    });
  }

  // Obtiene un paciente específico por ID
  static async obtenerPorId(id: number): Promise<Pacientes | undefined> {
    const pacienteRepo = AppDataSource.getRepository(Pacientes);
    const paciente = await pacienteRepo.findOne({ 
      where: { pacienteId: id, activo: true }, 
      relations: ["usuario", "genero"] 
    });
    return paciente || undefined;
  }

  // Crea un nuevo paciente
  static async crear(data: Partial<Pacientes>): Promise<Pacientes> {
    const pacienteRepo = AppDataSource.getRepository(Pacientes);
  
    // Validación básica
    if (!data.primerNombre || !data.primerApellido || !data.fechaNacimiento) {
      throw new Error("Los campos primer nombre, primer apellido y fecha de nacimiento son obligatorios.");
    }
  
    const nuevoPaciente = pacienteRepo.create(data);
    return await pacienteRepo.save(nuevoPaciente);
  }

  // Actualiza un paciente
  static async actualizar(id: number, data: Partial<Pacientes>): Promise<Pacientes | undefined> {
    const pacienteRepo = AppDataSource.getRepository(Pacientes);
    let paciente = await pacienteRepo.findOne({ where: { pacienteId: id, activo: true } });
    if (!paciente) return undefined;
    
    // Validación básica si se están actualizando campos obligatorios
    if (data.primerNombre === "" || data.primerApellido === "") {
      throw new Error("Los campos primer nombre y primer apellido no pueden estar vacíos.");
    }
    
    pacienteRepo.merge(paciente, data);
    return await pacienteRepo.save(paciente);
  }

  // Elimina un paciente de forma lógica (actualizando el estado y fecha de eliminación)
  static async eliminar(id: number): Promise<boolean> {
    const pacienteRepo = AppDataSource.getRepository(Pacientes);
    const paciente = await pacienteRepo.findOne({ where: { pacienteId: id, activo: true } });
    if (!paciente) return false;

    paciente.activo = false;
    paciente.fechaEliminacion = new Date();
    await pacienteRepo.save(paciente);
    return true;
  }

  // Obtiene pacientes por nombre o apellido (búsqueda parcial)
  static async buscarPorNombreApellido(termino: string): Promise<Pacientes[]> {
    const pacienteRepo = AppDataSource.getRepository(Pacientes);
    return await pacienteRepo.createQueryBuilder("paciente")
      .where("paciente.activo = :activo", { activo: true })
      .andWhere("(paciente.primerNombre LIKE :termino OR paciente.primerApellido LIKE :termino)", 
        { termino: `%${termino}%` })
      .leftJoinAndSelect("paciente.genero", "genero")
      .leftJoinAndSelect("paciente.usuario", "usuario")
      .getMany();
  }
}

