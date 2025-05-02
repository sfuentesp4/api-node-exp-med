import { AppDataSource } from "../config/AppDataSource";
import { Citas } from "../entities/Citas";


export class CitasService {

    static async obtenerTodos(): Promise<Citas[]> {
        const citasRepo = AppDataSource.getRepository(Citas);
        return await citasRepo.find({ relations: ["paciente", "doctor"] });
    }

    static async crearCita(data: Partial<Citas>): Promise<Citas> {
        const citasRepo = AppDataSource.getRepository(Citas);
        const nuevoCita = citasRepo.create(data);
        return await citasRepo.save(nuevoCita);
    }

    static async obtenerPorId(id: number): Promise<Citas | undefined> {
        const citasRepo = AppDataSource.getRepository(Citas);
        const cita = await citasRepo.findOne({ where: { citaId: id }, relations: ["paciente", "doctor","estados"] });
        return cita ?? undefined;
    }

    static async actualizarCita(id: number, data: Partial<Citas>): Promise<Citas | undefined> {
        const citasRepo = AppDataSource.getRepository(Citas);
        let cita = await citasRepo.findOne({ where: { citaId: id } });
        if (!cita) return undefined;

        citasRepo.merge(cita, data);
        return await citasRepo.save(cita);
    }

    static async eliminarCita(id: number): Promise<boolean> {
        const citasRepo = AppDataSource.getRepository(Citas);
        const cita = await citasRepo.findOne({ where: { citaId: id } });
        if (!cita) return false;

        cita.activo = false;
        cita.fechaEliminacion = new Date();
        await citasRepo.save(cita);
        return true;
    }
}