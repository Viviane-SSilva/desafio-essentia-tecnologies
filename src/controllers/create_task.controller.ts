
import { prisma } from "@/lib/cliente"
import { Request, Response } from "express"
import { Task } from "@/generated/prisma"
import { z } from "zod";

interface ResponseTask extends Task { }

async function handleCreateTask(request: Request, response: Response) {

    try {
        const schemaTask = z.object({
            title: z.string().min(1, "O title é obrigatório"),
            description: z.string().optional(),
        });

        const result = schemaTask.safeParse(request.body);
        if (!result.success) {
            return response.status(400).json({
                message: "Parametros inválidos",
                errors: result.error
            });
        }

        const { title, description } = result.data;

        const task = await prisma.task.create({
            data: {
                title,
                description
            },
        });

        if (!task) {
            return response.status(500).send({
                error: "Erro ao salvar no banco de dados."
            })
        }

        return response.send(task)

    } catch (error) {
        return response.status(404).json({ message: "Task não foi registrada no banco", error });
    }
}


export { handleCreateTask }

