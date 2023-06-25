const mongoose = require('mongoose');

const animalShema = new mongoose.Schema({
    name: {
        type: String,
        minLength: [2,'Name should be at least 2 characters long.'],
        required: [true, 'Name is required']
    },
    years: {
        type: Number,
        required: [true, 'Years is required'],
        minValue: 1,
        maxValue: 100,
    },
    kind: {
        type: String,
        minLength: [3,'Name should be at least 3 characters long.'],
        required: [true, 'Kind is required']
    },
    image: {
        type: String,
        match: [/^https?:\/\//,'Incorrect image link'],
        required: [true, 'Image is required']
    },
    need: {
        type: String,
        required: [true, 'Need is required'],
        minLength: [3,'Need should be at least 3 characters long.'],
        maxLength: [20,'Need cannot be more than 20 characters long.']
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
        minLength: [5,'Location should be at least 5 characters long.'],
        maxLength: [15,'Location cannot be more than 15 characters long.']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        minLength: [5,'Description should be at least 5 characters long.'],
        maxLength: [50,'Description cannot be more than 50 characters long.']
    },
    donations: [{
        type: mongoose.Types.ObjectId
    }],
    owner:{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
})

const Animal = mongoose.model('Animal', animalShema);

module.exports = Animal;