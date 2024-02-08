import { prisma } from "../database/prisma";
import { TTask, TTaskCreate, TTaskUpdate } from "../schemas/tasks.schema";

export class TaskServices {
    public async create(body: TTaskCreate): Promise<TTask> {
        const data = await prisma.task.create({
            data: body
        });
        return data;
    };

    public async findMany(search?: any): Promise<Array<TTask>> {
        if (!search) {
            return await prisma.task.findMany({
                include: { category: true }
            });
        }
        const data = await prisma.task.findMany({
            where: {
                category: {
                    name: { contains: search, mode: "insensitive" }
                }
            },
            include: { category: true }
        });
        return data;
    };

    public async findOne(id: number): Promise<TTask | null> {
        const data = await prisma.task.findFirst({
            where: { id },
            include: { category: true }
        });
        return data;
    };

    public async update(id: number, body: TTaskUpdate): Promise<TTask | null> {
        const data = await prisma.task.update({ where: { id }, data: body });
        return data;
    };

    public async delete(id: number): Promise<void> {
        await prisma.task.delete({ where: { id } });
    };
}