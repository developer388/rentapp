var async   = require('async')
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var config = require('../config')
var login = require('../schemas/login')
var bill = require('../schemas/bill')

module.exports = {
	getAllUsers : function (data, cb) {
		login.find({'type':'user'},{ '_id': 0,'password':0,'__v':0 }, function(err,result){			
			cb(null,{'message':'all users login data','data':result});
		});
	},

	createUserLogin : function(reqObject,cb){
		var createLogin = {};

		createLogin.validateRequestArgs = function(cb){
			result = validateRequestObject(reqObject, ['name','email','password','type']);
			if(result!=true)
				cb({message:'Validation failed',values:result},null);
			else
				cb(null,true);
		}

		createLogin.checkEmail = function(cb){
			login.find({'email':reqObject.email}, function(err, result){
				if(err)
				  cb({message:'DB Error'},null);
				else{
			 	 	 if(result.length!=0)
			 	 	    cb({message:'Email already exists'},null);
			 	 	 else
			 	 	   cb(null,true);			 	 	 	
				 }
			});
		}
		createLogin.saveData = function(cb){

			var logindata = {
			    name  		:       reqObject.name,		
				email		: 		reqObject.email,
				password	: 		reqObject.password,
				type        :       reqObject.type,
				verified    :       true,
				active      :       true,
				created_on  :       new Date().getTime(),
				last_login 	: 		new Date().getTime()
			};
			var newlogin = new login(logindata);
			newlogin.save(function(err){
				if(err)
					cb({message:'DB Error'},null)
				else
					cb(null,{message :'Account created successfully.'});	
			})
		}
		async.series(createLogin,function(error,result){
			
			if(error)
				cb(error,null)
			else
				cb(null,result.saveData)
		});
	},

	adminLogin : function(reqObject,callback){
		var adminLogin = {};

		adminLogin.validateRequestArgs = function(cb){
			result = validateRequestObject(reqObject, ['email','password']);
			if(result!=true)
				cb({message:'Validation failed',values:result},null);
			else
				cb(null,true);
		}

		adminLogin.doLogin = function(cb){
			login.find({'email' :reqObject.email}, function(err,result){			
				if(err)
					cb({message:'DB Error'},null)
				else{
					if(result[0]){
					  if(result[0].password==reqObject.password)
					    {
					    	if(result[0].verified&&result[0].active){
					    		var token =  jwt.sign({'name' :result[0].email, 'email':result[0].email, 'type':result[0].type},config.app.authsecret);
					    		cb(null,{message :'login success', data: {'token':token}});
					    	}
					    	else
								cb({message:'account inactive'},null)
						}
					   else
					   	cb({message:'incorrect password'},null)
					}	
					else
					   cb({message:'account does not exists'},null)
				}
			});
		}

		async.series(adminLogin,function(error,result){
			if(error)
				callback(error,null)
			else
				callback(null,result.doLogin)
		});
	},

	addBillConfig : function(reqObject,callback){
		
		var saveBillConfig = {};

		saveBillConfig.validateRequestArgs = function(cb){
			result = validateRequestObject(reqObject, ['email','house_rent','elec_unit_charge','water_charge']);
			if(result!=true)
				cb({message:'Validation failed',values:result},null);
			else
				cb(null,true);
		}

		saveBillConfig.savePricing = function(cb){
				var pricings = {
					 'email'    : reqObject.email,					 
					 'pricing'  : {
					 	'house_rent' 		 : reqObject.house_rent,
					 	'elec_unit_charge'   : reqObject.elec_unit_charge,
					 	'water_charge'       : reqObject.water_charge
					 },
					 'bills' : []	
				}

				var b = new bill(pricings)
				b.save(function(err, res){
					if(err)
					 cb({message:'DB Error'},null)
					else
					 cb(null,{message :'Pricing added successfully.',data:{}});
				})
		}

		async.series(saveBillConfig, function(error,result){
			if(error)
				callback(error,null)
			else
				callback(null,result.savePricing)
		})
		
	},

	getUserBills : function(reqObject,callback){
		var billing = {};

		billing.validateRequestArgs = function(cb){
			result = validateRequestObject(reqObject, ['email']);
			if(result!=true)
				cb({message:'Validation failed',values:result},null);
			else
				cb(null,true);
		},

		billing.checkLogin = function(cb){
			login.find({'email':reqObject.email}, function(err,result){
				if(err)
					cb({message:'DB Error'},null)
				else{
					if(result.length==1)
						cb(null,true);
					else
						cb({message:'User does not exists','login':false},null);
				}
			})
		}

		billing.getBillData = function(cb){
			bill.find({'email':reqObject.email},{ '_id': 0,'__v':0 }, function(err, result){
				if(err)
					cb({message:'DB Error'},null)
				else{
					if(result.length!=0)
						cb(null,{message :'bill data', data: result[0]});
					else
						cb({message :'Pricing not set for this user.','pricing':false}, null);
				}
			})
		}

		async.series(billing, function(error, result){
			if(error)
				callback(error,null)
			else
				callback(null,result.getBillData)
		})
	},


	generateBill : function(reqObject, callback){
	//	gmail.com'},{$push:{'bills':{'amt':3000}}})
	
		var generateNewBill = {};

		generateNewBill.validateRequestArgs = function(cb){
			result = validateRequestObject(reqObject, ['house_rent','elec_unit_charge','water_charge','generated_on','bill_st_dt','bill_ed_dt','elec_last_reading','elec_new_reading','elec_new_reading_dt','elec_last_reading_dt','elec_units_consumed', 'electricity_bill', 'total_bill']);
			if(result!=true)
				cb({message:'Validation failed',values:result},null);
			else
				cb(null,true);
		},
		generateNewBill.save = function(cb){
			reqObject.generated_on = new Date().getTime()
			reqObject.status = 'NEW'	
			bill.update({'email':reqObject.email}, {$push:{'bills':reqObject}}, function(err,res){
				if(err)
					cb({message:'DB Error'},null)
				else
				    cb(null,{message :'Bill generated.',data:{}});
			})
		}
		async.series(generateNewBill,function(error,result){
			if(error)
				callback(error,null)
			else
				callback(null,result.save)
		})		
	},

	changeBillStatus : function(reqObject, callback){
		
		var updateStatus = {};

		updateStatus.validateRequestArgs = function(cb){
			result = validateRequestObject(reqObject, ['bill_id','status']);
			if(result!=true)
				cb({message:'Validation failed',values:result},null);
			else
				cb(null,true);
		},

		updateStatus.save = function(cb){

			bill.update({'bills._id': mongoose.Types.ObjectId(reqObject.bill_id)},{$set:{'bills.$.status':reqObject.status}}, function(err, res){
			   if(err)
			   	cb({message:'DB Error'},null)
			   else
			    cb(null,{message :'Status updated.',data:{}})
			});
		}

		async.series(updateStatus,function(error,result){
			if(error)
				callback(error,null)
			else
				callback(null,result.save)
		})
	},

	changePassword : function(reqObject, callback) {
			
		var changeAccPassword = {};

		changeAccPassword.validateRequestArgs = function(cb){
			result = validateRequestObject(reqObject.body, ['current_password','new_password']);
			if(result!=true)
				cb({message:'Validation failed',values:result},null);
			else
				cb(null,true);
		}
		changeAccPassword.authenticate = function(cb){
			login.find({'email': reqObject.userdata.email}, function(err,res) {
			  if(err)
			   	cb({message:'DB Error'},null)
			  else{ 
			  	if(res[0].password==reqObject.body.current_password)
			  	  cb(null,true)
			  	else
			  	  cb({message:'Current password is incorrect.'},null)
			  }
			})
		}

		changeAccPassword.save = function(cb){	
			login.update({'email': reqObject.userdata.email},{$set:{'password':reqObject.body.new_password}}, function(err,res){
			   if(err)
			   	cb({message:'DB Error'},null)
			   else
			    cb(null,{message :'Password updated.',data:{}})
			})
		}

		async.series(changeAccPassword,function(error,result){
			if(error)
				callback(error,null)
			else
				callback(null,result.save)
		})

	},

    updateAccountInfo: function(reqObject,callback) {
   		var changeAccInfo = {};

		changeAccInfo.validateRequestArgs = function(cb){
			result = validateRequestObject(reqObject.body, ['name','email']);
			if(result!=true)
				cb({message:'Validation failed',values:result},null);
			else
				cb(null,true);
		}

		changeAccInfo.save = function(cb){	
			login.update({'email': reqObject.userdata.email},{$set:{'name':reqObject.body.name,'email':reqObject.body.email}}, function(err,res){
			   if(err)
			   	cb({message:'DB Error'},null)
			   else
			    cb(null,{message :'Account info updated.',data:{}})
			})
		}

		async.series(changeAccInfo,function(error,result){
			if(error)
				callback(error,null)
			else
				callback(null,result.save)
		})
    }


}