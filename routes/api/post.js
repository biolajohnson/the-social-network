const express = require("express");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const Post = require("../../models/Post");
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const router = express.Router();

//@route POST api / post
// test post
//access private

router.post(
  "/",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select("-password");
      const newPost = new Post({
        user: req.user.id,
        avatar: user.avatar,
        name: user.name,
        text: req.body.text,
      });
      const post = await newPost.save();
      res.json(post);
    } catch (e) {
      console.error(e.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route GET api / post
// test get posts
//access private

router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
});

//@route GET api / post
// test get post by id
//access private
router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (e) {
    console.log(e.message);
    if (e.kind === "ObjectId") {
      res.status(404).json({ message: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

//@route DELETE api / post
// test get post by id
//access private

router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findByIdAndDeleter(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not Authorized" });
    }
    res.json({ message: "Post removed" });
  } catch (e) {
    console.log(e.message);
    if (e.kind === "ObjectId") {
      res.status(404).json({ message: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

//@route PUT api/post/like/:id
// test get post by id
//access private
router.put("/likes/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //check if post is already liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      //post already liked
      return res.status(400).json({ message: "Post already liked" });
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.send(post);
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Server Error");
  }
});

//@route PUT api/post/unlike/:id
// test get post by id
//access private
router.put("/unlikes/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //check if post is not already liked
    if (
      (post.likes.filter(
        (like) => like.user.toString() === req.user.id
      ).length = 0)
    ) {
      //post is not  liked
      return res.status(400).json({ message: "Post has not been liked" });
    }
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);
    post.likes.splice(removeIndex, 1);
    await post.save();
    res.send(post);
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Server Error");
  }
});

//@route POST api / post comment
// test post comment
//access private

router.post(
  "/comment/:id",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(req.params.id);
      const newComment = {
        user: req.user.id,
        avatar: user.avatar,
        name: user.name,
        text: req.body.text,
      };
      post.comments.unshift(newComment);
      await post.save();
      res.json(post.comments);
    } catch (e) {
      console.error(e.message);
      res.status(500).send("Server Error");
    }
  }
);
//@route DELETE api / post comment
// test delete comment
//access private

router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //pullout comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    //make sure comment exists
    if (!comment) {
      return res.status(404).json({ message: "Comment does not exist" });
    }
    //check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }
    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);
    post.comments.splice(removeIndex, 1);
    await post.save();
    res.send(post.comments);
  } catch (e) {
    console.log(e.message);
    if (e.kind === "ObjectId") {
      res.status(404).json({ message: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
