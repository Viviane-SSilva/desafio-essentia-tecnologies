

import { prisma } from "@/lib/cliente"
import { Request, Response } from "express"




async function handleCreateTask(request:Request, response: Response) {

    interface RequestTask {
        title: string
        description: string,

    }

    interface ResponseTask {
        id: Number,
        title: string,
        description: string,
        completed: Boolean
    }

    const { title, description}: RequestTask = request.body 

   const task = await prisma.task.create({
    data:{
        title,
        description
    }
  })
   
    
return response.send(task)
}

export{ handleCreateTask}

