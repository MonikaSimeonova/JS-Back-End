const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        minLength: [10,'Email should be at least 10 characters long.'],
        required: [true,'Email is required']
    },
    password: {
        type: String,
        minLength: [4,'Password should be at least 4 characters long.'],
        required: [true,'Password is required']
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