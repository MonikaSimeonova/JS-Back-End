const mongoose = require('mongoose');

const photoShema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Name is required'],
        minLength: [2, 'Name should be at leat 2 chacters']
    },
    image: {
        type: String,
        required: [true,'Image is required'],
        match: /^https?:\/\//,
    },  
    age: {
        type: Number,
        required: [true,'Age is required']
    },  
    description: {
        type: String,
        required: [true,'Description is required'],
       
    },
    location: {
        type: String,
        required: [true,'Location is required']
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    comments: [
        {
            user: {
                type: mongoose.Types.ObjectId,
                required: true,
                ref: 'User'
            },
            message: {
                type: String,
                required: [true,'Comment message is required']
            }
        }
    ],
});

const Photo = mongoose.model('Photo',photoShema )

module.exports = Photo;