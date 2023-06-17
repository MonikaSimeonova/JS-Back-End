const mongoose = require('mongoose');

const auctionShema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
        
    },
    image: {
        type: String,
    },
    price:{
        type: Number,
        required: true,
    },
    author:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        
    },
    bidder:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        
    },

})

const Auction = mongoose.model('Auction', auctionShema);

module.exports = Auction;