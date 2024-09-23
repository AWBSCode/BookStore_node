const {
  addBook,
  getBooks,
  getBook,
  putBook,
  deleteBook: modelDelete,
} = require("../models/books");

const selectBooks = async (req, res, next) => {
  try {
    const books = await getBooks();
    res.status(200).json({ books });
  } catch (err) {
    next(err);
  }
};

const postNewBook = async (req, res, next) => {
  try {
    const { title, price, authors } = req.body;
    const book = { title, price, authors };
    const postedBook = await addBook(book);
    res.status(201).json({ postedBook });
  } catch(err) {
    next(err)
  }
};

const selectBook = async (req, res, next) => {
  try{
    const id = req.params.id;
    const book = await getBook({ _id: id });
    res.json({ book });
  }
  catch(err) {
    next(err)
  }
};

const updateBook = async (req, res, next) => {
  try {
    const id = req.params.id;
    const book = await putBook({_id : id}, req.body);
    res.json({ book });
  } catch(err) {
    next(err)
  }
};

const deleteBook = async (req, res, next) => {
  try {
    const id = req.params.id;
    const book = await modelDelete({ _id: id });
    res.json({ book });
  } catch (err) {
    next(err)
  }
};

module.exports = {
  selectBooks,
  selectBook,
  postNewBook,
  updateBook,
  deleteBook,
};
