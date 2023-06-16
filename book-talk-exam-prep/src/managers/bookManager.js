const Book = require('../models/Book');

exports.create = (bookData) => Book.create(bookData);
exports.getAll = () => Book.find();
exports.findOne = (bookId) => Book.findById(bookId).lean().populate('owner');
exports.delete = (bookId) => Book.findByIdAndDelete(bookId);
exports.update = (bookId, bookData) => Book.findByIdAndUpdate(bookId, bookData);
exports.addWish = async (bookId, userId) => {
    const book = await Book.findById(bookId);

    book.wishingList.push(userId);

    await book.save();
}