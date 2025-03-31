import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { OrdenesLaboratorio } from "./OrdenesLaboratorio";

@Index("PK__Catalogo__E93DDB3CEABC1D35", ["pruebaId"], { unique: true })
@Index("UQ__Catalogo__BB7DAA975270B6CC", ["codigoPrueba"], { unique: true })
@Entity("CatalogoPruebasLaboratorio", { schema: "dbo" })
export class CatalogoPruebasLaboratorio {
  @PrimaryGeneratedColumn({ type: "int", name: "PruebaID" })
  pruebaId: number | undefined;

  @Column("nvarchar", { name: "CodigoPrueba", unique: true, length: 20 })
  codigoPrueba: string | undefined;

  @Column("nvarchar", { name: "NombrePrueba", length: 150 })
  nombrePrueba: string | undefined;

  @Column("nvarchar", { name: "Descripcion", nullable: true, length: 500 })
  descripcion: string | null | undefined;

  @Column("bit", { name: "Activo", default: () => "(1)" })
  activo: boolean | undefined;

  @Column("datetime", { name: "FechaEliminacion", nullable: true })
  fechaEliminacion: Date | null | undefined;

  @OneToMany(
    () => OrdenesLaboratorio,
    (ordenesLaboratorio) => ordenesLaboratorio.prueba
  )
  ordenesLaboratorios: OrdenesLaboratorio[] | undefined;
}
