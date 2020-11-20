const express = require('express');
const router = express.Router();
const Product = require('../models/products')

/* GET home page. */
router.get('/', async function(req, res, next) {
    let products = await Product.find();
    res.render('index', { productList: products });
});

router.get('/about', async function(req, res, next) {
    res.render('about');
});

module.exports = router;