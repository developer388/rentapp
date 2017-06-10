var async   = require('async')
var jwt = require('jsonwebtoken');
var config = require('../config')
var login = require('../schemas/login')

module.exports = {

	login : function(reqObject,callback){
		var userlogin = {};

		userlogin.validateRequestArgs = function(cb){
			result = validateRequestObject(reqObject, ['email','password']);
			if(result!=true)
				cb({message:'Validation failed',values:result},null);
			else
				cb(null,true);
		}

		userlogin.doLogin = function(cb){
			login.find({'email' :reqObject.email}, function(err,result){			
				if(err)
					cb({message:'DB Error'},null)
				else{
					if(result[0]){
					  if(result[0].password==reqObject.password)
					    {
					    	if(result[0].verified&&result[0].active){
					    		var token =  jwt.sign({ 'name' :result[0].name,'email':result[0].email, 'type':result[0].type},config.app.authsecret);
					    		cb(null,{message :'login success', data: {'token':token}});
					    	}
					    	else
								cb({message:'account inactive'},null)
						}
					   else
					   	cb({message:'Incorrect email or password.'},null)
					}	
					else
					   cb({message:'Account does not exists'},null)
				}
			});
		}

		async.series(userlogin,function(error,result){
			if(error)
				callback(error,null)
			else
				callback(null,result.doLogin)
		});
	}
}