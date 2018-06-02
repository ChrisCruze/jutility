//parse the float to two decimals
function parse_float_datatable_format(td, cellData, rowData, row, col) {
  r = parseFloat(cellData)||0
  r = r.toFixed(2)
  $(td).html(r)
}


//format the datatables date with the date and time
function date_time_datatable_format(td, cellData, rowData, row, col) {
  date_format = moment(cellData).format("MM/DD/YY hh:mmA (dd)");
  $(td).attr('title',moment(cellData).fromNow())
  $(td).html(date_format);
}


//simple datatable from array 
function data_table_simple(array,div_id){
  key_names = Object.keys(array[0])
  columns_list = []
  key_names.forEach(function(i){
    columns_list.push({data:i,title:i,name:i})
  })
  div_id = div_id || "#table"
  return $(div_id).DataTable({
  paging: false,
  dom: '<"html5buttons"B>lTfgitp',
  data: array,
  columns:columns_list,
  select: true,
  colReorder: true,
  buttons: [
    { extend: "excel", title: document.title },
    { extend: "colvis", title: document.title }
  ],
  order: [3, "desc"]
});

}

//when you click on row, it changes the value
function clickable_change_value(table_id,editor,){
  table_id = table_id||"#table"
  $(table_id).on("click", "tbody td", function(e) {
  var table = $(table_id).DataTable();
  row_data = table.row(this).data();
  if (row_data.status == 'Green'){
    change_value = 'Red'
  }
  else {
    change_value = 'Green'
  }
  row_data['status'] = change_value
  editor
    .edit(this, false)
    .set("status", change_value)
    .submit();
    status_format(this, row_data.name, row_data, 1, 1)
});
}


//update label of status of rag (created: 5/28/18)
function status_format_datatables(td, cellData, rowData, row, col){
    if (rowData.status == 'Green'){
      html_result = '<span class="label label-primary" style="min-width: 55px ;display: inline-block">'+cellData+'</span>'
    }
    else if (rowData.status  == 'Amber'){
      html_result = '<span class="label label-warning" style="min-width: 55px ;display: inline-block">'+cellData+'</span>'
    }
    else if (rowData.status  == 'Red'){
      html_result = '<span class="label label-danger" style="min-width: 55px ;display: inline-block">'+cellData+'</span>'
    }
    else if (rowData.status  == 'Red'){
      html_result = '<span class="label label-danger" style="min-width: 55px ;display: inline-block">'+cellData+'</span>'
    }
    else {
      html_result = '<span class="label" style="min-width: 55px ;display: inline-block">'+cellData  +'</span>'
    }
    $(td).html(html_result)
}

//convenience function for custom fields
function editor_fields_array_from_custom_fields(custom_fields){
  l = []
  custom_fields.forEach(function(custom_field){
    new_dictionary = { label: custom_field + ":", name: custom_field }
    l.push(new_dictionary)
  })
  return l 
}



//this should go at top of datatables
function sort_by_unix_datatabes(){
	$.fn.dataTable.ext.type.order["date-format-moment-pre"] = function(d) {
	  r = moment(d).utc();
	  return r;
	};
}

//based on filter from table , update a funciton
function callback_function_sum_datatables(variable_name){
  var api = this.api();
  variable_name = api.column(variable_name+":name", {page:'current'} ).data().sum()
  return api 
}
//format the datatables date with the date
function date_format_with_day(td, cellData, rowData, row, col) {
  date_format = moment(cellData).format("MM/DD/YY (dd)");
  $(td).html(date_format);
}

//format the date as its created
function date_format_created_moment_datatables(td, cellData, rowData, row, col) {
  date_format = moment(cellData).format("MMM-YYYY");
  $(td).html(date_format);
}


function editor_initiate(table_id,fields_list){
	fields_list == fields_list|| [{label: "Custom Field:",name: "custom_field"}]
	editor = new $.fn.dataTable.Editor( {
      table: table_id,
      fields:fields_list
 	 });
	return editor

}
//process the response from the psot submit
function editor_post_submit_function_datatables(func){
	editor.on( 'postSubmit', function (e, json, data, action, xhr) {
	    json_array = json.data
	    json_array.forEach(function(D){
	    	func(D)
	    })
  	});
}

function datatables_initiate_render(table_div_id,columns_list){
	table_example = $(table_div_id).DataTable({
    paging:false,
    dom: '<"html5buttons"B>lTfgitp',
    data: input_data,
    columns:columns_list,
    // columns: [
    //   {data:'account_name',title:'Account Name',name:'Account Name',visible:true},
    //   {data:'amount',title:'Amount',name:'Amount',visible:true},
    //   {data:'category',title:'Category',name:'Category',visible:true},
    //   {data:'date',title:'Date',name:'Date',visible:true,type: "date-format-moment"},
    //   {data:'month',title:'Month',name:'month',visible:true},
    //   {data:'description',title:'Description',name:'Description',visible:true},
    //   {data:'labels',title:'Labels',name:'Labels',visible:false},
    //   {data:'notes',title:'Notes',name:'Notes',visible:false},
    //   {data:'original_description',title:'Original Description',name:'Original Description',visible:false},
    //   {data:'transaction_type',title:'Transaction Type',name:'Transaction Type',visible:true}

    // ],
    select: true,
    colReorder: true,
    drawCallback: callback_function,
    buttons: [
      {extend: 'excel', title: document.title},
      {extend: 'colvis', title: document.title},
      { extend: "create", editor: editor },
      { extend: "edit",   editor: editor },
      { extend: "remove", editor: editor }
    ]
  });
}