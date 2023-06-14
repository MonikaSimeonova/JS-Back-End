const Photo = require('../models/Photo')

exports.create = (photodata) =>Photo.create(photodata);

exports.getAll = ()=>Photo.find();