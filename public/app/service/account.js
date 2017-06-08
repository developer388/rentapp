app.service('accountSrvc',function ($http) {
	this.updateInfo = function(data){
		return $http({
			'url'    : 'api/admin/info',
			'method' : 'PUT',
			'data'   : data
		});
	}

	this.changePassword = function(data){
		return $http({
			'url'    : 'api/admin/password',
			'method' : 'PUT',
			'data'   : data
		});
	}


});