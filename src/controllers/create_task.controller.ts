
import { Request, Response } from "express"
import { prisma } from "@/lib/cliente"



async function handleCreateTask(request:Request, response: Response) {

    interface RequestTask {
        title: String
        description: String,

    }

    interface ResponseTask {
        id: Number,
        title: String,
        description: String,
        completed: Boolean
    }

    const { title, description}: RequestTask = request.body 

    
return response.send({})
}

export{ handleCreateTask}

