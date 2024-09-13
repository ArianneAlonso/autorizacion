import { database } from "../db/database.js";

export const getAllTodosCtrl = (req, res) => {
  
  console.log(req.user)

  const todos = database.todos.filter((todo)=> todo.owner === req.user.id)

  res.json({ todos });
};

export const crearTodoCtrl = (req, res) => {
  const {title, completed} = req.body;

  if (!title || completed === undefined) {
    return res.status(400).json({ message: "se necesita un título y asiganr si esta completado" });
}
const nuevoTodo = {
  id: database.todos.length + 1,
  title,
  completed,
  owner: req.user.id,
};

database.todos.push(nuevoTodo);
res.status(201).json({ message: "se ha creado exitosamente", todo: nuevoTodo});
}; 

export const updTodoCtrl = (req, res)=>{

};

export const dltTodoCtrl = (req, res)=>{

};