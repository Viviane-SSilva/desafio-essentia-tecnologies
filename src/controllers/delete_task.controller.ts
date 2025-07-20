
import { prisma } from "@/lib/cliente";
import { Request, Response } from "express";

async function handleDeleteTask(request: Request, response: Response) {
    const { id } = request.params;
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
