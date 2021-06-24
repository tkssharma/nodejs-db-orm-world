const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const MealSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true }
});

module.exports = Meal = mongoose.model("Meal", MealSchema);
