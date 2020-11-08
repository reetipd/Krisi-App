var express = require('express');
var  router = express.Router();
var multer = require('multer');
var path = require('path');
var fs = require('fs');

var product = require('../resources/pro');
let Products = require('../models/products');
router.get('/', function(req, res, next){
    res.render('products',{product : product});
});

router.get('/addItem', function(req,res){
    res.render('addItem')
});

var storage = multer.diskStorage({
    destination : './public/uploads',
    filename : function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); //renaming photo name
    }
});

const upload = multer({
    storage:storage
}).single('myImage');


router.post('/addItem',upload,async function(req,res){
    var obj = {
        name : req.body.productName,
        category : req.body.category,
        description : req.body.description,
        stock : req.body.stock,
        price : req.body.price, 
        img : '/uploads/'+req.file.filename
    }
    const product = new Products(obj);
    let promise = product.save();
    await promise;
    let productitems = await Products.find();
    res.render('farmerProfile',{obj : productitems});
    });
    // promise.then(()=>{
    //     console.log('product added');
    //     console.log(obj);
    //     res.render('farmerProfile',{obj:obj});
    // })

//})


module.exports = router;