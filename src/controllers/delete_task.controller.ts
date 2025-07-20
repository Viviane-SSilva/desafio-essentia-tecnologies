
import { prisma } from "@/lib/cliente";
import { Request, Response } from "express";
import { z } from "zod";

async function handleDeleteTask(request: Request, response: Response) {

    const schema = z.object({
        id: z.string().min(1, "ID must be a valid string"),
    });

    const result = schema.safeParse(request.params);

    if (!result.success) {
        return response.status(400).json({
            message: "Parametros inválidos",
            errors: result.error
        });
    }
    const { id } = result.data


    try {
        const deletedTask = await prisma.task.delete({
            where: { id: Number(id) },
        });
        return response.status(200).json({ message: "Task deletada com sucesso", deletedTask });
    } catch (error) {
        return response.status(404).json({ message: "Task não encontrada", error });
    }
}

export { handleDeleteTask };
