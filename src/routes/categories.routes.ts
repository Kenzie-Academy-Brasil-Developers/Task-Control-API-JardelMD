import { Router } from "express";
import { CategoryControllers } from "../controllers/category.controllers";
import { IsCategoryIdValid } from "../middlewares/isCategoryIdValid.middleware";
import { categoryCreateSchema } from "../schemas/categories.schema";
import { ValidateBody } from "../middlewares/validateBody.middleware";

export const categoryRouter = Router();

const categoryControllers = new CategoryControllers();

categoryRouter.post("/", ValidateBody.execute(categoryCreateSchema), categoryControllers.create);
categoryRouter.delete("/:id", IsCategoryIdValid.execute, categoryControllers.delete);