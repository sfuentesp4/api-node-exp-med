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
import { Facturas } from "./Facturas";
import { HistorialMedico } from "./HistorialMedico";
import { OrdenesLaboratorio } from "./OrdenesLaboratorio";
import { Usuarios } from "./Usuarios";
import { CatalogoGeneros } from "./CatalogoGeneros";
import { Recetas } from "./Recetas";
import { SignosVitales } from "./SignosVitales";

@Index("PK__Paciente__9353C07FA8420C38", ["pacienteId"], { unique: true })
@Entity("Pacientes", { schema: "dbo" })
export class Pacientes {
  @PrimaryGeneratedColumn({ type: "int", name: "PacienteID" })
  pacienteId!: number;

  @Column("nvarchar", { name: "PrimerNombre", length: 50 })
  primerNombre!: string;

  @Column("nvarchar", { name: "PrimerApellido", length: 50 })
  primerApellido!: string;

  @Column("date", { name: "FechaNacimiento" })
  fechaNacimiento!: Date;

  @Column("nvarchar", { name: "Telefono", nullable: true, length: 15 })
  telefono!: string | null;

  @Column("nvarchar", {
    name: "ContactoEmergencia",
    nullable: true,
    length: 100,
  })
  contactoEmergencia!: string | null;

  @Column("nvarchar", { name: "TipoSangre", nullable: true, length: 3 })
  tipoSangre!: string | null;

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

  @OneToMany(() => Citas, (citas) => citas.paciente)
  citas!: Citas[];

  @OneToMany(() => Facturas, (facturas) => facturas.paciente)
  facturas!: Facturas[];

  @OneToMany(
    () => HistorialMedico,
    (historialMedico) => historialMedico.paciente
  )
  historialMedicos!: HistorialMedico[];

  @OneToMany(
    () => OrdenesLaboratorio,
    (ordenesLaboratorio) => ordenesLaboratorio.paciente
  )
  ordenesLaboratorios!: OrdenesLaboratorio[];

  @ManyToOne(() => Usuarios, (usuarios) => usuarios.pacientes)
  @JoinColumn([{ name: "UsuarioID", referencedColumnName: "usuarioId" }])
  usuario!: Usuarios;

  @ManyToOne(
    () => CatalogoGeneros,
    (catalogoGeneros) => catalogoGeneros.pacientes
  )
  @JoinColumn([{ name: "GeneroID", referencedColumnName: "generoId" }])
  genero!: CatalogoGeneros;

  @OneToMany(() => Recetas, (recetas) => recetas.paciente)
  recetas!: Recetas[];

  @OneToMany(() => SignosVitales, (signosVitales) => signosVitales.paciente)
  signosVitales!: SignosVitales[];
}
