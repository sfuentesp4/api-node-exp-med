import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RolesMenus } from "./RolesMenus";

@Index("PK__Menus__C99ED2509285DB69", ["menuId"], { unique: true })
@Entity("Menus", { schema: "dbo" })
export class Menus {
  @PrimaryGeneratedColumn({ type: "int", name: "MenuID" })
  menuId!: number;

  @Column("nvarchar", { name: "Titulo", length: 50 })
  titulo!: string;

  @Column("nvarchar", { name: "Ruta", length: 255 })
  ruta!: string;

  @Column("nvarchar", { name: "Icono", nullable: true, length: 50 })
  icono!: string | null;

  @Column("int", { name: "ParentID", nullable: true })
  parentId!: number | null;

  @Column("bit", { name: "Activo", default: () => "(1)" })
  activo!: boolean;

  @Column("datetime", { name: "FechaEliminacion", nullable: true })
  fechaEliminacion!: Date | null;

  @OneToMany(() => RolesMenus, (rolesMenus) => rolesMenus.menu)
  rolesMenus!: RolesMenus[];
}
