var express = require('express');
var path = require('path');
var port = process.env.PORT || 2000;
var app = express();
var router = require('./routes/routes.js');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var nodemon = require('nodemon');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var configDB = require('./config/database.js');

mongoose.connect(configDB.url);
var db = mongoose.connection;

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs({extname: 'hbs'}));
app.set('view engine', 'hbs');

// Middleware
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);

app.listen(port, function(){
  console.log('immigrnt server is running on http://localhost:' + port);
})
