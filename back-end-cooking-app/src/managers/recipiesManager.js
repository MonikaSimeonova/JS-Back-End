const Recipe = require('../models/Recipe');

exports.getAll = () => Recipe.find({}).lean();

exports.create = (recipiesData) => Recipe.create(recipiesData);
// const recipe = new Recipe(recipiesData);
// await recipe.save()
// return recipe;

exports.getById = (id) => Recipe.findById(id);

exports.updateRecipie = (id, recipiesData) => {
    return Recipe.findByIdAndUpdate(id, recipiesData);
}

exports.deleteRecipie = async(id)=>{
    return await Recipe.findByIdAndDelete(id);
}
