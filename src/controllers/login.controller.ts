import { prisma } from "@/lib/cliente";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


async function login(req: Request, res: Response) {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ message: "Email e senha são obrigatórios" });
        }

        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(401).json({ message: "Usuário não encontrado" });
        }

        const isPasswordValid = await bcrypt.compare(senha, user.password_hash);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Senha incorreta" });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || "secret", { expiresIn: '1h' });

        return res.status(200).json({ token, user: { id: user.id, name: user.name, email: user.email } });

    } catch (error) {
        return res.status(500).json({ message: "Erro interno do servidor", error });
    }
    
}

export { login };