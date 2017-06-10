app.controller('nav', function ($rootScope,$scope,$state,auth) {
	$rootScope.history = {'states':[],'isPreviousState':false};
	$scope.logout = function(){
		auth.logOut();
	}
	$scope.back = function(){
		$rootScope.history.isPreviousState=true;     
		$state.go($rootScope.history.states.pop());
	}
})