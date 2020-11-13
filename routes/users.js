const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser');
const Users = require('../models/user');
const Products = require('../models/products');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/signup', function(req,res,next){
  res.render('signup');
});

router.post('/signup',async function(req,res,next){
  if(req.body.password === req.body.password2){
    const salt = await bcrypt.genSalt(10);
    const hashPw = await bcrypt.hash(req.body.password, salt);

    const users = new Users(
      {
        action : req.body.action,
        fname : req.body.fname,
        lname : req.body.lname,
        mobilenumber : req.body.mobilenumber,
        citizenship : req.body.citizenship,
        username : req.body.username,
        address : req.body.address,
        email : req.body.email,
        number: req.body.number,
        password : hashPw,

      }
    );
    let promise = users.save();
    promise.then( () =>{
      console.log('user saved');
      console.log(users);
      res.redirect('/users/login')
    }).catch((err) =>{res.send(err)})
  }
  
    else{
      
      res.render('/users/login')
    }
  });

router.get('/login', function(req,res,next){
  res.render('login');
});

router.post('/login',async function(req,res,next){
  let productitems = await Products.find();
  console.log(productitems);
  res.render('farmerProfile',{obj:productitems})
});
router.get('/farmerProfile',async function(req,res,next){
  let productitems = await Products.find();
  console.log(productitems);
  res.render('farmerProfile',{obj:productitems})
});
module.exports = router;
