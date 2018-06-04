//get the td jquery objects from a table based on a table id
function table_jquery_objects_to_array(table_id){
	list_of_lists = []
	$("#"+table_id+" tr").each(function(row_number) {
	  col_values = Object.values($(this).find('td'))
	  	if (col_values.length > 0){
	  		col_values.forEach(function(col_val,col_number){
	  			new_dictionary = {
	  				row_number: row_number,
	  				col_number: col_number,
	  				cell_value: $(col_val).text(),
	  				class_name: $(col_val).attr('class')
	  			}
	    		list_of_lists.push(new_dictionary)
	  		})
	  	}
	});
	return list_of_lists
}

//upon hovering over change the css
function style_change_upon_hover(class_name){
	class_name = class_name||'.moreBtn'

	$(class_name).hover(function(){
        $(this).css("background", "blue")
    })
}


//change text upon mouse over 
function style_change_upon_mouse_over(class_name){
	class_name = class_name||'.moreBtn'
	$(class_name).mouseover(function(){
    $(this).css({
        'color' :'red',
        //other styles
    })
});
}




//add tooltip to element
function tooltip_add_jquery(div_id,tooltip_text){
	$(div_id).attr("data-toggle","tooltip")
	$(div_id).attr("title",tooltip_text)
	$('[data-toggle="tooltip"]').tooltip(); 
}


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
	return list_of_lists
}
