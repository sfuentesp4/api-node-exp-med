import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DetallesReceta } from "./DetallesReceta";
import { Pacientes } from "./Pacientes";
import { Doctores } from "./Doctores";

@Index("PK__Recetas__03D077B86E7819D4", ["recetaId"], { unique: true })
@Entity("Recetas", { schema: "dbo" })
export class Recetas {
  @PrimaryGeneratedColumn({ type: "int", name: "RecetaID" })
  recetaId!: number;

  @Column("datetime", {
    name: "FechaEmision",
    nullable: true,
    default: () => "getdate()",
  })
  fechaEmision!: Date | null;

  @Column("date", { name: "FechaExpiracion" })
  fechaExpiracion!: Date;

  @Column("bit", { name: "Activo", default: () => "(1)" })
  activo!: boolean;

  @Column("datetime", { name: "FechaEliminacion", nullable: true })
  fechaEliminacion!: Date | null;

  @OneToMany(() => DetallesReceta, (detallesReceta) => detallesReceta.receta)
  detallesRecetas!: DetallesReceta[];

  @ManyToOne(() => Pacientes, (pacientes) => pacientes.recetas)
  @JoinColumn([{ name: "PacienteID", referencedColumnName: "pacienteId" }])
  paciente!: Pacientes;

  @ManyToOne(() => Doctores, (doctores) => doctores.recetas)
  @JoinColumn([{ name: "DoctorID", referencedColumnName: "doctorId" }])
  doctor!: Doctores;
}
