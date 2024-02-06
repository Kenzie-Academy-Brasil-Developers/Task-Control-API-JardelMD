import { prisma } from "../database/prisma";
import { TCategory, TCategoryCreate } from "../schemas/categories.schema";

export class CategoryServices {
    async create(body: TCategoryCreate): Promise<TCategory> {
        return await prisma.category.create({ data: body });
    }

    async delete(categoryId: number): Promise<void> {
        await prisma.category.delete({ where: { id: categoryId } });
    }
}