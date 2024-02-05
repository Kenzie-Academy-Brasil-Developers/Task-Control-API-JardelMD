import { Router } from "express";
import { ValidateBody } from "../middlewares/validateBody.middleware";
import { TaskControllers } from "../controllers/task.controllers";
import { taskCreateSchema, taskUpdateSchema } from "../schemas/tasks.schema";
import { IsTasksIdValid } from "../middlewares/isTaskIdValid.middleware";
import { categoryRouter } from "./categories.routes";

export const taskRouter = Router();

const taskControllers = new TaskControllers();

taskRouter.post("/", ValidateBody.execute(taskCreateSchema), taskControllers.create);
taskRouter.get("/", taskControllers.findMany);

taskRouter.use("/:id", IsTasksIdValid.execute);
taskRouter.get("/:id", taskControllers.findOne);
taskRouter.patch("/:id", ValidateBody.execute(taskUpdateSchema), taskControllers.update);
taskRouter.delete("/:id", taskControllers.delete);

taskRouter.use("/categories", categoryRouter);