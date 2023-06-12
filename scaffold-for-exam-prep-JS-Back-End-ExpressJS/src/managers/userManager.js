const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt')

const SECTER = 'klfjrofhorhfioefi4';

exports.login = async(username, password) => {
    // find user by username
    const user = await User.findOne({username})
    if(!user){
        throw new Error('Invalid user or password')
    };
    const isValid = await bcrypt.compare(password, user.password);
    if(!isValid){
        throw new Error('Invalid user or password')
    };

    const payload = {
        _id: user._id,
        username: user.username,
        email: user.email
    }
    const token = await jwt.sing(payload, SECRET)

};

exports.register = async (userData) => {
    const user = await User.findOne({ username: userData.username });

    if (user) {
        throw new Error('Username already exists')
    }
    return User.create(userData);
};

