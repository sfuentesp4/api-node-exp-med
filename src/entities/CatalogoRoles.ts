import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RolesMenus } from "./RolesMenus";
import { Usuarios } from "./Usuarios";

@Index("PK__Catalogo__F92302D1E0E1947C", ["rolId"], { unique: true })
@Index("UQ__Catalogo__92C53B6C9B036C82", ["descripcion"], { unique: true })
@Entity("CatalogoRoles", { schema: "dbo" })
export class CatalogoRoles {
  @PrimaryGeneratedColumn({ type: "int", name: "RolID" })
  rolId!: number;

  @Column("nvarchar", { name: "Descripcion", unique: true, length: 20 })
  descripcion!: string;

  @Column("bit", { name: "Activo", default: () => "(1)" })
  activo!: boolean;

  @Column("datetime", { name: "FechaEliminacion", nullable: true })
  fechaEliminacion!: Date | null;

  @OneToMany(() => RolesMenus, (rolesMenus) => rolesMenus.rol)
  rolesMenus!: RolesMenus[];

  @OneToMany(() => Usuarios, (usuarios) => usuarios.rol)
  usuarios!: Usuarios[];
}
