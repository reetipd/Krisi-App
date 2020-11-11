const express = require('express');
const router = express.Router();
const Products = require('../models/products')

/* GET home page. */
router.get('/', async function (req, res, next) {
  let product = await Products.find();
  res.render('index', { productList: product });
});

module.exports = router;
