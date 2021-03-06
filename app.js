var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var expressLayouts = require('express-ejs-layouts');

const mongoose = require('mongoose');

const systemConfig = require('./configs/system');



//connect mongoDB
mongoose.connect('mongodb://localhost:27017/training_nodejs', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error',function() {
  console.log( 'connection error')
});
db.once('open', function() {
  // we're connected!
  console.log( 'connected');
});




var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', './backend');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//local variable
app.locals.systemConfig = systemConfig;

//setup router
app.use(`/${systemConfig.prefixAdmin}`, require('./routes/backend/index'));
app.use('/', require('./routes/frontend/index'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('pages/error', { pageTitle: 'Page Not Found!' });
});

module.exports = app;
