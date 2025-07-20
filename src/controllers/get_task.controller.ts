import { prisma } from "@/lib/cliente";
import { Request, Response } from "express"

async function handleGetAllTask(request: Request, response: Response) {

    try {
        const taskList = await prisma.task.findMany({

        })

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