import { Router } from "express";
import { getAllTodosCtrl } from "../controllers/todos.controllers.js";
import validartJwt from "../middlewares/validar-jwt.js"

const todosRouter = Router();

todosRouter.get("/",validartJwt, getAllTodosCtrl);
todosRouter.post("/");
todosRouter.post("/");

export { todosRouter };