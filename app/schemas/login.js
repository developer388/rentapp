var mongoose = require('mongoose'); 
var Login = mongoose.Schema({
	
	name		:       { type: String },
	email		: 		{ type: String },
	password	: 		{ type: String },
	type        :       { type: String },
	verified	:       { type: Boolean},
	active      :       { type: Boolean},
	created_on  :       { type: Number },     
	last_login  :   	{ type: Number }
	
});
module.exports = mongoose.model('login',Login);
