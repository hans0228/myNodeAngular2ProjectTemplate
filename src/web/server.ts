/// <reference path="../../typings/main.d.ts" />

import * as exp from "express";
import * as bodyParser from "body-parser";
import * as path from "path";

//import dbM = require('../../myApp.core/repositories/dbContext');
import {init} from "./_index";

var app = exp();

// view engine setup
var vash = require("vash");
app.engine("html", vash.__express);
app.set("views", path.join(__dirname, "./"));
app.set("view engine", "html");

// uncomment after placing your favicon in /public
//var favicon = require('serve-favicon');
//app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(exp.static(path.join(__dirname, "../client")));

//connect to db
// var db = new dbM.core.common.DBContext();
// db.startToConnectAsync()
//     .then((msg) => {
//         console.log(msg);
//     })
//     .fail((msg) => {
//         console.log(msg);
//     });

//router
app.all('*', (req, res, next) => {
    console.log(req.method, req.url);
    next();
});

//register controllers
init(app);

//server start
var port: number = process.env.port || 1234;
app.listen(port);

console.log("server.ts, path", __dirname);
console.log(`::${port} server start...`);


//app.use('/', routes);
//app.use('/users', users);

//// catch 404 and forward to error handler
//app.use(function (req, res, next) {
//    var err = new Error('Not Found');
//    err.status = 404;
//    next(err);
//});

//// error handlers

//// development error handler
//// will print stacktrace
//if (app.get('env') === 'development') {
//    app.use(function (err, req, res, next) {
//        res.status(err.status || 500);
//        res.render('error', {
//            message: err.message,
//            error: err
//        });
//    });
//}

//// production error handler
//// no stacktraces leaked to user
//app.use(function (err, req, res, next) {
//    res.status(err.status || 500);
//    res.render('error', {
//        message: err.message,
//        error: {}
//    });
//});


//module.exports = app;