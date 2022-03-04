const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const OrderSchema = new Schema({
  total_amount: { type: Number, required: true },
  status: { type: String, required: true, default: "placed" },
  created_at: {
    type: Date,
    default: Date.now
  },
  _meals: [{ type: Schema.ObjectId, ref: "Meal" }],
  _user: { type: Schema.ObjectId, ref: "User" },
  _restaurant: { type: Schema.ObjectId, ref: "Restaurant" }
});

module.exports = Order = mongoose.model("Order", OrderSchema);
