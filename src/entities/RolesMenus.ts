import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Menus } from "./Menus";
import { CatalogoRoles } from "./CatalogoRoles";

@Index("PK_RolesMenus", ["roleMenuId"], { unique: true })
@Index("UQ_RolesMenus_RolID_MenuID", ["rolId", "menuId"], { unique: true })
@Entity("RolesMenus", { schema: "dbo" })
export class RolesMenus {
  @PrimaryGeneratedColumn({ type: "int", name: "RoleMenuID" })
  roleMenuId!: number;

  @Column("int", { name: "RolID", unique: true })
  rolId!: number;

  @Column("int", { name: "MenuID", unique: true })
  menuId!: number;

  @Column("bit", { name: "Activo", default: () => "(1)" })
  activo!: boolean;

  @Column("datetime", { name: "FechaEliminacion", nullable: true })
  fechaEliminacion!: Date | null;

  @ManyToOne(() => Menus, (menus) => menus.rolesMenus)
  @JoinColumn([{ name: "MenuID", referencedColumnName: "menuId" }])
  menu!: Menus;

  @ManyToOne(() => CatalogoRoles, (catalogoRoles) => catalogoRoles.rolesMenus)
  @JoinColumn([{ name: "RolID", referencedColumnName: "rolId" }])
  rol!: CatalogoRoles;
}
