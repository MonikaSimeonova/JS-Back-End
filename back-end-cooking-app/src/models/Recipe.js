const mongoose = require('mongoose');

const recipeShema = new mongoose.Schema({
    imageUrl: String,
    description: String,
    name: String,
    difficultyLevel: String,
});

const Recipe = mongoose.model('Recipe', recipeShema);

module.exports = Recipe;