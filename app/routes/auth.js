var express = require('express')
var router  = express.Router()
var jwt = require('jsonwebtoken')
var config = require('../config')
var model   = require('../models/auth')

router.post('/login', function (req,res) {
	model.login(req.body, function(err,result){
		if(err)
			sendResponse(err.message,err,false,res);
		else
			sendResponse(result.message,false,result.data,res);
	})
})

module.exports = router