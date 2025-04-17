import {AppDataSource} from "../config/AppDataSource";
import { RolesMenus } from "../entities/RolesMenus";

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

    static async actualizarRolMenu(id: number,data: Partial<RolesMenus>): Promise<RolesMenus | undefined> {
        const rolesMenusRepo = AppDataSource.getRepository(RolesMenus);
        let rolMenu = await rolesMenusRepo.findOne({ where: { roleMenuId: id} });
        if (!rolMenu) return undefined;

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
}