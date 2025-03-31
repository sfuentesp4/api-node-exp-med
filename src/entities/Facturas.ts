import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DetallesFactura } from "./DetallesFactura";
import { Pacientes } from "./Pacientes";
import { CatalogoEstadosFactura } from "./CatalogoEstadosFactura";

@Index("PK__Facturas__5C0248054BDD145D", ["facturaId"], { unique: true })
@Entity("Facturas", { schema: "dbo" })
export class Facturas {
  @PrimaryGeneratedColumn({ type: "int", name: "FacturaID" })
  facturaId!: number;

  @Column("datetime", {
    name: "FechaEmision",
    nullable: true,
    default: () => "getdate()",
  })
  fechaEmision!: Date | null;

  @Column("decimal", { name: "MontoTotal", precision: 10, scale: 2 })
  montoTotal!: number;

  @Column("nvarchar", { name: "CAEFel", nullable: true, length: 50 })
  caeFel!: string | null;

  @Column("nvarchar", { name: "DTEfel", nullable: true, length: 50 })
  dtEfel!: string | null;

  @Column("bit", { name: "Activo", default: () => "(1)" })
  activo!: boolean;

  @Column("datetime", { name: "FechaEliminacion", nullable: true })
  fechaEliminacion!: Date | null;

  @OneToMany(
    () => DetallesFactura,
    (detallesFactura) => detallesFactura.factura
  )
  detallesFacturas!: DetallesFactura[];

  @ManyToOne(() => Pacientes, (pacientes) => pacientes.facturas)
  @JoinColumn([{ name: "PacienteID", referencedColumnName: "pacienteId" }])
  paciente!: Pacientes;

  @ManyToOne(
    () => CatalogoEstadosFactura,
    (catalogoEstadosFactura) => catalogoEstadosFactura.facturas
  )
  @JoinColumn([{ name: "EstadoID", referencedColumnName: "estadoId" }])
  estado!: CatalogoEstadosFactura;
}
