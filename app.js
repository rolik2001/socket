import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import hbs from 'hbs';
import mongoose from 'mongoose';
import bluebird from 'bluebird';
// import {timer} from './timer.js';
import {timers} from './timers.js';
import {socket} from './socket.js'

//timer
// timer();
timers();


//socket
socket();



import routes from './routes/index';
import cabinet from './routes/cabinet';


const app = express();

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));
// app.use(require('express-session')({
//     key: 'session',
//     secret: 'SUPER SECRET SECRET',
//     store: require('mongoose-session')(mongoose)
// }));

app.use('/', routes);
app.use('/cabinet', cabinet)


/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    // var err = res.render("main");
    // err.status = 404;
    res.render('index')
});


// Connect to mongoDB
// mongoose.Promise = bluebird;
// mongoose.connect('mongodb://nik:password@ds131729.mlab.com', function(err) {
//     if (err) throw err;
//     console.log("Connect is success")
// });


module.exports = app;
