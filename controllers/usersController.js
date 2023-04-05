'use strict';

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
