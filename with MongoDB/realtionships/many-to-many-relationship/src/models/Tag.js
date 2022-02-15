const mongoose = require("mongoose");

const Tag = mongoose.model(
  "Tag",
  new mongoose.Schema({
    name: String,
    slug: String,
    tutorials: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tutorial"
      }
    ]
  })
);

module.exports = Tag;
