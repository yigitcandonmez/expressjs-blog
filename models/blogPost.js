const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: String,
  category: String,
  content: String,
  writer: String,
  date: { type: Date, default: Date.now },
  like: { type: Number, default: 0 },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

module.exports = mongoose.model("Post", PostSchema);
