const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const auth = require('../config/auth')
const { ensureAuth } = require('../config/auth');
let Products = require('../models/products');
const { connect } = require('http2');
let Users = require('../models/user');
let Orders = require('../models/order')
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
        user : req.user._id,
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
    let productitems = await Products.find({ user : req.user._id});
    console.log(productitems);
    res.render('farmerProfile', { obj: productitems , user:req.user});
});

router.get('/item/:id', function(req, res, next) {
    console.log(req.params.id)
    Products.findOne({ _id: req.params.id },
        async function(err, products) {
            let u = await Users.findOne({_id : products.user })  
            console.log(products)
            console.log(u)
            res.render('productDetail', { productitem: products, user : u });

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

router.get('/cart/:id' ,ensureAuth,async function(req,res){
    // Products.find({_id : req.params.id},  function(err,product_detail) {
    //     console.log('product info in buyer profile')
    //     product_detail.forEach( async function (product) {
    //         //console.log(product.user)
    //         var farmer_detail = await Users.find({_id : product.user })
    //         console.log(farmer_detail)
    //         let order_obj = {
    //             product : req.params.id,
    //             user :  product.user,//user is array ??//
    //             amount : req.query.qty,
    
    //         }
    //         console.log(order_obj)
    //     })
    //     //console.log(req.params.id)
        
    //     //console.log(order_obj)
    //     res.send('sdkjhsjd')
        
       // res.render('cart',{user : req.user, product_detail : product_detail})
       let pr = await Products.findOne({_id : req.params.id})
        .populate('user')
        .exec(async function(err, user){
            if(user){
                console.log(user)
                console.log(user.user.username)
                
                let order_obj = {
                    product : req.params.id,
                    user : req.user,
                    amount : req.query.qty,
                    notDelivered : true,
                }

                console.log(order_obj)
                const order = new Orders(order_obj);
                let promise = order.save();
                await promise;
                res.send('Item stored in db can view in cart now')
                //res.render('cart',{order_obj : order_obj})
            }
        })
    //})
    
    
});

// router.get('/cart',ensureAuth,async function(req,res){
//     let order = await Orders.find({user : req.user }).populate('product user')
//     console.log('----------------------cart------------')
//     console.log(order)
//     console.log(req.user)
//     res.render('cart',{order_obj : order})
// });
// router.get('/searchProducts', async function(req, res, next) {
//     await Products.find(function(err, products) {
//         res.render('searchProduct', { products: products });
//     });

// })

router.get('/cart', ensureAuth,async function(req, res) {
    // let product = await Products.find();
    // res.render('cart', { product: product });
    let order = await Orders.find({user : req.user }).populate('product user')
    console.log('----------------------cart------------')
    order.forEach(function(o){
        console.log(o.product.name)
    })
    console.log(req.user)
    res.render('cart',{order_obj : order})
});

router.get('/order/remove/:id', function(req,res){
    console.log('in remove') 
    Orders.remove({_id : req.params.id}, function(){
        res.redirect('/users/buyerProfile')
    })
});

router.get('/checkout', function(req,res){
    res.send('Chcekout')
})

module.exports = router;