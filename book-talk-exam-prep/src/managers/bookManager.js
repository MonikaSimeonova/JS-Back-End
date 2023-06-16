const Book = require('../models/Book');


exports.create = (bookData) => Book.create(bookData);

exports.getAll = () => Book.find();

exports.findOne = (bookId) => Book.findById(bookId).lean().populate('owner');

exports.delete = (bookId) => Book.findByIdAndDelete(bookId);

exports.update = (bookId, bookData) => Book.findByIdAndUpdate(bookId, bookData);

exports.addWish = async (bookId, userId) => {

    const book = await Book.findById(bookId);
    if (book.wishingList.includes(userId)) {
        throw new Error('Book is already added to your wish list')
    }
    book.wishingList.push(userId);

    await book.save();
}

exports.getWished = (userId) =>   Book.find({wishingList: userId});
