import { Router } from "express";
import ToDoController from "../controllers/todo.controller";
import { checkJwt } from "../middlewares/jwt";

const router = Router();
// get my Todo
router.get("/getMyToDo", [checkJwt], ToDoController.getMyToDo);

// addTodo
router.get("/add", [checkJwt], ToDoController.addTODO);

// addTodo
router.post("/add", [checkJwt], ToDoController.addTODO);

//editTodo
router.put("/edit", [checkJwt], ToDoController.updateTODO);

//deleteTodo
router.delete("/delete/:id", [checkJwt], ToDoController.deleteTODO);


export default router;