import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Pacientes } from "./Pacientes";
import { Doctores } from "./Doctores";
import { CatalogoDiagnosticos } from "./CatalogoDiagnosticos";

@Index("PK__Historia__975206EFC808E2BA", ["historialId"], { unique: true })
@Entity("HistorialMedico", { schema: "dbo" })
export class HistorialMedico {
  @PrimaryGeneratedColumn({ type: "int", name: "HistorialID" })
  historialId!: number;

  @Column("nvarchar", { name: "Notas", nullable: true })
  notas!: string | null;

  @Column("datetime", {
    name: "FechaConsulta",
    nullable: true,
    default: () => "getdate()",
  })
  fechaConsulta!: Date | null;

  @Column("bit", { name: "Activo", default: () => "(1)" })
  activo!: boolean;

  @Column("datetime", { name: "FechaEliminacion", nullable: true })
  fechaEliminacion!: Date | null;

  @ManyToOne(() => Pacientes, (pacientes) => pacientes.historialMedicos)
  @JoinColumn([{ name: "PacienteID", referencedColumnName: "pacienteId" }])
  paciente!: Pacientes;

  @ManyToOne(() => Doctores, (doctores) => doctores.historialMedicos)
  @JoinColumn([{ name: "DoctorID", referencedColumnName: "doctorId" }])
  doctor!: Doctores;

  @ManyToOne(
    () => CatalogoDiagnosticos,
    (catalogoDiagnosticos) => catalogoDiagnosticos.historialMedicos
  )
  @JoinColumn([
    { name: "DiagnosticoID", referencedColumnName: "diagnosticoId" },
  ])
  diagnostico!: CatalogoDiagnosticos;
}
