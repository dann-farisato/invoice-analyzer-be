'use strict'
const { Router } = require("express");
const productController = require('./controllers/productController');
const usersController = require('./controllers/usersController');

const router = Router();
//general route
router.get("/api", (req, res) => {
    res.json({ message: "Welcome to YOUR NEW application." });
});


//products route
router.post("/products", productController.findHSCode);

//users routes
router.get("/api/users", usersController.getUsers);
router.post("/api/user", usersController.postUser);

module.exports = router;