var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var validator = require('express-validator');
var flash = require('connect-flash');
var passport = require('passport');

var Sequelize = require('sequelize');

var sequelize = new Sequelize('Test','sa','Volo2020V',
    {
        host:'10.0.1.73',
        dialect:'mssql',
        pool:
        {
            max: 5,
            min:0,
            idle:10000
        },
    });

var Video = sequelize.define('video',
    {
        VideoId:
        {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey :true
        },
        title : Sequelize.STRING,
        description : Sequelize.TEXT
    });
var VideoDetails = sequelize.define('videoDetails',
    {
        id:
        {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey :true
        },
        titleDetails : Sequelize.STRING,
        VideoId :
        {type:Sequelize.INTEGER,
            unique:true }
    });

Video.hasMany(VideoDetails);
VideoDetails.belongsTo(Video);




sequelize.sync();




var routes = require('./routes/index');
var users = require('./routes/users');
var about = require('./routes/about');
var products = require('./routes/products');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/about', about);
app.use('/products',products)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
app.use(session({secret:'secret',saveUninitialized:true,resave:true}));
app.use(validator());
app.use(flash());
module.exports = app;
