var env='production'
var config ={
	local :{
		db :{
		     connection_string : 'mongodb://localhost:27017/rentapp'
		  },
		app:{
			port:8080,
			authsecret : 'nickhil388@hotmail'
		}	
	},

	production :{
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