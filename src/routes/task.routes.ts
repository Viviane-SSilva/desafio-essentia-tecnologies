import { Router } from "express";
import { handleCreateTask } from "@/controllers/create_task.controller";

const routes = Router()
//
routes.post("/", handleCreateTask)
//router.get("/", getAllTasks)
//router.put("/:id", updateTask)
//router.delete("/:id", deleteTask)
//
export {routes}