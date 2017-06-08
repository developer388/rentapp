var app = angular.module('app',['ui.router']);

app.config(function ($stateProvider,$urlRouterProvider) {
		
		$stateProvider			
		.state('login',{	
		    url: '/',
		    controller:'login',
			templateUrl: 'app/templates/user/login.html'	
		});
});

///angular.bootstrap(document.getElementById('app'), ['app'])