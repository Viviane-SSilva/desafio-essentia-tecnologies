import { prisma } from "@/lib/cliente";
import { Request, Response } from "express"

async function handleGetAllTask(request: Request, response: Response) {

    const taskList = await prisma.task.findMany({

    })

    if (!taskList) {
        return response.status(500).send({
            error:"Erro de busca."
        })
    }

    return response.send(taskList)
    
}

export {handleGetAllTask}