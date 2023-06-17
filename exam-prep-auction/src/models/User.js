const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true,'Email is required']
    },
    password: {
        type: String,
        required: [true,'Password is required']
    },
    username: {
        type: String,
        required: [true,'Username is required'],
        unique: true
    },
    lastname: {
        type: String,
        required: [true,'Last name is required'],
        unique: true
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