const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String
});

const Customer = mongoose.model("Customer", CustomerSchema);

module.exports = { Customer, CustomerSchema };
