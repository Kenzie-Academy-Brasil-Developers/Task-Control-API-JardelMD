import { prisma } from "../database/prisma";
// import { AppError } from "../errors/appError";
import { TTaskCreate, TTaskGet, TTaskUpdate } from "../schemas/tasks.schema";

export class TaskServices {
    async create(categoryId: number, body: TTaskCreate) {
        const data = await prisma.task.create({
            data: { categoryId, ...body }
        });
        return data;
    };

    async findMany(search?: any) {
        if (search === undefined) {
            search = ""
        }
        const data = await prisma.task.findMany({
            include: {
                category: {
                    where: {
                        name: { contains: search, mode: "insensitive" }
                    }
                }
            }
        });
        return data;
    };

    async findOne(id: number) {
        const data = await prisma.task.findFirst({
            where: { id },
        });
        return data;
    };

    async update(id: number, body: TTaskUpdate) {
        const data = await prisma.task.update({ where: { id }, data: body });
        return data;
    };

    async delete(id: number) {
        await prisma.task.delete({ where: { id } });
    };
}