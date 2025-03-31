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
import { Pacientes } from "./Pacientes";
import { ResultadosLaboratorio } from "./ResultadosLaboratorio";
import { SignosVitales } from "./SignosVitales";
import { CatalogoRoles } from "./CatalogoRoles";

@Index("PK__Usuarios__2B3DE79870E06B3E", ["usuarioId"], { unique: true })
@Index("UQ__Usuarios__6B0F5AE042897040", ["nombreUsuario"], { unique: true })
@Entity("Usuarios", { schema: "dbo" })
export class Usuarios {
  @PrimaryGeneratedColumn({ type: "int", name: "UsuarioID" })
  usuarioId!: number;

  @Column("nvarchar", { name: "NombreUsuario", unique: true, length: 50 })
  nombreUsuario!: string;

  @Column("varbinary", { name: "Contrasena", length: 256 })
  contrasena!: Buffer;

  @Column("bit", { name: "Activo", default: () => "(1)" })
  activo!: boolean;

  @Column("datetime", { name: "FechaEliminacion", nullable: true })
  fechaEliminacion!: Date | null;

  @OneToMany(() => Doctores, (doctores) => doctores.usuario)
  doctores!: Doctores[];

  @OneToMany(() => Pacientes, (pacientes) => pacientes.usuario)
  pacientes!: Pacientes[];

  @OneToMany(
    () => ResultadosLaboratorio,
    (resultadosLaboratorio) => resultadosLaboratorio.subidoPor
  )
  resultadosLaboratorios!: ResultadosLaboratorio[];

  @OneToMany(() => SignosVitales, (signosVitales) => signosVitales.tomadoPor)
  signosVitales!: SignosVitales[];

  @ManyToOne(() => CatalogoRoles, (catalogoRoles) => catalogoRoles.usuarios)
  @JoinColumn([{ name: "RolID", referencedColumnName: "rolId" }])
  rol!: CatalogoRoles;
}
