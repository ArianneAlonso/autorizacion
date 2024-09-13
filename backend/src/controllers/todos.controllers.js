import { database } from "../db/database.js";

export const getAllTodosCtrl = (req, res) => {
  
  console.log(req.user)

  const todos = database.todos.filter((todo)=> todo.owner === req.user.id)

  res.json({ todos });
};
