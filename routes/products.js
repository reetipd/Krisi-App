const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const auth = require('../config/auth')
const { ensureAuth } = require('../config/auth');
// const { connect } = require('http2');
const User = require('../models/user');
const Order = require('../models/order');
const Product = require('../models/products');


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
    try{
        var obj = {
            user : req.user._id,
            name: req.body.productName,
            category: req.body.category,
            description: req.body.description,
            stock: req.body.stock,
            price: req.body.price,
            img: '/uploads/' + req.file.filename //filename - storage garda use gareko name.
        }
        const product = new Product(obj);
        let promise = await product.save();
        let productItems = await Products.find({ user : req.user._id});
        console.log(productItems);
        res.render('farmerProfile', { obj: productItems , user:req.user, current_user : req.user, err : {}});
    }
    catch(err){
        console.log(err)
        res.render('farmerProfile',{obj : {}, user :{}, current_user : {}, err : {message : err.message || "Cannot add new item"}})
    }
});

router.get('/item/:id', async function(req, res, next) {
    try{
        const product = await Product.findOne({_id : req.params.id})
        const user = await User.findOne({_id : product.user })
        console.log(product)
        console.log(user)
        res.render('productDetail',{productItem : product, user : user, err : {}})
    }
    catch(err){
        console.log(err)
        res.render('productDetail',{productItem : {}, user : {}, err : {message : err.message || "Error in route "}})
    }

});



router.get('/searchProducts', function(req, res, next) {
    if (req.query.search) {
        Product.find({ name: new RegExp(req.query.search) },
            function(err, products) {
                if (err) {
                    console.log(err);
                } else {
                    res.render('searchProduct', { productList: products });
                }
            });

    } else {
        Product.find({}, function(err, products) {
            if (err) {
                console.log(err);
            } else {
                res.render('searchProduct', { productList: products });
            }
        });
    }
});


router.get('/editItem/:id',ensureAuth, function(req, res){
    Product.findOne({ _id: req.params.id },
        function(err, product) {
            console.log(product)
            res.render('editItem', { productitem: product, user:req.user});
        
        });
    });
router.post('/update/:id', function(req,res){
    
    Product.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, function(err, product) {
        console.log(product);
        res.redirect('/users/farmerProfile');
    })

});

router.get('/remove/:id', function (req, res) {
Product.remove({ _id: req.params.id }, function(err, product) {
        res.redirect('/users/farmerProfile');
    })

});


router.get('/cart/:id' ,ensureAuth,async function(req,res){
       await Product.findOne({_id : req.params.id})
        .populate('user')
        .exec(async function(err, user){
            if(user){
                console.log(user)
                console.log(user.user.username)
                
                let orderObj = {
                    product : req.params.id,
                    user : req.user,
                    amount : req.query.qty,
                    notDelivered : true,
                }

                console.log(orderObj)
                const order = new Orders(orderObj);
                let promise = await order.save();
                // await promise;
                res.send('Item stored in db can view in cart now')
                //res.render('cart',{order_obj : order_obj})
            }
        })
    
    
});


router.get('/cart', ensureAuth,async function(req, res) {
    // let product = await Products.find();
    // res.render('cart', { product: product });
    let order = await Order.find({user : req.user }).populate('product user')
    console.log('----------------------cart------------')
    // order.forEach(function(o){
    //     console.log(o.product.name)
    // })
    console.log(order)
    console.log(req.user)
    res.render('cart',{orderObj : order})
});

router.get('/order/remove/:id', function(req,res){
    console.log('in remove') 
    Order.remove({_id : req.params.id}, function(){
        res.redirect('/users/buyerProfile')
    })
});

router.get('/checkout', function(req,res){
    res.send('Chcekout')
})

module.exports = router;