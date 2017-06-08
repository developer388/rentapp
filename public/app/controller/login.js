app.controller('login',function ($rootScope,$scope,$state,$location,auth) {
	$scope.errormsg = '';
	
	if($rootScope.user)
		if($rootScope.user.isAuthenticated)
				$state.go('admindashboard');
		

	$scope.doLogin = function(){
		auth.doLogin($scope.user).then(function(res){
			if(!res.data.success)
				$scope.errormsg = res.data.message;
			else {
				var token = res.data.data.token;
				var usertype = auth.saveToken(token);
				if(usertype=='user')
					$state.go('userdashboard');
				else
					$state.go('admindashboard');
			}	
	   });
	}
	
	

});