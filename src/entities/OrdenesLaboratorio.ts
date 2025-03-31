import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Doctores } from "./Doctores";
import { CatalogoPruebasLaboratorio } from "./CatalogoPruebasLaboratorio";
import { Pacientes } from "./Pacientes";
import { CatalogoEstadosOrdenLaboratorio } from "./CatalogoEstadosOrdenLaboratorio";
import { ResultadosLaboratorio } from "./ResultadosLaboratorio";

@Index("PK__OrdenesL__C088A4E45091B0F7", ["ordenId"], { unique: true })
@Entity("OrdenesLaboratorio", { schema: "dbo" })
export class OrdenesLaboratorio {
  @PrimaryGeneratedColumn({ type: "int", name: "OrdenID" })
  ordenId!: number;

  @Column("datetime", {
    name: "FechaOrden",
    nullable: true,
    default: () => "getdate()",
  })
  fechaOrden!: Date | null;

  @Column("bit", { name: "Activo", default: () => "(1)" })
  activo!: boolean;

  @Column("datetime", { name: "FechaEliminacion", nullable: true })
  fechaEliminacion!: Date | null;

  @ManyToOne(() => Doctores, (doctores) => doctores.ordenesLaboratorios)
  @JoinColumn([{ name: "DoctorID", referencedColumnName: "doctorId" }])
  doctor!: Doctores;

  @ManyToOne(
    () => CatalogoPruebasLaboratorio,
    (catalogoPruebasLaboratorio) =>
      catalogoPruebasLaboratorio.ordenesLaboratorios
  )
  @JoinColumn([{ name: "PruebaID", referencedColumnName: "pruebaId" }])
  prueba!: CatalogoPruebasLaboratorio;

  @ManyToOne(() => Pacientes, (pacientes) => pacientes.ordenesLaboratorios)
  @JoinColumn([{ name: "PacienteID", referencedColumnName: "pacienteId" }])
  paciente!: Pacientes;

  @ManyToOne(
    () => CatalogoEstadosOrdenLaboratorio,
    (catalogoEstadosOrdenLaboratorio) =>
      catalogoEstadosOrdenLaboratorio.ordenesLaboratorios
  )
  @JoinColumn([{ name: "EstadoID", referencedColumnName: "estadoId" }])
  estado!: CatalogoEstadosOrdenLaboratorio;

  @OneToMany(
    () => ResultadosLaboratorio,
    (resultadosLaboratorio) => resultadosLaboratorio.orden
  )
  resultadosLaboratorios!: ResultadosLaboratorio[];
}
