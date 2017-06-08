app.service('auth',function ($rootScope,$http,$cookies) {
	var user = {
		'isAuthenticated' : false
	};

	this.doLogin= function(data){
		return $http({
			'url'    : 'api/auth/login',
			'method' : 'POST',
			'data'   : data
		});
	},

	this.saveToken = function(token){
		$cookies.putObject('private',{'token':token});
		user = JSON.parse(atob(token.split('.')[1]));
		user.isAuthenticated = true;
		$rootScope.user = user;
		return user.type;
	}

	this.isUserAuthenticated = function(){
		if(user.isAuthenticated)
			return true;
		else{
			var prv = $cookies.getObject('private')
			if(!prv)
				return false;
			var token = $cookies.getObject('private').token;
			user = JSON.parse(atob(token.split('.')[1]));
			user.isAuthenticated = true;
			$rootScope.user = user;
			$rootScope.$broadcast('loginSuccess',user);
			return user.isAuthenticated;
		}
	}

	this.logOut = function(){
		user = {
			'isAuthenticated' : false
		}
		delete $rootScope.user;
		delete $cookies.remove('private');
		$rootScope.$broadcast('logOut',true);
	}
	
});