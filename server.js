var express = require('express');
var body_parser = require('body-parser');
var cluster = require('cluster'); 
var mongoose = require('mongoose')
var config = require('./app/config');
var utils = require('./app/utils');
var auth = require('./app/routes/auth')
var admin = require('./app/routes/admin')
var user = require('./app/routes/user');
mongoose.connect(config.db.connection_string,
{
  db: { native_parser: true },
  user: config.db.username,
  pass: config.db.password
 });


if (cluster.isMaster) { 
	var cpu_cores = require('os').cpus().length
    var i=0;
    for (i=0; i<cpu_cores; i++)
    cluster.fork();
 	console.log('Master process with id '+process.pid+' has forked '+i+' workers.');   
} else {
	var app = express();
	app.use(express.static(__dirname + '/public'));
	app.use(body_parser.json());
	app.use(body_parser.urlencoded({extended:true})); 
	// app.use(function(req,res,next){
	// 	console.log('request handled by '+process.pid);
	// 	next();
	// })
	app.use('/api/auth',auth);
	app.use('/api/admin', admin);
	app.use('/api/user', user);

	app.listen(config.app.port,function () {
		console.log('Worker '+process.pid+' listening on port :'+config.app.port);
	});
}


