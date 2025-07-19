import { Router } from "express";
import { handleCreateTask } from "@/controllers/create_task.controller";
import { handleGetAllTask } from "@/controllers/get_task.controller";

const routes = Router()
//
routes.post("/create-task", handleCreateTask)
routes.get("/get-task", handleGetAllTask)
//router.put("/:id", updateTask)
//router.delete("/:id", deleteTask)
//
export {routes}