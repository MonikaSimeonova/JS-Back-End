const mongoose = require('mongoose');

const accssesoryShame = new mongoose.Schema({
    name: String,
    description: String,
    imageUrl: String,
});

const Accessory = mongoose.model('Accessory', accssesoryShame);

module.exports = Accessory;