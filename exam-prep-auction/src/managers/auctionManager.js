const Auction = require('../models/Auction');

exports.create = (data)=> Auction.create(data);

exports.getAll = ()=> Auction.find();

exports.getOne = (id)=> Auction.findById(id).populate('author');

exports.update = (id, data)=> Auction.findByIdAndUpdate(id,data);

exports.delete = (id)=> Auction.findByIdAndDelete(id);