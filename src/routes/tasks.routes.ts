import { Router } from "express";
import { ValidateBody } from "../middlewares/validateBody.middleware";
import { TaskControllers } from "../controllers/task.controllers";
import { taskCreateSchema, taskUpdateSchema } from "../schemas/tasks.schema";
import { IsTasksIdValid } from "../middlewares/isTaskIdValid.middleware";
import { IsCategoryIdValid } from "../middlewares/isCategoryIdValid.middleware";

export const taskRouter = Router();

const taskControllers = new TaskControllers();

taskRouter.post("/", ValidateBody.execute(taskCreateSchema), IsCategoryIdValid.executePost, taskControllers.create);
taskRouter.get("/", taskControllers.findMany);

taskRouter.use("/:id", IsTasksIdValid.execute);
taskRouter.get("/:id", taskControllers.findOne);
taskRouter.patch("/:id", ValidateBody.execute(taskUpdateSchema), taskControllers.update);
taskRouter.delete("/:id", taskControllers.delete);