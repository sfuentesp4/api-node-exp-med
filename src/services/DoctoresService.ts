import { Doctores } from "../entities/Doctores";
import { AppDataSource } from '../config/AppDataSource';

export class DoctoresService {
  // Obtiene todos los doctores
  static async obtenerTodos(): Promise<Doctores[]> {
    const doctorRepo = AppDataSource.getRepository(Doctores);
    return await doctorRepo.find({ 
      relations: ["especialidad", "usuario"],
      where: { activo: true } 
    });
  }

  // Obtiene un doctor específico por ID
  static async obtenerPorId(id: number): Promise<Doctores | undefined> {
    const doctorRepo = AppDataSource.getRepository(Doctores);
    const doctor = await doctorRepo.findOne({ 
      where: { doctorId: id, activo: true }, 
      relations: ["especialidad", "usuario"] 
    });
    return doctor || undefined;
  }

  // Crea un nuevo doctor
  static async crear(data: Partial<Doctores>): Promise<Doctores> {
    const doctorRepo = AppDataSource.getRepository(Doctores);
  
    // Validación: Verificar si el número de colegiatura ya está registrado
    const doctorExistente = await doctorRepo.findOne({
      where: { numeroColegiatura: data.numeroColegiatura },
    });
  
    if (doctorExistente) {
      throw new Error("El número de colegiatura ya está registrado. Por favor, verifica la información.");
    }
  
    const nuevoDoctor = doctorRepo.create(data);
    return await doctorRepo.save(nuevoDoctor);
  }

  // Actualiza un doctor
  static async actualizar(id: number, data: Partial<Doctores>): Promise<Doctores | undefined> {
    const doctorRepo = AppDataSource.getRepository(Doctores);
    let doctor = await doctorRepo.findOne({ where: { doctorId: id, activo: true } });
    if (!doctor) return undefined;
    
    // Si se está actualizando el número de colegiatura, verificar que no exista otro doctor con ese número
    if (data.numeroColegiatura && data.numeroColegiatura !== doctor.numeroColegiatura) {
      const doctorExistente = await doctorRepo.findOne({
        where: { numeroColegiatura: data.numeroColegiatura },
      });
      
      if (doctorExistente) {
        throw new Error("El número de colegiatura ya está registrado. Por favor, verifica la información.");
      }
    }
    
    doctorRepo.merge(doctor, data);
    return await doctorRepo.save(doctor);
  }

  // Elimina un doctor de forma lógica (actualizando el estado y fecha de eliminación)
  static async eliminar(id: number): Promise<boolean> {
    const doctorRepo = AppDataSource.getRepository(Doctores);
    const doctor = await doctorRepo.findOne({ where: { doctorId: id, activo: true } });
    if (!doctor) return false;

    doctor.activo = false;
    doctor.fechaEliminacion = new Date();
    await doctorRepo.save(doctor);
    return true;
  }
}

