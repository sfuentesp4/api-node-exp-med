import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Usuarios } from "./Usuarios";
import { OrdenesLaboratorio } from "./OrdenesLaboratorio";

@Index("PK__Resultad__7904DD417E3D652F", ["resultadoId"], { unique: true })
@Entity("ResultadosLaboratorio", { schema: "dbo" })
export class ResultadosLaboratorio {
  @PrimaryGeneratedColumn({ type: "int", name: "ResultadoID" })
  resultadoId!: number;

  @Column("nvarchar", { name: "ResultadoTexto", nullable: true })
  resultadoTexto!: string | null;

  @Column("varbinary", { name: "ArchivoResultado", nullable: true })
  archivoResultado!: Buffer | null;

  @Column("datetime", {
    name: "FechaSubida",
    nullable: true,
    default: () => "getdate()",
  })
  fechaSubida!: Date | null;

  @Column("bit", { name: "Activo", default: () => "(1)" })
  activo!: boolean;

  @Column("datetime", { name: "FechaEliminacion", nullable: true })
  fechaEliminacion!: Date | null;

  @ManyToOne(() => Usuarios, (usuarios) => usuarios.resultadosLaboratorios)
  @JoinColumn([{ name: "SubidoPor", referencedColumnName: "usuarioId" }])
  subidoPor!: Usuarios;

  @ManyToOne(
    () => OrdenesLaboratorio,
    (ordenesLaboratorio) => ordenesLaboratorio.resultadosLaboratorios
  )
  @JoinColumn([{ name: "OrdenID", referencedColumnName: "ordenId" }])
  orden!: OrdenesLaboratorio;
}
