import { Request, Response } from "express";
import { TaskServices } from "../services/task.services";


export class TaskControllers {
    public async create(req: Request, res: Response): Promise<Response> {
        const taskServices = new TaskServices();

        const response = await taskServices.create(req.body);

        return res.status(201).json(response);
    }

    public async findMany(req: Request, res: Response): Promise<Response> {
        const taskServices = new TaskServices();
        const { category } = req.query;

        const response = await taskServices.findMany(category);

        return res.status(200).json(response);
    }

    public async findOne(req: Request, res: Response): Promise<Response> {
        const task = res.locals.task

        return res.status(200).json(task);
    }

    public async update(req: Request, res: Response): Promise<Response> {
        const taskServices = new TaskServices();

        const response = await taskServices.update(res.locals.task.id, req.body);

        return res.status(200).json(response);
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const taskServices = new TaskServices();

        await taskServices.delete(res.locals.task.id);

        return res.status(204).json();
    }
}