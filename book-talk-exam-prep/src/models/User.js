const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true,'Username is required'],
        unique: true,
        minlenght: [4,'Username should be at least 4 characters.']
    },
    email: {
        type: String,
        required: [true,'Email is required'],
        minlenght: [4,'Email should be at least 4 characters.'],
        match: [/^[A-za-z0-9]+@\w+.\w+/, 'Invalid email']
    },
    password: {
        type: String,
        required: [true,'Password is required'],
        minlenght: [3,'Password should be at least 3 characters.']
    },
   
});

userSchema.virtual('repeatPassword')
    .set(function (value) {
        if (this.password !== value) {
            throw new Error('Password mismatch!')
        }
    });
    
userSchema.pre('save', async function(){
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
})

const User = mongoose.model('User', userSchema);

module.exports = User;