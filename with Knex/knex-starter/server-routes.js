const todos = require('./data/dao/todos');

async function getAllTodos(req, res) {
  const all = await todos.all();
  return res.json(all);
}

async function getTodo(req, res) {
  const todo = await todos.get(req.params.id);
  return res.send(todo);
}

async function postTodo(req, res) {
  const created = await todos.create({ title: req.body.title, order: req.body.order });
  return res.json(created);
}

module.exports = {
  getAllTodos,
  getTodo,
  postTodo
}