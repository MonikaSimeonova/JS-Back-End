const mongoose = require('mongoose');

const dbLink = 'mongodb://localhost:27017/recipies';

async function dbConnect(){
    await mongoose.connect(dbLink)
}
module.exports = dbConnect;

