

import { prisma } from "@/lib/cliente"
import { Request, Response } from "express"
import { Task } from "@/generated/prisma"

    interface RequestTask {
        title: string
        description: string,

    }

    interface ResponseTask extends Task{}

async function handleCreateTask(request:Request, response: Response) {


    

    const { title, description}: RequestTask = request.body 

   const task: ResponseTask = await prisma.task.create({
    data:{
        title,
        description
    }
  })
   
    
return response.send(task)
}

export{ handleCreateTask}

