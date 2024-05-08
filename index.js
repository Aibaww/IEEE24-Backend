//
// entry point
//
// **03/06/2024 refactored app.js and index.js into one file
// for clarity & debugging purposes**
//

require('dotenv').config()

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var connectDB = require('./db.js');
var s3 = require('./s3.js');
var cors = require('cors');

connectDB();

var app = express();

var corsOptions = {
	origin: "*",
	optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const usersRouter = require('./routes/users');
const tabsRouter = require('./routes/tabs');
const tasksRouter = require('./routes/tasks');
const RootRouter = require('./routes/index');
const faviconRouter = require('./routes/favicon');

// routes
app.use('/users', usersRouter);
app.use('/tabs', tabsRouter);
app.use('/tasks', tasksRouter);
app.use('/favicon', faviconRouter);

// root route, displays hello world
app.use('/', RootRouter);

app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {}
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


//Using the router in main application



app.listen(process.env.PORT, () => {
    console.log(`Server listening at http://localhost:${process.env.PORT}`);
});



module.exports = app;