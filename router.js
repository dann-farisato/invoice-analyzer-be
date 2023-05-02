'use strict'
const Router = require('express');
const productController = require('./controllers/productController');
const usersController = require('./controllers/usersController');
const authUser = require('./handlers/users');
const auth = require('./modules/auth');

const router = Router();

//products route
router.post('/products', productController.findHSCode);

//users routes
router.get('/users', usersController.getUsers);
router.get('/user/:id', usersController.getUserByID);
router.post('/user', usersController.postUser);
router.put('/user/:id', usersController.updateUser);
router.delete('/user/:id', usersController.deleteUser);
router.post('/register', auth.comparePasswords, authUser.register);
// router.post('/protected', auth.comparePasswords, usersController.protected);


module.exports = router;