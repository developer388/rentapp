global.validateRequestObject = function validate(obj,arr) {
		var isValid = true;
		var missingProp =[];
		arr.forEach(function(item){
			if(obj[item]===undefined || obj[item]===''){
				isValid = false;
				missingProp.push(item);
				return false
			}
		});
		if(isValid)
			return true
		else
			return missingProp;
}
global.sendResponse = function(message,error,data,res){
	if(error){
		delete error['message'];
		res.json({'success':false,'message':message,'error':error});
	}
	else{
		delete data['message'];
		res.json({'success':true,'message':message, 'data':data});
	}
}
