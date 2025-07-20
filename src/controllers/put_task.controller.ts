import { prisma } from "@/lib/cliente";
import { Request, Response } from "express"


async function handleUpdateTask(request: Request, response: Response) {

    const { id, title } = request.body;
    


    const updateTask = await prisma.task.update({
        where: { id: Number(id) },
        data: {
            title,
            updateAt: new Date(),
        },
    })

     return response.send(updateTask)
}


export { handleUpdateTask }