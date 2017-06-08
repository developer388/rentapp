app.service('adminSrvc',function ($http,$cookies) {
	var user = null;
	this.addLogin = function(data){
		return $http({
			'url'    : 'api/admin/user',
			'method' : 'POST',
			'data'   : data
		});
	}

	this.getUserList = function(data){
		return $http({
			'url'    : 'api/admin/user',
			'method' : 'GET'
		});
	}

	this.getUserBills = function(data){
		return $http({
			'url'    : 'api/admin/bill/?email='+data.email,
			'method' : 'GET'
		});
	}

	this.saveBillPricing = function(data){
		return $http({
			'url'    : 'api/admin/bill/config',
			'method' : 'POST',
			'data'   : data
		});
	}

	this.generateNewBill = function(data){
		return $http({
			'url'    : 'api/admin/bill',
			'method' : 'POST',
			'data'   : data
		});
	}

	this.changeBillStatus = function(data){
		return $http({
			'url'    : 'api/admin/bill/status',
			'method' : 'PUT',
			'data'   : data
		});
	}

	this.setUserData = function(data){
		user = data;
		$cookies.putObject('userinfo',data);
	}

	this.getUserData = function(){
		if(user==null)
			return $cookies.getObject('userinfo');
	    else
	    	return user;
	}


});