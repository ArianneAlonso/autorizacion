import { Router } from "express";
import { getAllTodosCtrl, crearTodoCtrl, updTodoCtrl, dltTodoCtrl} from "../controllers/todos.controllers.js";
import validartJwt from "../middlewares/validar-jwt.js"

const todosRouter = Router();

todosRouter.get("/",validartJwt, getAllTodosCtrl);
todosRouter.post("/", validartJwt, crearTodoCtrl);
todosRouter.put("/:id", validartJwt, updTodoCtrl );
todosRouter.delete("/:id", validartJwt, dltTodoCtrl)

export { todosRouter };