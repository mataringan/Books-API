const express = require("express");

const router = express.Router();

const bookController = require("../controllers/book");

router.post("/book", bookController.createBookPost);

router.get("/book", bookController.getAllBookPost);

router.get("/book/:bookId", bookController.getBookPostById);

router.put("/book/:bookId", bookController.updateBookPost);

router.delete("/book/:bookId", bookController.deleteBookPost);

module.exports = router;
