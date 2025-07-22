import { prisma } from "@/lib/cliente";
import { Request, Response } from "express"
import { z } from "zod";

const schema = z.object({
    userId: z.number().min(1, "ID é obrigatório"),
});

async function handleGetAllTask(request: Request, response: Response) {
    const result = schema.safeParse(request.body);
    if (!result.success) {
        return response.status(400).json({
            message: "Parametros inválidos",
            errors: result.error
        });
    }


    try {
        const { userId } = result.data;

        const taskList = await prisma.task.findMany({
            where: { userId }
        });

        if (!taskList) {
            return response.status(500).send({
                error: "Erro de busca."
            })
        }

        return response.send(taskList)

    } catch (error) {
        return response.status(404).json({ message: "Task não encontrada", error });
    }


}

export { handleGetAllTask }