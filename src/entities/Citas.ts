import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CatalogoEstadosCita } from "./CatalogoEstadosCita";
import { Pacientes } from "./Pacientes";
import { Doctores } from "./Doctores";
import { SignosVitales } from "./SignosVitales";

@Index("PK__Citas__F0E2D9F25259BA79", ["citaId"], { unique: true })
@Entity("Citas", { schema: "dbo" })
export class Citas {
  @PrimaryGeneratedColumn({ type: "int", name: "CitaID" })
  citaId!: number;

  @Column("datetime", { name: "FechaHoraCita" })
  fechaHoraCita!: Date;

  @Column("int", { name: "EstadoID" })
  estadoId!: number;

  @Column("nvarchar", { name: "TipoServicio", length: 50 })
  tipoServicio!: string;

  @Column("datetime", {
    name: "CreadoEn",
    nullable: true,
    default: () => "getdate()",
  })
  creadoEn!: Date | null;

  @Column("bit", { name: "Activo", default: () => "(1)" })
  activo!: boolean;

  @Column("datetime", { name: "FechaEliminacion", nullable: true })
  fechaEliminacion!: Date | null;

  @ManyToOne(() => CatalogoEstadosCita, (catalogoEstadosCita) => catalogoEstadosCita.citas)
  @JoinColumn([{ name: "EstadoID", referencedColumnName: "estadoId" }])
  estado!: CatalogoEstadosCita;

  @ManyToOne(() => Pacientes, (pacientes) => pacientes.citas)
  @JoinColumn([{ name: "PacienteID", referencedColumnName: "pacienteId" }])
  paciente!: Pacientes;

  @ManyToOne(() => Doctores, (doctores) => doctores.citas)
  @JoinColumn([{ name: "DoctorID", referencedColumnName: "doctorId" }])
  doctor!: Doctores;

  @OneToMany(() => SignosVitales, (signosVitales) => signosVitales.cita)
  signosVitales!: SignosVitales[];
}
