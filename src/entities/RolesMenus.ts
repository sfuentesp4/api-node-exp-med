import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Menus } from "./Menus";
import { CatalogoRoles } from "./CatalogoRoles";

@Index("PK__RolesMen__E5BAEFF4A49171B1", ["rolId", "menuId"], { unique: true })
@Entity("RolesMenus", { schema: "dbo" })
export class RolesMenus {
  @Column("int", { primary: true, name: "RolID" })
  rolId!: number;

  @Column("int", { primary: true, name: "MenuID" })
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
