import { AppDataSource } from "../config/AppDataSource";
import { Menus } from "../entities/Menus";

export class MenuService {
    static async obtenerTodos(): Promise<Menus[]> {
        const menuRepo = AppDataSource.getRepository(Menus);
        return await menuRepo.find();
    }

    static async crearMenu(data: Partial<Menus>): Promise<Menus> {
        const menuRepo = AppDataSource.getRepository(Menus);
        const nuevoMenu = menuRepo.create(data);
        return await menuRepo.save(nuevoMenu);
    }

    static async obtenerPorId(id: number): Promise<Menus | undefined> {
        const menuRepo = AppDataSource.getRepository(Menus);
        const menu = await menuRepo.findOne({ where: { menuId: id } });
        return menu ?? undefined;
    }

    static async actualizarMenu(id: number, data: Partial<Menus>): Promise<Menus | undefined> {
        const menuRepo = AppDataSource.getRepository(Menus);
        let menu = await menuRepo.findOne({ where: { menuId: id } });
        if (!menu) return undefined;

        menuRepo.merge(menu, data);
        return await menuRepo.save(menu);
    }

    static async eliminarMenu(id: number): Promise<boolean> {
        const menuRepo = AppDataSource.getRepository(Menus);
        const menu = await menuRepo.findOne({ where: { menuId: id } });
        if (!menu) return false;

        menu.activo = false;
        menu.fechaEliminacion = new Date();
        await menuRepo.save(menu);
        return true;
    }

}