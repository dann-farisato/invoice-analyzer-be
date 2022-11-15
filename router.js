'use strict'
const { Router } = require("express");
const productController = require('./controllers/productController')

const router = Router();

router.post("/products", productController.findHSCode);


module.exports = router;