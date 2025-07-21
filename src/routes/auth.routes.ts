import { Router } from "express";
import { register } from "@/controllers/register.controller";
import { login } from "@/controllers/login.controller";

const routerAuth = Router();

routerAuth.post("/register", register);
routerAuth.post("/login", login);   

export { routerAuth };