const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt');

const SECRET = 'elkjeiuheudheufhfeu';

exports.register = (userData) => User.create(userData);

exports.login = async (username, password) => {
    //find user
    const user = await User.findOne({ username });

    if (!user) {
        throw new Error('Invalid username or password');
    }
    //validate password
    const isValid = await bcrypt.compare(password, user.password);
    
    if (!isValid) {
        throw new Error('Invalid username or password');
    }
    //create token
    const payload = {
        _id: user._id,
        username: username,
    }
    const token = await jwt.sing(payload,SECRET, {expiresIn: '2d'});

    
    //TODO return token
    return token
};