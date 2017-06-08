var express = require('express')
var router  = express.Router()
var jwt = require('jsonwebtoken');
var config = require('../config')
var model   = require('../models/admin')

router.use(function(req,res,next){
	if(req.headers.token){
	    var userdata;
	    jwt.verify(req.headers.token, config.app.authsecret, function(err, userdata) {
		     	if(err)
		     		sendResponse('Invalid token',{'message':'Invalid Token'},false,res);
		     	else{
		     		if(userdata.type=='admin'){
							req.userdata = userdata;
							next()
						}
					else
						sendResponse('Authentication failed',{'message':'Authentication failed'},false,res);
		     	}
		});
		
	}else
	  sendResponse('token not found',{'message':'token not found'},false,res);
})

router.get('/user', function(req,res){
	model.getAllUsers({}, function(err,result){
		sendResponse(result.message,false,result.data,res);
	})
})

router.post('/user', function(req,res){
	model.createUserLogin(req.body, function(err,result){
		if(err)
			sendResponse(err.message,err,false,res);
		else
			sendResponse(result.message,false,result,res);
	})
})



router.post('/bill/config', function(req,res){
	model.addBillConfig(req.body, function(err,result){
		if(err)
			sendResponse(err.message,err,false,res);
		else
			sendResponse(result.message,false,result.data,res);
	})
})

router.get('/bill/', function(req,res){
	model.getUserBills(req.query, function(err,result){
		if(err)
			sendResponse(err.message,err,false,res);
		else
			sendResponse(result.message,false,result.data,res);
	})
})

router.post('/bill/', function(req,res){
	model.generateBill(req.body, function(err,result){
		if(err)
			sendResponse(err.message,err,false,res);
		else
			sendResponse(result.message,false,result.data,res);
	})
})

router.put('/bill/status', function(req,res){
	model.changeBillStatus(req.body, function(err,result){
		if(err)
			sendResponse(err.message,err,false,res);
		else
			sendResponse(result.message,false,result.data,res);
	})
})

router.put('/info', function (req,res) {
	model.updateAccountInfo(req, function(err,result){
		if(err)
			sendResponse(err.message,err,false,res);
		else
			sendResponse(result.message,false,result.data,res);
	})
})

router.put('/password', function (req,res) {
	model.changePassword(req, function(err,result){
		if(err)
			sendResponse(err.message,err,false,res);
		else
			sendResponse(result.message,false,result.data,res);
	})
})

module.exports = router;
