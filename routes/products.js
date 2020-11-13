const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const auth = require('../config/auth')
const { ensureAuth } = require('../config/auth');
let Products = require('../models/products');
const { connect } = require('http2');

router.get('/addItem', function(req, res) {
    res.render('addItem')
});

let storage = multer.diskStorage({
    destination: './public/uploads', //where to upload
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); //renaming photo name//myImage-Date.extension.
    }
});

const upload = multer({
    storage: storage
}).single('myImage');


router.post('/addItem',ensureAuth,upload,async function(req,res){
    var obj = {
        name: req.body.productName,
        category: req.body.category,
        description: req.body.description,
        stock: req.body.stock,
        price: req.body.price,
        img: '/uploads/' + req.file.filename //filename - storage garda use gareko name.
    }
    const product = new Products(obj);
    let promise = product.save();
    await promise;
    let productitems = await Products.find();
    console.log(productitems);
    res.render('farmerProfile', { obj: productitems });
});

router.get('/item/:_id', function(req, res, next) {
    Products.findOne({ id: req.params.id },
        function(err, products) {
            res.render('productDetail', { productitem: products });

        });

});



router.get('/searchProducts', function(req, res, next) {
    if (req.query.search) {
        Products.find({ name: new RegExp(req.query.search) },
            function(err, products) {
                if (err) {
                    console.log(err);
                } else {
                    res.render('searchProduct', { productList: products });
                }
            });

    } else {
        Products.find({}, function(err, products) {
            if (err) {
                console.log(err);
            } else {
                res.render('searchProduct', { productList: products });
            }
        });
    }
});
router.get('/searchProducts', async function(req, res, next) {
    let products = await Products.find();
    res.render('searchProduct', { productList: products });
})


module.exports = router;