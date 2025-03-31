import { Column, Entity, Index, OneToMany } from "typeorm";
import { Pacientes } from "./Pacientes";

@Index("PK__Catalogo__A99D0268E8D0F9B9", ["generoId"], { unique: true })
@Entity("CatalogoGeneros", { schema: "dbo" })
export class CatalogoGeneros {
  @Column("char", { primary: true, name: "GeneroID", length: 1 })
  generoId!: string;

  @Column("nvarchar", { name: "Descripcion", length: 10 })
  descripcion!: string;

  @Column("bit", { name: "Activo", default: () => "(1)" })
  activo!: boolean;

  @Column("datetime", { name: "FechaEliminacion", nullable: true })
  fechaEliminacion!: Date | null;

  @OneToMany(() => Pacientes, (pacientes) => pacientes.genero)
  pacientes!: Pacientes[];
}
