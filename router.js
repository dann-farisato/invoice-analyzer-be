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
router.get("/api/user/:id", usersController.getUserByID);
router.post("/api/user", usersController.postUser);
router.put("/api/user/:id", usersController.updateUser);
router.delete("/api/user/:id", usersController.deleteUser);

module.exports = router;