const express = require("express");
const { Schema } = require("mongoose");
const router = express.Router();

const Post = require("../models/blogPost");
const Comment = require("../models/Comment");

router.get("/", async (req, res) => {
  const postId = req.query.postId;
  console.log(postId);
  try {
    Post.findById(postId)
      .populate("comments")
      .exec((err, posts, count) => {
        res.render("post", { post: posts });
      });
  } catch (err) {
    console.error(err);
  }
});

router.post("/comment/:postId", async (req, res) => {
  const postId = req.params.postId;
  const comment = new Comment({
    username: req.body.username,
    email: req.body.email,
    content: req.body.content,
    post: postId,
  });
  comment.save();
  const post = await Post.findById(req.params.postId);
  post.comments.push(comment);
  await post.save((err) => {
    if (err) {
      console.log(err);
    }
    res.redirect(`/post/?postId=${postId}`);
  });
});

module.exports = router;
