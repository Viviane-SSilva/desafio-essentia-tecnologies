import { prisma } from "@/lib/cliente";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";



async function register(req: Request, res: Response, next: NextFunction) {
    try {

        const { name, email, senha } = req.body;

        if (!name || !email || !senha) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios" });
        }

        const existingUser = await prisma.user.findUnique({
            where: { email }
        });
        if (existingUser) {
            return res.status(400).json({ message: "Usuário já existe" });
        }
        const hashedPassword = await bcrypt.hash(senha, 10);
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password_hash: hashedPassword,
            }
        });
        return res.status(201).json({ id: user.id, name: user.name, email: user.email });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }

}

export { register };