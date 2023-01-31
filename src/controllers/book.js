const BookPost = require("../models/book");
const path = require("path");
const fs = require("fs");

exports.createBookPost = (req, res, next) => {
  const title = req.body.title;
  const body = req.body.body;
  const author = req.body.author;
  const createdAt = req.body.createdAt;
  const image = req.file.path;

  const Posting = new BookPost({
    title: title,
    body: body,
    image: image,
    author: author,
    createdAt: createdAt,
  });

  Posting.save()
    .then((result) => {
      res.status(201).json({
        message: "Create Book Post Success",
        data: result,
      });
    })

    .catch((err) => {
      console.log(err);
    });
};

exports.getAllBookPost = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = req.query.perPage || 11;

  let totalItems;

  BookPost.find()
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return BookPost.find()
        .skip(parseInt(currentPage - 1) * perPage)
        .limit(parseInt(perPage));
    })
    .then((result) => {
      res.status(200).json({
        message: "Data Buku Berhasil Dipanggil",
        data: result,
        total_data: totalItems,
        per_page: parseInt(perPage),
        current_page: parseInt(currentPage),
      });
    })
    .catch();

  // BookPost.find()
  //   .then((result) => {
  //     res.status(200).json({
  //       message: "Data Buku Berhasil dipanggil",
  //       data: result,
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};

exports.getBookPostById = (req, res, next) => {
  const bookId = req.params.bookId;
  BookPost.findById(bookId)
    .then((result) => {
      res.status(200).json({
        message: "Data Buku Berhasil Dipanggil",
        data: result,
      });
    })
    .catch();
};

exports.updateBookPost = (req, res, next) => {
  const title = req.body.title;
  const body = req.body.body;
  const author = req.body.author;
  const createdAt = req.body.createdAt;
  const image = req.file.path;

  const bookId = req.params.bookId;

  BookPost.findById(bookId)
    .then((post) => {
      post.title = title;
      post.body = body;
      post.author = author;
      post.createdAt = createdAt;
      post.image = image;

      return post.save();
    })
    .then((result) => {
      res.status(200).json({
        message: "Update Sukses",
        data: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteBookPost = (req, res, next) => {
  const bookId = req.params.bookId;

  BookPost.findById(bookId)
    .then((post) => {
      removeImage(post.image);
      return BookPost.findByIdAndRemove(bookId);
    })
    .then((result) => {
      res.status(200).json({
        message: "Hapus Data Buku Berhasil",
        data: result,
      });
    })
    .catch((err) => console.log(err));
};

const removeImage = (filePath) => {
  // console.log("filePath: ", filePath);
  // console.log("dir name: ", __dirname);

  filePath = path.join(__dirname, "../..", filePath);
  fs.unlink(filePath, (err) => console.log(err));
};
