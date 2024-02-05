import { Request, Response } from "express";
import { TaskServices } from "../services/task.services";


export class TaskControllers {
    async create(req: Request, res: Response) {
        const taskServices = new TaskServices();
        const { categoryId } = req.body

        const response = await taskServices.create(categoryId, req.body);

        return res.status(201).json(response);
    }

    async findMany(req: Request, res: Response) {
        const taskServices = new TaskServices();
        const {category} = req.query;

        const response = await taskServices.findMany(category);

        return res.status(200).json(response);
    }

    findOne(req: Request, res: Response) {
        const taskServices = new TaskServices();
        const {id} = req.params;

        const response = taskServices.findOne(Number(id));

        return res.status(200).json(response);
    }

    async update(req: Request, res: Response) {
        const taskServices = new TaskServices();

        const response = await taskServices.update(Number(req.params.id), req.body);

        return res.status(200).json(response);
    }

    async delete(req: Request, res: Response) {
        const taskServices = new TaskServices();

        await taskServices.delete(Number(req.params.id));

        return res.status(204).json();
    }
}