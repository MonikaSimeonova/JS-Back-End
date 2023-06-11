const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userShema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        minLength: [5, 'Password is too short'],
        match: [/^[A-Za-z0-9]+$/, 'Username must be in english letters'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: 8,
        // validate: {
        //     validator: function(value){
        //         return this.repeatPassword === value;
        //     },
        //     message: 'Password missmatch'
        // }
          validate: {
            validator: function(value){
                return /^[A-Za-z0-9]+$/.test(value);
            },
            message: 'Invalid password characters'
        }
    },
});

userShema.virtual('repeatPassword')
.set(function(value){
    if(value !== this.password){
        throw new Error('Password missmatch');
    }
});

userShema.pre('save',  async function(){
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
});

const User = mongoose.model('User', userShema);

module.exports = User;