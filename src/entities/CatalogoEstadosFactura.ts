import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Facturas } from "./Facturas";

@Index("PK__Catalogo__FEF86B6037ED4DAD", ["estadoId"], { unique: true })
@Index("UQ__Catalogo__92C53B6C5E6B2575", ["descripcion"], { unique: true })
@Entity("CatalogoEstadosFactura", { schema: "dbo" })
export class CatalogoEstadosFactura {
  @PrimaryGeneratedColumn({ type: "int", name: "EstadoID" })
  estadoId!: number;

  @Column("nvarchar", { name: "Descripcion", unique: true, length: 20 })
  descripcion!: string;

  @Column("bit", { name: "Activo", default: () => "(1)" })
  activo!: boolean;

  @Column("datetime", { name: "FechaEliminacion", nullable: true })
  fechaEliminacion!: Date | null;

  @OneToMany(() => Facturas, (facturas) => facturas.estado)
  facturas!: Facturas[];
}
