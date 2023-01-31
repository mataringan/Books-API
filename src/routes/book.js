const express = require("express");

const router = express.Router();

const bookController = require("../controllers/book");

router.post("/post", bookController.createBookPost);

router.get("/posts", bookController.getAllBookPost);

router.get("/post/:postId", bookController.getBookPostById);

router.put("/post/:postId", bookController.updateBookPost);

router.delete("/post/:postId", bookController.deleteBookPost);

module.exports = router;
