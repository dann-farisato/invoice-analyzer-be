'use strict';
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.createJWT = (user) => {
    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d",
        }
    );
    return token;
}
exports.protect = async (req, res, next) => {
    const bearer = req.headers.authorization;
    if (!bearer || !bearer.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const [, token] = bearer.split("Bearer ")[1].trim();

    if (!token) {
        return res.status(401).json({ message: "Unauthorized token" });
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({ message: "Unauthorized User" });
    }
}