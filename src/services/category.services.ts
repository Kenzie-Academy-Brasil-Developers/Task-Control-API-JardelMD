import { prisma } from "../database/prisma";
import { TCategory, TCategoryCreate } from "../schemas/categories.schema";

export class CategoryServices {
    async create(body: TCategoryCreate) {
        const data = await prisma.category.create({ data: body });

        return data;
    }

    async delete(categoryId: number) {
        await prisma.category.delete({ where: { id: categoryId } });
    }
}