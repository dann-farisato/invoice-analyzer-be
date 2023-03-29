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

exports.postUser = async (req, res) => {
    try {
        const data = await User.create(req.body);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).json(error);
    }
};
