var env='local'
var config ={
	local :{
		db :{
		  connection_string : 'mongodb://localhost:27017/rentapp'
		},
		app:{
			port:8080,
			authsecret : 'nickhil388@hotmail'
		}	
	}
	


}

module.exports = config[env]