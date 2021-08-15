const mongoose = require("mongoose");

const Categories = new mongoose.Schema({
  name: String,
  post: { type: mongoose.Schema.Types.ObjectId, ref: "PostSchema" },
});
