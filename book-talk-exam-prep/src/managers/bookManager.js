const Book = require('../models/Book');

exports.create = (bookData)=> Book.create(bookData);
exports.getAll = ()=> Book.find();
exports.findOne = (bookId)=> Book.findById(bookId).lean().populate('owner');
exports.delete = (bookId)=> Book.findByIdAndDelete(bookId);