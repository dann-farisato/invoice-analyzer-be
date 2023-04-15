'use strict';
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200);
        res.send(users);
    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.getUserByID = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200);
        res.send(user);

    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.postUser = async (req, res) => {
    try {
        const data = await User.create(req.body);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.updateUser = async (req, res) => {
    try {
        const updateUser = await User.findById(req.params.id);
        if (updateUser) {
            updateUser.username = req.body.username;
            updateUser.firstName = req.body.firstName;
            updateUser.lastName = req.body.lastName;
            updateUser.password = req.body.password;
            updateUser.email = req.body.email;

            const updatedUser = await updateUser.save();
            res.status(200).send(updatedUser);
        }

    } catch (error) {
        res.stauts(500).json({ error });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const deleteUser = await User.findById(req.params.id);
        if (deleteUser) {
            await deleteUser.remove();
            res.status(200).send({ message: 'User has been deleted' });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};

// exports.registerUser = async (req, res) => {
//     try {
//         const { username, firstName, lastName, email, password } = req.body;
//         const existingUser = await User.findOne({ email });

//         if (existingUser) {
//             return res.status(409).send({ message: 'Email already exists' });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);
//         const user = await User.create({ username, firstName, lastName, email, password: hashedPassword });

//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//         return res.status(201).send({ token });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).send({ message: 'Internal server error' });
//     }
// };

// exports.loginUser = async (req, res) => {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });

//     if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//     }

//     if (password !== user.password) {
//         return res.status(401).json({ message: 'Incorrect password' });
//     }

//     const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     res.json({ token });
// };
