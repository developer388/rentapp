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
            connection_string : process.env.MONGODB_URI
		},
		app:{
			port:process.env.PORT,
			authsecret : 'nickhil388@hotmail'
		}	
	}
	


}

module.exports = config[env]