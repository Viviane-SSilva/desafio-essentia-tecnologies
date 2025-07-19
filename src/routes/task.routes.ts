import { Router } from "express";

import {
    createTask,
    getAllTasks,
    updateTask,
    deleteTask,
} from '..//controllers/task.controller'

const router = Router()

router.post("./", createTask)
router.get("/", getAllTasks)
router.put("/:id", updateTask)
router.delete("/:id", deleteTask)

export default router