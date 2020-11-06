var express = require('express');
var  router = express.Router();
var product = require('../resources/pro');

router.get('/', function(req, res, next){
    res.render('products',{product : product});
});

module.exports = router;