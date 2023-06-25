const Animal = require('../models/Animal');

exports.create = (animalData) => Animal.create(animalData);

exports.getAll = () => Animal.find();

exports.getOne = (id) => Animal.findById(id).populate('owner');

exports.update = (id, data) => Animal.findByIdAndUpdate(id, data);

exports.delete = (id) => Animal.findByIdAndDelete(id);

exports.donate = async (id, userId) => {
    const animal = await Animal.findById(id);

    if (animal.donations.includes(userId)) {
        throw new Error('Cannot donate twice')
    }
    animal.donations.push(userId);

    await animal.save();
}
exports.findByLocation = async (locationSearch) => {
    let animals = await Animal.find().lean();

    if (locationSearch) {
        animals = animals.filter(animals => animals.location.toLowerCase().includes(locationSearch.toLowerCase()))
        if(!animals.length){
            animals = [];
        }
    }
    return animals;
}

