import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DetallesReceta } from "./DetallesReceta";

@Index("PK__Catalogo__003D65F3ACBD5719", ["medicamentoId"], { unique: true })
@Entity("CatalogoMedicamentos", { schema: "dbo" })
export class CatalogoMedicamentos {
  @PrimaryGeneratedColumn({ type: "int", name: "MedicamentoID" })
  medicamentoId!: number;

  @Column("nvarchar", { name: "NombreGenerico", length: 100 })
  nombreGenerico!: string;

  @Column("nvarchar", { name: "NombreComercial", nullable: true, length: 100 })
  nombreComercial!: string | null;

  @Column("nvarchar", { name: "FormaDosis", length: 50 })
  formaDosis!: string;

  @Column("nvarchar", { name: "Concentracion", nullable: true, length: 50 })
  concentracion!: string | null;

  @Column("bit", { name: "Activo", default: () => "(1)" })
  activo!: boolean;

  @Column("datetime", { name: "FechaEliminacion", nullable: true })
  fechaEliminacion!: Date | null;

  @OneToMany(
    () => DetallesReceta,
    (detallesReceta) => detallesReceta.medicamento
  )
  detallesRecetas!: DetallesReceta[];
}
