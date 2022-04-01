import { Router } from "express";
import ToDoController from "../controllers/todo.controller";
import { checkJwt } from "../middlewares/jwt";

const router = Router();

// addTodo
router.post("/add", [checkJwt], ToDoController.addTODO);

//editTodo
router.post("/edit", [checkJwt], ToDoController.updateTODO);

//deleteTodo
router.delete("/delete", [checkJwt], ToDoController.deleteTODO);


export default router;