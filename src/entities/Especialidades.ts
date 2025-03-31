import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Doctores } from "./Doctores";

@Index("PK__Especial__F90718114A8B345A", ["especialidadId"], { unique: true })
@Entity("Especialidades", { schema: "dbo" })
export class Especialidades {
  @PrimaryGeneratedColumn({ type: "int", name: "EspecialidadID" })
  especialidadId!: number;

  @Column("nvarchar", { name: "Nombre", length: 100 })
  nombre!: string;

  @Column("nvarchar", { name: "Descripcion", nullable: true, length: 500 })
  descripcion!: string | null;

  @Column("bit", { name: "Activo", default: () => "(1)" })
  activo!: boolean;

  @Column("datetime", { name: "FechaEliminacion", nullable: true })
  fechaEliminacion!: Date | null;

  @OneToMany(() => Doctores, (doctores) => doctores.especialidad)
  doctores!: Doctores[];
}
