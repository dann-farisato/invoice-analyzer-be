'user strict';
// const express = require('express');
// const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

const login = async (req, res) => {
    try {
        User.findOne({ email: req.body }, (err, user) => {
            if (!user) {
                res.status(401).json({ message: 'Invalid email or password', data: { email: req.body.email } });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
    const validPassword = bcrypt.compareSync(req.body.password, User.password);
    if (!validPassword) {
        res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ id: User._id }, secret, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', data: { token } });
};



const register = async (req, res) => {
    const user = await User.create({
        // where: { id: req.body.name },
    });

    const isValid = await comparePasswords(req.body.password, user.password);

    if (!isValid) {
        res.status(401);
        res.send("Invalid username or password");
        return;
    }

    const token = createJWT(user);
    res.json({ token });
};

module.exports = { login, register };
