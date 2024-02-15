import {
    TLoginReturn,
    TUserLoginBody,
    TUserRegisterBody,
    TUserReturn,
    userReturnSchema,
} from "../schemas/user.schemas";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/appError";

export class UserServices {
    async register(body: TUserRegisterBody): Promise<TUserReturn> {
        const hashPassword = await bcrypt.hash(body.password, 10);

        const newUser: TUserRegisterBody = {
            name: body.name,
            email: body.email,
            password: hashPassword,
        };

        const data = await prisma.user.create({ data: newUser });

        return userReturnSchema.parse(data);
    }

    async login(body: TUserLoginBody): Promise<TLoginReturn> {
        const user = await prisma.user.findFirst({ where: { email: body.email } });

        if (!user) {
            throw new AppError(404, "User not exists");
        }

        const compare = await bcrypt.compare(body.password, user.password);

        if (!compare) {
            throw new AppError(401, "Email and password doesn't match");
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
            expiresIn: "12h",
        });

        return {
            accessToken: token,
            user: userReturnSchema.parse(user)
        }
    }

    async getUser(id: number): Promise<TUserReturn> {
        const user = await prisma.user.findFirst({ where: { id } });

        return userReturnSchema.parse(user)
    }
}