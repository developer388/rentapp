var env='local'
var config ={
	local :{
		db :{
		  connection_string : 'mongodb://rentapp:quickstart@ds115712.mlab.com:15712/heroku_rhhb4652'
		},
		app:{
			port:8080,
			authsecret : 'nickhil388@hotmail'
		}	
	}
	


}

module.exports = config[env]