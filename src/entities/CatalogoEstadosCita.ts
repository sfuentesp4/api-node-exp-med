import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Citas } from "./Citas";

@Index("PK__Catalogo__FEF86B60250942ED", ["estadoId"], { unique: true })
@Index("UQ__Catalogo__92C53B6C76037B1D", ["descripcion"], { unique: true })
@Entity("CatalogoEstadosCita", { schema: "dbo" })
export class CatalogoEstadosCita {
  @PrimaryGeneratedColumn({ type: "int", name: "EstadoID" })
  estadoId!: number;

  @Column("nvarchar", { name: "Descripcion", unique: true, length: 20 })
  descripcion!: string;

  @Column("bit", { name: "Activo", default: () => "(1)" })
  activo!: boolean;

  @Column("datetime", { name: "FechaEliminacion", nullable: true })
  fechaEliminacion!: Date | null;

  @OneToMany(() => Citas, (citas) => citas.estado)
  citas!: Citas[];
}
