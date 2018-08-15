//get table data from datatables table
function datatables_data_get(table){
  return table.data().toArray();
}

function vote_created_cell_editor(field_name){


function vote_created_cell_core(td, cellData, rowData, row, col) {
  cellData = parseFloat(cellData)||0
  $(td).html( '<div class="vote-actions"> <a href="#" class="rank up" iterator="1" field="'+field_name+'"> <i class="fa fa-chevron-up"> </i> </a> <div>'+cellData+'</div> <a href="#" class="rank down" iterator="-1" field="'+field_name+'"> <i class="fa fa-chevron-down"> </i> </a> </div>') 




} 
return vote_created_cell_core

}


function option_select_dropdown_datatables_from_options(params){
  function option_select_dropdown_datatables(td, cellData, rowData, row, col) {
    select_div = $('<select class="selectpicker form-control" data-size="5" data-header="Select a stage" data-actions-box="true"> </select> ')
    params.options.forEach(function(option){
      is_selected = cellData == option
      select_div.append($("<option>", {"id":option,"selected":is_selected}).text(option))
    })
    //console.log(select_div)
    //select_div.selectpicker()
    master_div = $('<div class="form-group"> </div>')
    master_div.append(select_div)
    $(td).html(master_div)

   // $("#"+cellData).attr('selected',true)


    //$(td).append(master_div)
        //$('.selectpicker').selectpicker()

  }



  return option_select_dropdown_datatables
}

function vote_created_cell(td, cellData, rowData, row, col) {

  $(td).html( '<div class="vote-actions"> <a href="#" class="vote_up"> <i class="fa fa-chevron-up"> </i> </a> <div>'+cellData+'</div> <a href="#" class="vote_down"> <i class="fa fa-chevron-down"> </i> </a> </div>') 
  $('.vote_up').on('click', function (e) { 
    console.log('up')
    console.log(cellData)
    console.log(td)
    console.log(rowData)
    console.log(row)
    console.log(col)
    console.log($(this))
  })
  $('.vote_down').on('click', function (e) { 
    console.log('down')
    console.log(rowData)
    console.log($(this))
  })



    // editor
    // .edit(this, false)
    // .set("status", change_value)
    // .submit();
} 

//add bar chart within the cell
function bar_create_datatable_cell(td, cellData, rowData, row, col) {

  title_text = cellData
  id = cellData
  percentage = rowData['percentage']||50
  color = 'danger'
  parent_identifier = null
  metric_text = percentage + "%"
  $(td).html(list_progress_bar_list_element_thick(title_text,id,percentage,parent_identifier,color,metric_text));
}


//This searches and filters https://datatables.net/examples/plug-ins/range_filtering.html || https://datatables.net/manual/plug-ins/search
function datatable_search_filter(){



$.fn.dataTable.ext.search.push(
    function( settings, searchData, index, rowData, counter ) {
        var min = parseInt( $('#min').val(), 10 );
        var max = parseInt( $('#max').val(), 10 );
        var age = parseFloat( searchData[3] ) || 0; // using the data from the 4th column
  
        if ( ( isNaN( min ) && isNaN( max ) ) ||
             ( isNaN( min ) && age <= max ) ||
             ( min <= age   && isNaN( max ) ) ||
             ( min <= age   && age <= max ) )
        {
            return true;
        }
        return false;
    }
);


$.fn.dataTable.ext.search.push(
    function( settings, data, dataIndex ) {
        var min = parseInt( $('#min').val(), 10 );
        var max = parseInt( $('#max').val(), 10 );
        var age = parseFloat( data[3] ) || 0; // use data for the age column
 
        if ( ( isNaN( min ) && isNaN( max ) ) ||
             ( isNaN( min ) && age <= max ) ||
             ( min <= age   && isNaN( max ) ) ||
             ( min <= age   && age <= max ) )
        {
            return true;
        }
        return false;
    }
);
    var table = $('#example').DataTable();

        table.draw();


}




//add filterable column headers for datatables
function column_header_filterable_autocomplete_apply(table_object,number_of_columns){
  l = []
  for(var i=0; i < number_of_columns ; i++){
    l.push({column_number : i, filter_type: "auto_complete", text_data_delimiter: ","})
  }
  yadcf.init(table_object, l)

}


//add a filter to the column header of the datatable (https://cdn.rawgit.com/ChrisCruze/jutility/master/libs/jquery.dataTables.yadcf.js , https://cdn.rawgit.com/ChrisCruze/jutility/master/libs/jquery.dataTables.yadcf.css | https://github.com/vedmack/yadcf)
function header_filter_add_datatable(){

var myTable = $('#example').DataTable();
  
  yadcf.init(myTable, [
    {column_number : 0},
    {column_number : 1, filter_type: "range_number_slider", filter_container_id: "external_filter_container"},
    {column_number : 2, data: ["Yes", "No"], filter_default_label: "Select Yes/No"},
    {column_number : 3, filter_type: "auto_complete", text_data_delimiter: ","},
    {column_number : 4, column_data_type: "html", html_data_type: "text", filter_default_label: "Select tag"}]);


  table = $('#example').dataTable()
  table.yadcf([
    {column_number : 0},
      {column_number : 1,  filter_type: "range_number_slider", filter_container_id: "external_filter_container"},
      {column_number : 2, data: ["Yes", "No"], filter_default_label: "Select Yes/No"},
      {column_number : 3, text_data_delimiter: ",", filter_type: "auto_complete"},
      {column_number : 4, column_data_type: "html", html_data_type: "text", filter_default_label: "Select tag"}]);
}

function datatables_search_negate(dt,search_word){
  dt.columns('status:name').search('^((?!'+search_word+').)*$',true,false).draw()
}

//how to search with datatables
function datatables_search(dt){
  dt.columns('task_type:name').search('current').draw()
}
//add a record to datatables 
function row_add_datatables(table,dictionary_obj){
    table.row.add(dictionary_obj).draw( false );
}

//update label of status of rag (created: 5/28/18)
function url_create_datatables(td, cellData, rowData, row, col){
  title = rowData.name||rowData.title
  return $(td).html("<a target='_blank' href='"+cellData+"'>" +title + "</a>")
}

//update label of status of rag (created: 5/28/18)
function airbnb_url_create_datatables(td, cellData, rowData, row, col){
  airbnb_url = rowData.airbnb_url
  title = rowData.title
  return $(td).html("<a target='_blank' href='"+airbnb_url+"'>" +title + "</a>")
}


//get the data from the api 
function datatables_data_get_from_api(table_id){
  table_id = table_id||"#table"
  return $(table_id).DataTable().api().rows({ page: "current" }).data();
}


//parse the float to two decimals
function parse_float_datatable_format(td, cellData, rowData, row, col) {
  r = parseFloat(cellData)||0
  r = r.toFixed(2)
  $(td).html(r)
}

//used by cleaners.html to format check in
function date_format_check_in(td, cellData, rowData, row, col){
  date_format = moment(cellData).format("MM/DD/YY (dd)")
  $(td).html(date_format)

}

//used by cleaners.html and others to create guest url 
function guest_url_create(data, type, row, meta){
    url = "https://app.guesty.com/reservations/"+row._id+"/inbox"
    data = '<a target="_blank"  href="' + url + '">' + data + '</a>';
    return data;
  }

//format the datatables date with the date and time
function date_time_datatable_format_render_seconds(data,type,row,meta) {
  if (moment(data).isValid()){

    date_format = moment(data).format("MM/DD/YY hh:mm:ssA (dd)")
    date_format_from = moment(data).fromNow()
  }
  else {
    date_format = moment(data,"MM-DD-YYYY h:mm a").format("MM/DD/YY hh:mmA (dd)") 
    date_format_from = moment(data,"MM-DD-YYYY h:mm a").fromNow()


  }
  return '<span title="'+date_format_from+'">'+date_format+'</span>'
  //$(td).attr('title',moment(cellData).fromNow())
  //$(td).html(date_format);
}


//format the datatables date with the date and time
function moment_from_now_reder(data,type,row,meta) {
  date_format_from_now = moment(data).fromNow()
  date_format_text = moment(data).format("MM/DD/YY hh:mmA (dd)") 
  return '<span "title"="'+date_format_text+'">'+date_format_from_now+'</span>'

}


//format the datatables date with the date and time
function number_format_render(data,type,row,meta) {
  num =  parseFloat(data)||'NaN'
  if (num != 'NaN'){
    r = num.toFixed(1)
  }
  else {
    r = num 
  }
  return r 
  //$(td).attr('title',moment(cellData).fromNow())
  //

}
//format the datatables date with the date and time
function date_time_datatable_format_render(data,type,row,meta) {
  if (moment(data).isValid()){

    date_format = moment(data).format("MM/DD/YY hh:mmA (dd)")
    date_format_from = moment(data).fromNow()
  }
  else {
    date_format = moment(data,"MM-DD-YYYY h:mm a").format("MM/DD/YY hh:mmA (dd)") 
    date_format_from = moment(data,"MM-DD-YYYY h:mm a").fromNow()


  }

  return '<span "title"="'+date_format_from+'">'+date_format+'</span>'
  //$(td).attr('title',moment(cellData).fromNow())
  //$(td).html(date_format);
}

function date_time_datatable_format_render_time_zone_adjust(data,type,row,meta) {
  if (moment(data).isValid()){

    date_format = moment(data).subtract(4,'hours').format("MM/DD/YY hh:mmA (dd)")
    date_format_from = moment(data).fromNow()
  }
  else {
    date_format = moment(data,"MM-DD-YYYY h:mm a").subtract(4,'hours').format("MM/DD/YY hh:mmA (dd)") 
    date_format_from = moment(data,"MM-DD-YYYY h:mm a").fromNow()


  }

  return '<span "title"="'+date_format_from+'">'+date_format+'</span>'
  //$(td).attr('title',moment(cellData).fromNow())
  //$(td).html(date_format);
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
  array.forEach(function(D){
          key_check_func_dictionary(key_names,D)

    
  })

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
function datatable_fields_array_from_custom_fields(custom_fields){
  l = []
  custom_fields.forEach(function(custom_field){
    new_dictionary = {data:custom_field, name: custom_field,title:custom_field}
    l.push(new_dictionary)
  })
  return l 
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
      fields:fields_list,
      idSrc:  'id'
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

function datatables_initiate_render(table_id,columns_list,editor,input_data){
  input_data = input_data || {}
	table_example = $(table_id).DataTable({
    dom: '<"html5buttons"B>lTfgitp',
    data: [],
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
    buttons: [
                { extend: "excel", title: document.title },
                { extend: "colvis", title: document.title },
                { extend: 'create', editor: editor },
                { extend: "edit", editor: editor },
                {text: 'Clear',name:'Clear', action: function ( e, dt, node, config ) {
                  dt.columns('').search('').draw()
                }}]
  });

  return table_example
}