import { Router } from "express";
import { handleCreateTask } from "@/controllers/create_task.controller";
import { handleGetAllTask } from "@/controllers/get_task.controller";
import { handleDeleteTask } from "@/controllers/delete_task.controller";
import { handleUpdateTask } from "@/controllers/put_task.controller";

const routes = Router()
//
routes.post("/create-task", handleCreateTask)
routes.get("/get-task", handleGetAllTask)
routes.put("/put-task/:id", handleUpdateTask)
routes.delete("/task/:id", handleDeleteTask )

export {routes}