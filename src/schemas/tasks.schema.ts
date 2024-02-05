import { z } from "zod";
import { categorySchema } from "./categories.schema";

export const taskSchema = z.object({
    id: z.number().positive(),
    title: z.string().min(1),
    content: z.string().min(1),
    finished: z.boolean().default(false),
    categoryId: z.number().positive().optional()
});
export const taskGetSchema = z.object({
    id: z.number().positive(),
    title: z.string().min(1),
    content: z.string().min(1),
    finished: z.boolean().default(false),
    category: categorySchema
});

export const taskCreateSchema = taskSchema.omit({ id: true, finished: true });

export const taskUpdateSchema = taskSchema.omit({ id: true, categoryId: true, category: true });

export type TTask = z.infer<typeof taskSchema>;

export type TTaskCreate = z.infer<typeof taskCreateSchema>;

export type TTaskGet = z.infer<typeof taskGetSchema>;

export type TTaskUpdate = z.infer<typeof taskUpdateSchema>;
