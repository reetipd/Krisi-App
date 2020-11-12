var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productRouter = require('./routes/products');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var expressValidator = require('express-validator');
var expressSession = require('express-session');
const flash = require('connect-flash')
var app = express();

const multer = require('multer');
const passport = require('passport');

//Passport middleware
const session = require('express-session');
require('./config/passport')(passport);

app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);


app.use(passport.initialize());
app.use(passport.session());
//database connection
mongoose.connect('mongodb://localhost/agriDB',   
{ useNewUrlParser: true, useUnifiedTopology: true }, 
() => { console.log('successful database connection') });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//body-parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


app.use(expressSession({secret:'max', saveUninitialized:false,resave:false}))


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products',productRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
