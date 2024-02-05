import "express-async-errors";
import express, { json } from "express";
import helmet from "helmet";
import { HandleErrors } from "./middlewares/handleErrors";
import { categoryRouter } from "./routes/categories.routes";
import { taskRouter } from "./routes/tasks.routes";

export const app = express();

app.use(helmet());

app.use(json());

app.use("/categories", categoryRouter);

app.use("/tasks", taskRouter);

app.use(HandleErrors.execute);