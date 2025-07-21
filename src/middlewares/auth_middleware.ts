import { Request, Response, NextFunction } from "express";
import  jwt  from "jsonwebtoken"; 

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const authHeader= req.headers.authorization?.split(" ")[1];

    if (!authHeader) {
        return res.status(401).json({ message: "Token não fornecido" });
    }


    try {
        const decoded = jwt.verify(authHeader, JWT_SECRET);
        (req as any).user= decoded; // Assuming you want to attach the user info to the request
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token inválido", error });
    }
}

