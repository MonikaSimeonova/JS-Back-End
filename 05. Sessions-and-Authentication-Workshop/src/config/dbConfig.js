const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/cubicle-may-2023';

async function dbConnect() {
    await mongoose.connect(url);
}




module.exports = dbConnect;