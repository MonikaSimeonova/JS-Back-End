const Game = require('../models/Game');

exports.create = (gameData) => Game.create(gameData);

exports.getAll = () => Game.find();

exports.getOne = (id) => Game.findById(id).populate('owner');

exports.update = (id, data) => Game.findByIdAndUpdate(id, data);
exports.delete = (id) => Game.findByIdAndDelete(id);

exports.buyGame = async(gameId, userId)=>{
    const game = await Game.findById(gameId);

    game.boughtBy.push(userId);

    await game.save();
}