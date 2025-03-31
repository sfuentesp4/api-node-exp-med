import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Citas } from "./Citas";
import { Especialidades } from "./Especialidades";
import { Usuarios } from "./Usuarios";
import { HistorialMedico } from "./HistorialMedico";
import { OrdenesLaboratorio } from "./OrdenesLaboratorio";
import { Recetas } from "./Recetas";

@Index("PK__Doctores__2DC00EDF412E3750", ["doctorId"], { unique: true })
@Index("UQ__Doctores__7EB2F286CC8D5765", ["numeroColegiatura"], {
  unique: true,
})
@Entity("Doctores", { schema: "dbo" })
export class Doctores {
  @PrimaryGeneratedColumn({ type: "int", name: "DoctorID" })
  doctorId!: number;

  @Column("nvarchar", { name: "NumeroColegiatura", unique: true, length: 20 })
  numeroColegiatura!: string;

  @Column("time", { name: "HoraInicio" })
  horaInicio!: Date;

  @Column("time", { name: "HoraFin" })
  horaFin!: Date;

  @Column("bit", { name: "Activo", default: () => "(1)" })
  activo!: boolean;

  @Column("datetime", { name: "FechaEliminacion", nullable: true })
  fechaEliminacion!: Date | null;

  @OneToMany(() => Citas, (citas) => citas.doctor)
  citas!: Citas[];

  @ManyToOne(() => Especialidades, (especialidades) => especialidades.doctores)
  @JoinColumn([
    { name: "EspecialidadID", referencedColumnName: "especialidadId" },
  ])
  especialidad!: Especialidades;

  @ManyToOne(() => Usuarios, (usuarios) => usuarios.doctores)
  @JoinColumn([{ name: "UsuarioID", referencedColumnName: "usuarioId" }])
  usuario!: Usuarios;

  @OneToMany(() => HistorialMedico, (historialMedico) => historialMedico.doctor)
  historialMedicos!: HistorialMedico[];

  @OneToMany(
    () => OrdenesLaboratorio,
    (ordenesLaboratorio) => ordenesLaboratorio.doctor
  )
  ordenesLaboratorios!: OrdenesLaboratorio[];

  @OneToMany(() => Recetas, (recetas) => recetas.doctor)
  recetas!: Recetas[];
}
