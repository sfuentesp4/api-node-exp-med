import {AppDataSource} from "../config/AppDataSource";
import { RolesMenus } from "../entities/RolesMenus";
import { Menus } from "../entities/Menus";
import { CatalogoRoles } from "../entities/CatalogoRoles";

export class RolesMenusService {
    static async obtenerTodos(): Promise<RolesMenus[]> {
        const rolesMenusRepo = AppDataSource.getRepository(RolesMenus);
        return await rolesMenusRepo.find({
            relations: ["menu", "rol"]
        });
    }

    static async crearRolMenu(data: Partial<RolesMenus>): Promise<RolesMenus> {
        const rolesMenusRepo = AppDataSource.getRepository(RolesMenus);
        const nuevoRolMenu = rolesMenusRepo.create(data);
        return await rolesMenusRepo.save(nuevoRolMenu);
    }

    static async obtenerPorId(id:number): Promise<RolesMenus | undefined> {
        const rolesMenusRepo = AppDataSource.getRepository(RolesMenus);
        const rolMenu = await rolesMenusRepo.findOne({ where: {roleMenuId: id} });
        return rolMenu ?? undefined;
    }

    static async actualizarRolMenu(id: number, data: Partial<RolesMenus>): Promise<RolesMenus | undefined> {
        const rolesMenusRepo = AppDataSource.getRepository(RolesMenus);
        const menusRepo = AppDataSource.getRepository(Menus);
        const rolesRepo = AppDataSource.getRepository(CatalogoRoles);
    
        let rolMenu = await rolesMenusRepo.findOne({ where: { roleMenuId: id } });
        if (!rolMenu) return undefined;
    
        // Validar que el MenuID existe si viene en el data
        if (data.menuId !== undefined) {
            const menuExists = await menusRepo.exist({ where: { menuId: data.menuId } });
            if (!menuExists) {
                throw new Error(`El MenuID ${data.menuId} no existe en la tabla Menus`);
            }
        }
    
        // Validar que el RolID existe si viene en el data
        if (data.rolId !== undefined) {
            const rolExists = await rolesRepo.exist({ where: { rolId: data.rolId } });
            if (!rolExists) {
                throw new Error(`El RolID ${data.rolId} no existe en la tabla CatalogoRoles`);
            }
        }
    
        rolesMenusRepo.merge(rolMenu, data);
        return await rolesMenusRepo.save(rolMenu);
    }

    static async eliminarRolMenu(id: number): Promise<boolean> {
        const rolesMenusRepo = AppDataSource.getRepository(RolesMenus);
        const rolMenu = await rolesMenusRepo.findOne({ where: { roleMenuId: id } });
        if (!rolMenu) return false;

        rolMenu.activo = false;
        rolMenu.fechaEliminacion = new Date();
        await rolesMenusRepo.save(rolMenu);
        return true;
    }

    static async obtenerPorRolId(rolId: number, activo?: boolean): Promise<RolesMenus[]> {
        const rolesMenusRepo = AppDataSource.getRepository(RolesMenus);
        
        const where: any = { rolId };
        
        if (activo !== undefined) {
            where.activo = activo;
        }

        return await rolesMenusRepo.find({ 
            where,
            relations: ['menu', 'rol'] // Incluye las relaciones si las necesitas
        });
    }
}