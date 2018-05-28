
//https://www.codeproject.com/Articles/1197349/Excel-files-in-Javascript-the-simple-way

// Create an Excel with system default font
function create_excel_object(){
	var excel = $JExcel.new();
	return excel                    
}

// Create an Excel with Arial 10 Font
function create_excel_object_with_formatting(format){
	format = format||"Arial 10 #333333"
	var excel = $JExcel.new(format);  // Default font is Arial 10 in RGB #333  
	return excel             
}

//Create an excel file to download
function generate_excel_download_file(excel,file_name){
	var excel = excel||$JExcel.new();
	file_name = file_name||"SampleData.xlsx"
	excel.generate(file_name);
	return excel 
}

//is used to register styles in the Excel document. It requires a style definition object which is made of up to 5 properties:
function excel_add_style(excel){
	var excel = excel||$JExcel.new();
	var excel_style= excel.addStyle ({
	  fill: "#ECECEC" ,                        // background color in #RRGGBB
	  border: "none,none,none,thin #333333",    // left border,right border,top border, bottom border
	  font: "Calibri 12 #0000AA B",          // font-name font-size font-color font-style
	  format: "yyyy.mm.dd hh:mm:ss",           // display format
	  align: "R T"                          // horizontal-align vertical-align
	});
	return excel_style
}

//define cell style and add cell value
function excel_define_cell(){
	var excel = excel||$JExcel.new();
	var excel_style = excel.addStyle({font: "Arial 10 B"});        // Define style Arial 10 bold                
	excel.set({sheet:0,col:5,row:3,value: "HELLO",style:excel_style});
}

//defines the name of the sheet
function excel_define_sheet_name(excel){
	var excel = excel||$JExcel.new();
	sheet_name = sheet_name||"Summary"
	sheet_number = sheet_number||0
	excel.set(sheet_number,undefined,undefined,sheet_name); 
	return excel 
}


