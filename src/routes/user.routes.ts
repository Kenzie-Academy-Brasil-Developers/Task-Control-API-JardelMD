import { Router } from "express";
import { UserControllers } from "../controllers/user.controllers";
import { VerifyToken } from "../middlewares/verifyToken.middleware";
import { IsEmailAlreadyRegistered } from "../middlewares/isEmailAlreadyRegistered.middleware";

export const userRouter = Router();

const userControllers = new UserControllers();

userRouter.post("/", IsEmailAlreadyRegistered.execute,  userControllers.register);
userRouter.post("/login",  userControllers.login);
userRouter.get("/", VerifyToken.execute,  userControllers.getUser);