import { Request, Response } from "express";
import { CategoryServices } from "../services/category.services";

export class CategoryControllers {
    public async create(req: Request, res: Response): Promise<Response> {
        const categoryServices = new CategoryServices();

        const response = await categoryServices.create(req.body);

        return res.status(201).json(response);
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const categoryServices = new CategoryServices();

        await categoryServices.delete(res.locals.category.id);

        return res.status(204).json();
    }
}