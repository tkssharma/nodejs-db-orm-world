require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require("body-parser");
const users = require("./api/user");
const meals = require("./api/meal");
const orders = require("./api/order");


const app = express();
app.use(express.json())
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

app.use(passport.initialize());
require('./api/auth/passport')(passport);

app.use("/api/users", users);
app.use("/api/meals", meals);
app.use("/api/orders", orders);



// Connect to MongoDB
mongoose
  .connect(process.env.mongoURI, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is up and running on port ${port}`)
})