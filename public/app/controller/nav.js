app.controller('nav', function ($rootScope,$scope,auth) {
	
	$rootScope.$on('loginSuccess', function(userdata){
		console.log(userdata.targetScope.user);
	})
	$scope.logout = function(){
		auth.logOut();
	}
})