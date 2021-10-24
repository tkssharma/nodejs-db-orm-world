require('dotenv').config();
const express = require('express');
const routes = require('./server-routes');
const db = require('./data/db.js');
console.log(db);
const app = express();

app.use(express.json());

app.get('/', routes.getAllTodos);
app.get('/:id', routes.getTodo);
app.post('/', routes.postTodo);

const port = process.env.PORT || 3003
app.listen(port, () => {
  console.log(`application started ${port}`);
})