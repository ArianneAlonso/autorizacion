import { database } from "../db/database.js";

//muestra las tareas
export const getAllTodosCtrl = (req, res) => {
  
  console.log(req.user)

  const todos = database.todos.filter((todo)=> todo.owner === req.user.id)

  res.json({ todos });
};

//crear una tarea
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

// actualizar una tarea
export const updTodoCtrl = (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  const todo = database.todos.find((todo) => todo.id === parseInt(id));

  if (!todo) {
    return res.status(404).json({ message: "npo se encontro la tarea" });
  }

  if (todo.owner !== req.user.id) {
    return res.status(403).json({ message: "no tienes autorizacion para actualizar esta tarea" });
  }

  todo.title = title !== undefined ? title : todo.title;
  todo.completed = completed !== undefined ? completed : todo.completed;

  res.json({ message: "se actualizo la tarae", todo });
};

// elimina una tarea
export const dltTodoCtrl = (req, res) => {
  const { id } = req.params;

  const todoIndex = database.todos.findIndex((todo) => todo.id === parseInt(id));

  if (todoIndex === -1) {
    return res.status(404).json({ message: "no se encontro la tarea" });
  }

  const todo = database.todos[todoIndex];

  if (todo.owner !== req.user.id) {
    return res.status(403).json({ message: "no tienes autorizacion para eliminar esta tarea" });
  }

  database.todos.splice(todoIndex, 1);

  res.json({ message: "tarea eliminada" });
};