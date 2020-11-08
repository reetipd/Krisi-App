var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt')
var bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/signup', function(req,res,next){
  res.render('signup');
});

router.get('/login', function(req,res,next){
  res.render('login');
});

router.post('/login',function(req,res,next){
  res.render('farmerProfile')
})

router.get('/addItem', function(req,res){
  res.render('addItem')
})

router.post('/signup',[ 
  check ('password', 'Pw small').isLength({min:4})
], function(req,res){
  const result = validationResult(req);
  var errors = result.errors;
  console.log(errors);
  console.log(result)
  if (errors){
    res.render('signup',{
      errors:errors
    })
    console.log('Error');
  }
  else{
    res.send(req.body);
    console.log('Ok');
  }

  res.render('signup',{errors:errors});
});

// router.post('/signup', async function(req,res,next){
//   //console.log(req.body);
//   if(req.body.password === req.body.password2){
//     console.log('Matched')
//   }
//   else{
//     console.log('Not matched');
//     res.send('Pw')
//   }
//   try { 
//     const salt = await bcrypt.genSalt()
//     const hashedPassword = await bcrypt.hash(req.body.password,salt)
//     console.log(salt)
//     console.log(hashedPassword)
//   }
//   catch(err){
//     console.log(err)
//   }
// })

// router.post('/signup', [
//     body('email','Email is not valid!!')
//     .isEmail()
//     .normalizeEmail(),
//     ],
//     function (req,res,next){
//       console.log(req.body);
//       const errors = validationResult(req)
//       if (!errors.isEmpty()){
//         //res.status(400).json({errors:errors.array()});
//         const alerts = errors.array()

//         res.render('signup',{
//           alerts
//         })
//       }
//       else{
//         res.json(req.body);
//       }
//     });

module.exports = router;
