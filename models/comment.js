const mongoose = require("mongoose");

const Comment = new mongoose.Schema({
  username: { type: String, required: true },
  email: String,
  content: { type: String, required: true },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "PostSchema" },
});

module.exports = mongoose.model("Comment", Comment);
