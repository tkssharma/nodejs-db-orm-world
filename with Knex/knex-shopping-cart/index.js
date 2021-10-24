require('dotenv').config();
const express = require('express');
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const db = require('./data/db.js');
console.log(db);
const app = express();

app.use(express.json());

app.get('/users', userRoutes.getAllUsers);
app.get('/users/:id', userRoutes.getUser);
app.post('/users', userRoutes.createUser);

app.get('/products', productRoutes.getAllProducts);
app.get('/products/:id', productRoutes.getProduct);
app.post('/products', productRoutes.createProduct);

const port = process.env.PORT || 3003
app.listen(port, () => {
  console.log(`application started ${port}`);
})