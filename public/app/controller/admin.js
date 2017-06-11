app.controller('admin',function ($scope,$rootScope,$state,$stateParams,$filter,adminSrvc) {
//	console.log('admin controller loaded');
	$scope.newUserInfo
	$scope.userList = []
	$scope.newUserPricing = {};
	$scope.newBillIsSaved = false;
	var newBill = null;
	$scope.updateStatus = {value:''};
	
	$scope.addLogin = function(){
		if($scope.newUserInfo.cpassword!=$scope.newUserInfo.password){
			Materialize.toast('New password and confirm password do not match.', 4000);
		    return false;
		}
		
		adminSrvc.addLogin($scope.newUserInfo).success(function(res){
			if(res.success)
			   $scope.newUserInfo={};
			
			Materialize.toast(res.message, 4000);
			
		})	
	}

	function getUserList(){
		adminSrvc.getUserList().success(function(res){
			$scope.userList = res.data;
		})
	}
	getUserList();


	$scope.viewBillDetails  = function(emailID,userOb){
		
	    $scope.user = userOb;
		adminSrvc.getUserBills({'email':emailID}).success(function(res){
				if(!res.success){
					Materialize.toast(res.message, 4000)
					if(!res.error.pricing)
						{
							Materialize.toast('Set pricing for this user.', 4000)
							 $('#modal1').modal('open');
						}
				}
				else
				{  
					adminSrvc.setUserData($scope.user);
					$state.go('userbills');
				}
		})
	}

	$scope.addUserPricing = function(){
		$scope.newUserPricing.email = $scope.user.email;
		adminSrvc.saveBillPricing($scope.newUserPricing).success(function(res){
			if(res.success)
				Materialize.toast(res.message, 4000)
			else
				Materialize.toast(res.message, 4000)
		})
	}

	

	if($state.current.name == 'userbills'){	
		$scope.userbills      = {};
		$scope.userbills.view = {};
		$scope.userbills.view.showBillList  = true;
		$scope.userbills.view.newBill1      = false;
		$scope.userbills.view.newBill2      = false;
	    $scope.userbills.useStandardPricing = true;
		$scope.userbills.newbill;
		$scope.userbills.newbill;
			

	    $scope.user = adminSrvc.getUserData();
		adminSrvc.getUserBills({'email': $scope.user.email}).success(function(res){
			if(!res.success)
			  Materialize.toast(res.message, 4000)
			else{
			  $scope.userbills.data = res.data;
			  $scope.userbills.newbill = JSON.parse(JSON.stringify($scope.userbills.data.pricing));
			  $scope.userbills.newbill.generated_on = new Date();
			}
			
		})

	}
	$scope.generateUserBill = function(){
		$scope.userbills.view.showBillList=false;
		$scope.userbills.view.newBill1=true;
		// $('#billData').modal('open');
	}
	$scope.initNewBillData=function(){
		$scope.userbills.view.newBill1=false;
		$scope.userbills.view.newBill2=true;
		$scope.userbills.newbill.elec_units_consumed =  Math.round(($scope.userbills.newbill.elec_new_reading-$scope.userbills.newbill.elec_last_reading));
		$scope.userbills.newbill.electricity_bill =  Math.round($scope.userbills.newbill.elec_units_consumed*$scope.userbills.newbill.elec_unit_charge);
		$scope.userbills.newbill.total_bill =  Math.round($scope.userbills.newbill.house_rent+$scope.userbills.newbill.electricity_bill+$scope.userbills.newbill.water_charge + ($scope.userbills.newbill.other_charge_applied? $scope.userbills.newbill.other_charge: 0));
		
		newBill = JSON.parse(JSON.stringify($scope.userbills.newbill));
		newBill.email = $scope.userbills.data.email;
		newBill.bill_ed_dt = new Date(newBill.bill_ed_dt).getTime();
		newBill.bill_st_dt = new Date(newBill.bill_st_dt).getTime();
		newBill.elec_last_reading_dt = new Date(newBill.elec_last_reading_dt).getTime();
		newBill.elec_new_reading_dt = new Date(newBill.elec_new_reading_dt).getTime();
		console.log(newBill)
	}

	$scope.generateNewBill = function(){
		adminSrvc.generateNewBill(newBill).success(function(response){
			console.log(response)
			if(response.success){
				Materialize.toast(response.message, 4000)
				$scope.newBillIsSaved = true;
			}
			else
				Materialize.toast("Server Error", 4000)
		});
	}
	
	$scope.updateStatus.init =  function(bill_id,index){
		$scope.updateStatus.bill_id = bill_id;
		$scope.updateStatus.obIndex = index;
		$('#update-status').modal('open');
	}	

	$scope.updateStatus.save =  function(){
		adminSrvc.changeBillStatus({
			'status':$scope.updateStatus.value,
			'bill_id':$scope.updateStatus.bill_id,
			
		}).success(function(response){			
			$('#update-status').modal('close');
			$scope.userbills.data.bills[$scope.updateStatus.obIndex].status = $scope.updateStatus.value;
		})
	}	


	$scope.downloadBill = function(billInfo){

	  var bill = {
			'name' : $scope.user.name,
			'date'       : ''+$filter('convertdate')(billInfo["generated_on"]),
			'start_date' : ''+$filter('convertdate')(billInfo["bill_st_dt"]),
			'end_date'   : ''+$filter('convertdate')(billInfo["bill_ed_dt"]),
			'house_rent' : ''+billInfo["house_rent"],
			'elec_st_dt' : ''+$filter('convertdate')(billInfo["elec_new_reading_dt"]),
			'elec_ed_dt' : ''+$filter('convertdate')(billInfo["elec_last_reading_dt"]),
			'elec_last_reading'   : ''+billInfo["elec_last_reading"],
			'elec_new_reading'    : ''+billInfo["elec_new_reading"],
			'elec_unit_charge'    : ''+billInfo["elec_unit_charge"],
			'elec_units_consumed' : ''+billInfo["elec_units_consumed"],
			'electricity_bill'    : ''+billInfo["electricity_bill"],
			'water_charge'        : ''+billInfo["water_charge"],
			'other_charge_applied':    billInfo["other_charge_applied"],
			'total_bill'          : ''+billInfo["total_bill"]

		};
		if(billInfo["other_charge_applied"]){
			bill["other_charge"] = ''+billInfo["other_charge"];
			bill["other_charge_comment"] = billInfo["other_charge_comment"];
		}
		
		generatePDF(bill);
	}

});