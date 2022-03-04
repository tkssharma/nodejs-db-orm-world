const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MealSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})

const Meal = mongoose.model("Meal", MealSchema);
module.exports = Meal;