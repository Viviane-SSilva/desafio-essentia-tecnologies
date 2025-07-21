import { prisma } from "@/lib/cliente";
import { Request, Response } from "express"
import { z } from "zod";
import id from "zod/v4/locales/id.cjs";


async function handleCompletedTask(request: Request, response: Response) {

    try {
        const schemaTask = z.object({
            id: z.number().min(1, "ID must be a positive number"),
            completed: z.boolean(),
        });

        const result = schemaTask.safeParse(request.body);
        if (!result.success) {
            return response.status(400).json({
                message: "Parametros inválidos",
                errors: result.error
            });
        }

        const { id, completed } = result.data

        const updateTask = await prisma.task.update({
            where: { id: Number(id) },
            data: {
                completed,
                updateAt: new Date(),
            },
        })

        return response.send(updateTask)

    } catch (error) {
        return response.status(404).json({ message: "Task não encontrada", error });
    }
}


export { handleCompletedTask }