app.controller('account',function ($scope,$rootScope,$state,$cookies,accountSrvc){
 
 var user = JSON.parse(atob(($cookies.getObject('private').token).split('.')[1]));
 $scope.userinfo = {
 	'data':{
	 	'name' : user.name,
	 	'email': user.email
	  }
 };

 $scope.password = {
 	'data':{
 		'current' : '',
		'new'     : '',		 
		'confirm' : ''
    }
 };

 $scope.userinfo.save = function(){
 	accountSrvc.updateInfo($scope.userinfo.data).success(function(res){
 		Materialize.toast(res.message, 4000)
 	})
 }

$scope.password.save = function(){
 	if($scope.password.data.new!=$scope.password.data.confirm){
 		Materialize.toast("New password and confirm password do not match.", 4000)
 		return false;
 	}

 	var data = {
 		'current_password' : $scope.password.data.current,
 		'new_password'     : $scope.password.data.new, 			
 	}
 	
 	accountSrvc.changePassword(data).success(function(res){
 		Materialize.toast(res.message, 4000)
 	})
 } 

});