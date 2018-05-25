
//click on a button
function div_click_jquery(ref_id){
	$(ref_id).click();
}

//press enter when clicked
function enter_press_down_jquery(ref_id){
$(ref_id).keypress(function (e) {
 var key = e.which;
 if(key == 13)  // the enter key code
  {run_function()
  }
});  


}

//function that uses jquery to run a function from a click
function update_from_click_jquery(div_id){
	div_id = div_id||".cell-value"
	$(div_id).on('click', function (e) { $(this)})
}

//get the td jquery objects from a table based on a table id
function table_jquery_objects(table_id){
	list_of_lists = []
	$("#"+table_id+" tr").each(function(row_number) {
	  row_list = []
	  col_values = Object.values($(this).find('td'))
	  if (col_values.length > 0){
	  col_values.forEach(function(col_val,col_number){
	  	col_val['row_number'] = row_number
	  	col_val['col_number'] = col_number
	    row_list.push(col_val)
	  })
	  list_of_lists.push(row_list)
	  }
	});
}
