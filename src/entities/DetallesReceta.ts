import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Recetas } from "./Recetas";
import { CatalogoMedicamentos } from "./CatalogoMedicamentos";

@Index("PK__Detalles__DE144724739A1EC8", ["detalleRecetaId"], { unique: true })
@Entity("DetallesReceta", { schema: "dbo" })
export class DetallesReceta {
  @PrimaryGeneratedColumn({ type: "int", name: "DetalleRecetaID" })
  detalleRecetaId!: number;

  @Column("nvarchar", { name: "Dosis", length: 50 })
  dosis!: string;

  @Column("nvarchar", { name: "Frecuencia", length: 50 })
  frecuencia!: string;

  @Column("nvarchar", { name: "Duracion", length: 50 })
  duracion!: string;

  @Column("bit", { name: "Activo", default: () => "(1)" })
  activo!: boolean;

  @Column("datetime", { name: "FechaEliminacion", nullable: true })
  fechaEliminacion!: Date | null;

  @ManyToOne(() => Recetas, (recetas) => recetas.detallesRecetas)
  @JoinColumn([{ name: "RecetaID", referencedColumnName: "recetaId" }])
  receta!: Recetas;

  @ManyToOne(
    () => CatalogoMedicamentos,
    (catalogoMedicamentos) => catalogoMedicamentos.detallesRecetas
  )
  @JoinColumn([
    { name: "MedicamentoID", referencedColumnName: "medicamentoId" },
  ])
  medicamento!: CatalogoMedicamentos;
}
