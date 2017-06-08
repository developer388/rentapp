var mongoose = require('mongoose'); 
var bill = mongoose.Schema({

 email    : { type : String  }, 
 pricing  : {
 	house_rent 		 : { type: Number },
 	elec_unit_charge : { type: Number },
 	water_charge     : { type: Number }
 },

 bills : [{ 
 	  house_rent  	      : { type: Number },
	  elec_unit_charge	  : { type: Number },
	  water_charge  	  :	{ type: Number },
	  generated_on  	  : { type: Number },
	  bill_st_dt  		  : { type: Number },
	  bill_ed_dt	      : { type: Number },
	  elec_last_reading   : { type: Number },
	  elec_new_reading    : { type: Number },
	  elec_new_reading_dt : { type: Number },
	  elec_last_reading_dt: { type: Number },
	  other_charge_applied: { type: Boolean },
	  other_charge        : { type: Number },
	  other_charge_comment: { type: String },
	  elec_units_consumed : { type: Number },
	  electricity_bill    : { type: Number },
	  total_bill          : { type: Number },
      generated_on 	      : { type: Number },
	  paid_on             : { type: Number },
	  payment_mode   	  : { type: String },
	  status 		 	  : { type: String } 
 }]	

});
module.exports = mongoose.model('bill',bill);
