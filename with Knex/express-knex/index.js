const express = require("express");

const db = require("./data/db.js");

const app = express();

app.use(express.json());

/**
 * METHOD: GET
 * ROUTE: /todo
 * PURPOSE: Get all tasks
 */
app.get("/todo", async (req, res) => {
  const todos = await db("todo");
  res.json({ todos });
});

/**
 * METHOD: POST
 * ROUTE: /todo
 * PURPOSE: Create new task
 */
app.post("/todo", async (req, res) => {
  const { task } = req.body;
  const newTodo = await db("todo")
    .insert(task)
    .then(item => {
      return item.rowCount;
    });
    
  if (newTodo === 1) {
    return res.status(201).json({ message: "Todo created successfully" });
  }
});

const PORT = process.env.PORT || 3500;

app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
