'use strict';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const db = require('../models/user.model');
require('dotenv').config();

exports.createJWT = async (user) => {
    const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET
    );
    return token;
};

exports.protect = async (req, res, next) => {
    const bearer = req.headers.authorization;

    if (!bearer) {
        res.status(401);
        res.send("Not authorized x");
        return;
    }

    const [, token] = bearer.split(" ");
    if (!token) {
        console.log("here");
        res.status(401);
        res.send("Not authorized");
        return;
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        console.log(payload);
        next();
        return;
    } catch (e) {
        console.error(e);
        res.status(401);
        res.send("Not authorized");
        return;
    }
}

exports.comparePasswords = async (password, hash) => {
    return bcrypt.compare(password, hash);
};

exports.hashPassword = (password) => {
    return bcrypt.hash(password, 5);
};