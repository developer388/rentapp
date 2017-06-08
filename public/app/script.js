$(document).ready(function() {
		
});


function generatePDF(bill) {
	var doc = new jsPDF();
	doc.setLineWidth(1);
	doc.rect(10, 20, 190,250,'S')
	doc.setFontSize(20);
	doc.text(90, 35, "House Rent");
	doc.setLineWidth(.5);
	doc.line(90, 36, 128, 36);
	doc.setFontSize(13);
	doc.text(13, 55, bill.name);
	doc.setFontSize(13);
	doc.text(13,64,doc.splitTextToSize("J-177A, New Palam Vihar, Phase-I,\n Gurugram, Haryana (122017)"));
	doc.setFontSize(13);
	doc.setFontStyle("bold");
	doc.setFontSize(13);
	doc.setFontStyle("bold");
	//doc.text(120, 80, "Bill No.");
	doc.setFontSize(13);
	doc.setFontStyle("normal");
	//doc.text(150, 80, bill.id);
	doc.setFontSize(13);
	doc.setFontStyle("bold");
	doc.text(120, 90, "Bill Date.");
	doc.setFontSize(13);
	doc.setFontStyle("normal");
	doc.text(150, 90, bill.date);
	doc.setFontStyle("bold");
	doc.text(13, 116, "Particular");
	doc.text(92, 116, "From");
	doc.text(123, 116, "To");
	doc.text(152, 116, "Amount Rs.");
	doc.setLineWidth(.5);
	doc.line(10, 110, 200, 110);
	doc.line(10, 120, 200, 120);
	//Period Line
	doc.line(90, 120, 90, 166);
	//Package Line
	doc.line(120, 120, 120, 166);
	//Amt Line
	doc.line(150, 120, 150, 206);
	doc.line(10, 150, 200,150);
	doc.line(10, 158, 200,158);
	doc.line(10, 166, 200,166);
	doc.line(10, 174, 200,174);
	doc.line(10, 182, 200,182);
	doc.line(10, 190, 200,190);
	doc.line(10, 198, 200,198);
	doc.line(10, 206, 200,206);
	doc.setFontStyle("normal");
	doc.text(12, 130, "House Rent");
	doc.text(92, 130,  bill.start_date);
	doc.text(123, 130, bill.end_date);
	doc.text(165, 130, bill.house_rent);
	doc.text(12, 155.5,"Electricity Bill");
	doc.text(14, 163.5,"Meter Reading");
	doc.text(14, 171.5,"Units consumed");
	doc.text(14, 179.5,"Total electricity charge");
	doc.text(12, 187.5,"Water Charge");
	doc.text(12, 195.5,"Others");
	doc.text(92,  155,   bill.elec_st_dt);
	doc.text(125, 155,   bill.elec_ed_dt);
	doc.text(92,  163.5, bill.elec_last_reading);
	doc.text(125, 163.5, bill.elec_new_reading);
	doc.text(125, 171.5, bill.elec_units_consumed);
	doc.text(125, 179.5, bill.elec_units_consumed+" X "+bill.elec_unit_charge);
	doc.text(165, 179.5, bill.electricity_bill);
	doc.text(165, 187.5, bill.water_charge);
	doc.text(165, 195.5, "0");
	doc.setFontStyle("bold");
	doc.text(136, 203.5, "Total");
	doc.text(165, 203.5, bill.total_bill);
	// doc.text(12, 240, "Due Date :");
	// doc.text(35, 240, "20/1/2017");
	// doc.text(130, 240, "Last rent paid on :");
	// doc.text(168, 240, "11/1/2017");
	// doc.text(130, 248, "Last rent due date :");
	// doc.text(170, 248, "12/2/2017");
	doc.save('RENT'+ new Date().getTime() +'.pdf');
}