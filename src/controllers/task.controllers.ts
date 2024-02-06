import { Request, Response } from "express";
import { TaskServices } from "../services/task.services";


export class TaskControllers {
    async create(req: Request, res: Response) {
        const taskServices = new TaskServices();

        const response = await taskServices.create(req.body);

        return res.status(201).json(response);
    }

    async findMany(req: Request, res: Response) {
        const taskServices = new TaskServices();
        const {category} = req.query;

        const response = await taskServices.findMany(category);

        return res.status(200).json(response);
    }

    findOne(req: Request, res: Response) {
        const task = res.locals.task

        return res.status(200).json(task);
    }

    async update(req: Request, res: Response) {
        const taskServices = new TaskServices();

        const response = await taskServices.update(res.locals.task.id, req.body);

        return res.status(200).json(response);
    }

    async delete(req: Request, res: Response) {
        const taskServices = new TaskServices();

        await taskServices.delete(res.locals.task.id);

        return res.status(204).json();
    }
}