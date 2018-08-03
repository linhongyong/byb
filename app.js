var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var redis = require('redis');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);

var redisClient = redis.createClient();




var routes = require('./routes/index');
var userCtrl = require('./controller/userCtrl');
var mallCtrl = require('./controller/mallCtrl');

var funnyCtrl = require('./controller/funnyCtrl');
var essayCtrl = require('./controller/essayCtrl');
var sellGoodCtrl = require('./controller/sellGoodCtrl');
var rentGoodCtrl = require('./controller/rentGoodCtrl');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
    else  next();
});
/**
 * redis持久化session
 */
app.use(session({
    store: new RedisStore({client:redisClient}),
    secret: 'keyboard cat',
    resave:false, 
	saveUninitialized:false
}))






//设置路由
app.use('/', routes);
app.use('/api/user', userCtrl);
app.use('/api/mall', mallCtrl);

app.use('/api/funny', funnyCtrl);
app.use('/api/essay', essayCtrl);
app.use('/api/good', sellGoodCtrl);
app.use('/api/good', rentGoodCtrl);
//app.get('/login', function(req, res){
//console.log(req.params,req.query);
//res.json(JSON.stringify(req.query))
//});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
