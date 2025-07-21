import { Router } from "express";
import { handleCreateTask } from "@/controllers/create_task.controller";
import { handleGetAllTask } from "@/controllers/get_task.controller";
import { handleDeleteTask } from "../controllers/delete_task.controller";
import { handleUpdateTask } from "@/controllers/put_task.controller";
import { handleCompletedTask } from "@/controllers/completed_task.controller";

const routes = Router()
//
routes.post("/create-task", handleCreateTask)
routes.get("/get-task", handleGetAllTask)
routes.put("/put-task", handleUpdateTask)
routes.put("/completed-task", handleCompletedTask) // Assuming this is for marking a task as completed
routes.delete("/task/:id", handleDeleteTask )

export {routes}