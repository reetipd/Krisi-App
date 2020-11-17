const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const bodyParser = require('body-parser');
const User = require('../models/user');
const Product = require('../models/products');
const passport = require('passport');
const { ensureAuth }  = require('../config/auth')
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/signup', function(req, res, next) {
    res.render('signup');
});

// router.post('/signup',async function(req,res,next){
//   if(req.body.password === req.body.password2){
//     const salt = await bcrypt.genSalt(10);
//     const hashPw = await bcrypt.hash(req.body.password, salt);
//     console.log(req.body.action)
//     const user = new User(
//       {
//         action : req.body.action,
//         fname : req.body.fname,
//         lname : req.body.lname,
//         mobilenumber : req.body.mobilenumber,
//         citizenship : req.body.citizenship,
//         username : req.body.username,
//         address : req.body.address,
//         email : req.body.email,
//         number: req.body.number,
//         password : hashPw,

//         });
//         let promise = user.save();
//         promise.then(() => {
//             console.log('user saved');
//             console.log(user);
//             res.redirect('/users/login')
//         }).catch((err) => { res.send(err) })
//     } else {

//         res.render('/users/login')
//     }
// });

router.post('/signup',async function(req,res,next){
  try{
    if(req.body.password === req.body.password2){
      const salt = await bcrypt.genSalt(10);
      const hashPw = await bcrypt.hash(req.body.password, salt);
      console.log(req.body.action)
      const user = new User(
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

          });
          await user.save();
          console.log('user saved');
          console.log(user);
          res.redirect('/users/login')
        }
        else{
          res.redirect('/users/signup')
        }
  }catch(err){
    console.log(err);
    res.render('login',{err: {message : err.message || "Error in signup "}})
  }
});

router.get('/login', function(req, res, next) {
    res.render('login');
});

router.post('/login',
     // (req,res,next) =>{
    // if(req.user.action == "buy"){
    //   console.log('buy');
    //   next();
    // }
    // else{
    //   console.log('sell');
    //   next();
    // }
    // user_sel = Users.find({username:req.body.username})
    // console.log(user_sel);
    // next()
    // } , 
    async (req,res,next) =>{
      let userSel = await User.findOne({username : req.body.username });
      console.log(userSel)
      actionOption = userSel.action 
      console.log(actionOption)
      if(actionOption === "buy"){
      passport.authenticate('local',{
      successRedirect : '/users/buyerProfile',
      failureRedirect : '/users/login'
      
  })(req,res,next);
}
else{
  passport.authenticate('local',{
  successRedirect : '/users/farmerProfile',
  failureRedirect : '/users/login'
  
})(req,res,next);
}
})

router.get('/farmerProfile', ensureAuth, async function(req,res){
  //res.send('Here')
   console.log(req.user._id);
   let products = await Products.find({user : req.user._id });

   console.log(products)
   console.log(user)
   res.render('farmerProfile',{obj: products ,user : req.user, current_user: req.user});
});

router.get('/farmerProfile/:_id',ensureAuth, async function(req,res){
  console.log(req.params._id)
  let products = await Product.find({user : req.params._id})
  let user = await User.findOne({_id : req.params._id})
  //console.log(products)
  console.log('search gareko wala user ---')
  console.log(user)
  console.log('session wala suer ---')
  console.log(req.user)
  res.render('farmerProfile',{obj: products,user:user, currentUser : req.user });
})

router.get('/buyerProfile',ensureAuth, async function(req,res){
  res.render('buyerProfile',{user: req.user})
})
module.exports = router;
