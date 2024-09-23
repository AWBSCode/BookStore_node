const openConnection = require("../util/connect")
const mongoose = require("mongoose");


const bookSchema = new mongoose.Schema({
    title: String,
    price: Number,
    authors: Array,
})

mongoose.models = {};

const Book = mongoose.model("book", bookSchema)

const addBook = async ({title, price, authors}) => {
    await openConnection();
    const insertedBook = await Book.insertMany({ title, price, authors })
    return insertedBook;
}

const getBooks = async () => {
    await openConnection();
    const books = await Book.find();
    return books;
}

const getBook = async (filter) => {
    await openConnection();
    const book = await Book.findOne(filter);
    return book;
}

const putBook = async (filter, updateData) => {
    await openConnection();
    const updatedBook = await Book.findOneAndUpdate(filter, updateData, {
        new: true, 
        runValidators: true, 
    });
    return updatedBook;
};


const deleteBook = async (filter) => {
    await openConnection();
    const deletedBook = await Book.deleteOne(filter);
    return deletedBook;
};


module.exports = { addBook, getBooks, getBook, putBook, deleteBook }