const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUploader = require('express-fileupload');

let index = require('./routes/index');
let addMeme = require('./routes/addMeme');
let addGenre = require('./routes/addGenre');
let viewAll = require('./routes/viewAll');
let searchMeme = require('./routes/searchMeme');
let getDetails = require('./routes/details');

let app = express();

require('./config/database');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUploader());

app.use((req, res, next) => {
  if (req.url.startsWith('/public')) {
    req.url = req.url.replace('/public', '');
  }

  if (req.url.startsWith('/getDetails/public')) {
    req.url = req.url.replace('/getDetails/public', '');
  }

  next();
}, express.static(
  path.normalize(
    path.join(__dirname, 'public'))));


app.use('/', index);
app.use('/addMeme', addMeme);
app.use('/addGenre', addGenre);
app.use('/viewAllMemes', viewAll);
app.use('/searchMeme', searchMeme);
app.use('/getDetails/:id', getDetails);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
