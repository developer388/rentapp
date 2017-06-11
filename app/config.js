var env='local'
var config ={
	local :{
		db :{
		     connection_string : 'mongodb://localhost:27017/rentapp',
		     username:'',
		     password:''
		  },
		app:{
			port:8080,
			authsecret : 'nickhil388@hotmail'
		}	
	},

	production :{
		db :{
            connection_string : 'mongodb://ds115712.mlab.com:15712/heroku_rhhb4652',
            username:'rentapp',
		    password:'quickstart'
		},
		app:{
			port: process.env.PORT||8080,
			authsecret : 'nickhil388@hotmail'
		}	
	}
	


}

module.exports = config[env]