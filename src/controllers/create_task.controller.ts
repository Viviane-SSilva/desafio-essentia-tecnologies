

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


console.log(title, description)

if ( description == null || description == undefined){
    return response.status(400).send({
        error: "faltando argumentos"
    })
}

if ( title == null || title == undefined){
    return response.status(400).send({
        error: "faltando argumentos"
    })
}
    
    
   const task: ResponseTask = await prisma.task.create({
    data:{
        title,
        description
    }
  })
   
if (!task) {
    return response.status(500).send({
        error: "Erro ao salvar no banco de dados."
    })
}
    
return response.send(task)
}

export{ handleCreateTask}

