import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Usuarios } from "./Usuarios";
import { Pacientes } from "./Pacientes";
import { Citas } from "./Citas";

@Index("PK__SignosVi__12C59B6AD78CDA14", ["signoVitalId"], { unique: true })
@Entity("SignosVitales", { schema: "dbo" })
export class SignosVitales {
  @PrimaryGeneratedColumn({ type: "int", name: "SignoVitalID" })
  signoVitalId!: number;

  @Column("nvarchar", { name: "PresionArterial", nullable: true, length: 10 })
  presionArterial!: string | null;

  @Column("int", { name: "FrecuenciaCardiaca", nullable: true })
  frecuenciaCardiaca!: number | null;

  @Column("decimal", {
    name: "Temperatura",
    nullable: true,
    precision: 4,
    scale: 1,
  })
  temperatura!: number | null;

  @Column("decimal", {
    name: "SaturacionOxigeno",
    nullable: true,
    precision: 4,
    scale: 1,
  })
  saturacionOxigeno!: number | null;

  @Column("decimal", { name: "Peso", nullable: true, precision: 5, scale: 2 })
  peso!: number | null;

  @Column("decimal", { name: "Altura", nullable: true, precision: 5, scale: 2 })
  altura!: number | null;

  @Column("datetime", {
    name: "FechaHoraToma",
    nullable: true,
    default: () => "getdate()",
  })
  fechaHoraToma!: Date | null;

  @Column("bit", { name: "Activo", default: () => "(1)" })
  activo!: boolean;

  @Column("datetime", { name: "FechaEliminacion", nullable: true })
  fechaEliminacion!: Date | null;

  @ManyToOne(() => Usuarios, (usuarios) => usuarios.signosVitales)
  @JoinColumn([{ name: "TomadoPor", referencedColumnName: "usuarioId" }])
  tomadoPor!: Usuarios;

  @ManyToOne(() => Pacientes, (pacientes) => pacientes.signosVitales)
  @JoinColumn([{ name: "PacienteID", referencedColumnName: "pacienteId" }])
  paciente!: Pacientes;

  @ManyToOne(() => Citas, (citas) => citas.signosVitales)
  @JoinColumn([{ name: "CitaID", referencedColumnName: "citaId" }])
  cita!: Citas;
}
