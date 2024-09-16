import { Router } from "express";
import { getAllTodosCtrl, crearTodoCtrl, updTodoCtrl, dltTodoCtrl } from "../controllers/todos.controllers.js";
import { validarJwt } from "../middlewares/validar-jwt.js";

const todosRouter = Router();

todosRouter.get("/", validarJwt, getAllTodosCtrl);
todosRouter.post("/", validarJwt, crearTodoCtrl);
todosRouter.put("/:id", validarJwt, updTodoCtrl);
todosRouter.delete("/:id", validarJwt, dltTodoCtrl);

export { todosRouter };