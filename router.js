'use strict'
const Router = require('express');
const productController = require('./controllers/productController');
const usersController = require('./controllers/usersController');

const router = Router();

//products route
router.post('/products', productController.findHSCode);

//users routes
router.get('/users', usersController.getUsers);
router.get('/user/:i', usersController.getUserByID);
router.post('/user', usersController.postUser);
router.put('/user/:id', usersController.updateUser);
router.delete('/user/:id', usersController.deleteUser);
router.post('/register', usersController.register);

module.exports = router;