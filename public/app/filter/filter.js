app.filter('convertdate', function () {
	return function(timestamp){
		var dt = new Date(timestamp)
		return (dt.getDate() + "/") + (dt.getMonth()+1) + ("/" + dt.getFullYear());
	}	
})

app.filter('activestatus', function () {
	return function(status){
		if(status)
			return 'Active'
		else
			return 'Inactive'
	}	
})

app.filter('verifiedstatus', function () {
	return function(status){
		if(status)
			return 'Verified'
		else
			return 'Pending'
	}	
})

window.formatDate = function(dateString){
   var d = new Date(dateString)
   return (d.getDate() + "/") + (d.getMonth()+1) + ("/" + d.getFullYear());
}





