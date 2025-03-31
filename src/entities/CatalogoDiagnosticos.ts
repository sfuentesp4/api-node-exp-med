import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { HistorialMedico } from "./HistorialMedico";

@Index("PK__Catalogo__9A0D5D3AD93032E8", ["diagnosticoId"], { unique: true })
@Index("UQ__Catalogo__D3E9319F44272245", ["codigoCie10"], { unique: true })
@Entity("CatalogoDiagnosticos", { schema: "dbo" })
export class CatalogoDiagnosticos {
  @PrimaryGeneratedColumn({ type: "int", name: "DiagnosticoID" })
  diagnosticoId!: number;

  @Column("nvarchar", { name: "CodigoCIE10", unique: true, length: 10 })
  codigoCie10!: string;

  @Column("nvarchar", { name: "Descripcion", length: 500 })
  descripcion!: string;

  @Column("bit", { name: "Activo", default: () => "(1)" })
  activo!: boolean;

  @Column("datetime", { name: "FechaEliminacion", nullable: true })
  fechaEliminacion!: Date | null;

  @OneToMany(
    () => HistorialMedico,
    (historialMedico) => historialMedico.diagnostico
  )
  historialMedicos!: HistorialMedico[];
}
