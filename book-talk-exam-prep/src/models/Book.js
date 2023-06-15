const mongoose = require('mongoose');

const bookShema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author:{
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    review: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    stars:{
        type: Number,
        required: true,
        minValue: 1,
        maxValue: 5,
    },
    owner:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    wishingList: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ]
})

const Book = mongoose.model('Book', bookShema);

module.exports = Book;