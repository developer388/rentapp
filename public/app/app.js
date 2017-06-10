var app = angular.module('app',['ui.router','ngCookies']);

app.config(function ($stateProvider,$urlRouterProvider,$httpProvider) {
		
		$stateProvider			
		.state('login',{	
		    url: '/login',
		    controller:'login',
			templateUrl: 'app/templates/admin/login.html'	
		})
		.state('account',{	
		    url: '/account',
		    controller:'account',
			templateUrl: 'app/templates/admin/account.html'	
		})
		.state('admindashboard',{	
		    url: '/admin/dashboard',
			templateUrl: 'app/templates/admin/dashboard.html'	
		})
		.state('adduser',{	
		    url: '/admin/add/login',
		    controller : 'admin',
			templateUrl: 'app/templates/admin/adduserlogin.html'	
		})
		.state('userconfig',{	
		    url: '/admin/add/login',
		    controller : 'admin',
			templateUrl: 'app/templates/admin/adduserconfig.html'	
		})
		.state('userlist',{	
		    url: '/admin/users',
		    controller : 'admin',
			templateUrl: 'app/templates/admin/userlist.html'	
		})
		.state('userbills',{	
			url        : '/admin/user/bills',
		 	controller : 'admin',
	   	    templateUrl: 'app/templates/admin/userBill.html'
		})

		$httpProvider.interceptors.push(function($location,$cookies) {
            return {
                'request': function (config) {  
                    config.headers = config.headers || {};           
                    if ($cookies.getObject('private')) {
                        config.headers.token = $cookies.getObject('private').token;
                    }
                    return config;
                }
            };
        });
     

     $urlRouterProvider.otherwise(function($injector) {
    	var $state = $injector.get('$state');
    	$state.go('login');
	 });
});

app.run(function($rootScope,$state,$transitions,auth){

    $transitions.onStart({}, function(trans) {
	    if (!auth.isUserAuthenticated())
	      $state.go('login');
	    else{	      
      	    if((trans._treeChanges.exiting.length)&&(trans._treeChanges.exiting[0].state.name!='login')&&(!$rootScope.history.isPreviousState))
        	 $rootScope.history.states.push(trans._treeChanges.exiting[0].state.name);
        	else
        	$rootScope.history.isPreviousState=false;
	    }
	});

    $transitions.onExit({}, function(trans) {
    //	console.log($state)
       
    })

	$rootScope.$on('logOut',function(status){
		$state.go('login');
	})
})

