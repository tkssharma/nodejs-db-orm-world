const mongoose = require("mongoose");
const CustomerSchema = require("./Customer").CustomerSchema;

const Identifier = mongoose.model(
  "Identifier",
  new mongoose.Schema({
    cardCode: String,
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer"
    }
  })
);

module.exports = Identifier;
