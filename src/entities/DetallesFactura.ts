import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Facturas } from "./Facturas";

@Index("PK__Detalles__2318A415AEC2BCD6", ["detalleFacturaId"], { unique: true })
@Entity("DetallesFactura", { schema: "dbo" })
export class DetallesFactura {
  @PrimaryGeneratedColumn({ type: "int", name: "DetalleFacturaID" })
  detalleFacturaId!: number;

  @Column("nvarchar", { name: "Descripcion", length: 200 })
  descripcion!: string;

  @Column("int", { name: "Cantidad" })
  cantidad!: number;

  @Column("decimal", { name: "PrecioUnitario", precision: 10, scale: 2 })
  precioUnitario!: number;

  @Column("bit", { name: "Activo", default: () => "(1)" })
  activo!: boolean;

  @Column("datetime", { name: "FechaEliminacion", nullable: true })
  fechaEliminacion!: Date | null;

  @ManyToOne(() => Facturas, (facturas) => facturas.detallesFacturas)
  @JoinColumn([{ name: "FacturaID", referencedColumnName: "facturaId" }])
  factura!: Facturas;
}
