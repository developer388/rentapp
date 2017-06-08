var express = require('express');
var body_parser = require('body-parser');
var mongoose = require('mongoose')
var config = require('./app/config');
var utils = require('./app/utils');
var auth = require('./app/routes/auth')
var admin = require('./app/routes/admin')
var user = require('./app/routes/user');
var app = express();

mongoose.connect(config.db.connection_string, function(err){
	console.log(err);
});
app.use(express.static(__dirname + '/public'));
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended:true})); 

app.use('/api/auth',auth);
app.use('/api/admin', admin);
app.use('/api/user', user);

app.listen(process.env.PORT|| config.app.port,function () {
	console.log('Server started on port :'+config.app.port);
});