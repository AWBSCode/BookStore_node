const express = require("express");
const router = express.Router();
const {
  selectBooks,
  postNewBook,
  updateBook,
  deleteBook,
  selectBook,
} = require("../controllers/books");
const validateBook = require("../validation/book");
const auth = require("../middlewares/auth");

router.get("", selectBooks);


router.get("/:id", selectBook);

router.post("", auth, validateBook, postNewBook);

router.put("/:id", auth, validateBook, updateBook);

router.delete("/:id", auth, deleteBook);

module.exports = router;
