'use strict';

const mongoose = require('./index');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
});

userSchema.methods.validatePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};
const User = mongoose.model('User', userSchema);


module.exports = User;