import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { OrdenesLaboratorio } from "./OrdenesLaboratorio";

@Index("PK__Catalogo__FEF86B602E0308B3", ["estadoId"], { unique: true })
@Index("UQ__Catalogo__92C53B6C6BCA9CC7", ["descripcion"], { unique: true })
@Entity("CatalogoEstadosOrdenLaboratorio", { schema: "dbo" })
export class CatalogoEstadosOrdenLaboratorio {
  @PrimaryGeneratedColumn({ type: "int", name: "EstadoID" })
  estadoId!: number;

  @Column("nvarchar", { name: "Descripcion", unique: true, length: 20 })
  descripcion!: string;

  @Column("bit", { name: "Activo", default: () => "(1)" })
  activo!: boolean;

  @Column("datetime", { name: "FechaEliminacion", nullable: true })
  fechaEliminacion!: Date | null;

  @OneToMany(
    () => OrdenesLaboratorio,
    (ordenesLaboratorio) => ordenesLaboratorio.estado
  )
  ordenesLaboratorios!: OrdenesLaboratorio[];
}
