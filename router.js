'use strict'
const Router = require('express');
const productController = require('./controllers/productController');
const usersController = require('./controllers/usersController');
const authUser = require('./handlers/users');

const router = Router();

//products route
router.post('/products', productController.findHSCode);

//users routes
router.get('/users', usersController.getUsers);
router.get('/user/:id', usersController.getUserByID);
router.post('/user', usersController.postUser);
router.put('/user/:id', usersController.updateUser);
router.delete('/user/:id', usersController.deleteUser);
router.post('/register', authUser.register);


module.exports = router;