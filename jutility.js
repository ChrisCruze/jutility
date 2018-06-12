
//array_functions.js


//array filter tasks for text
function array_filter_from_text(array,text,key_name){
  key_name = key_name || "content"
  array = array.filter(function(D){return D['key_name'].toLowerCase().indexOf(text.toLowerCase()) !== -1 })
  return array 
}




//converts list of lists to array
function list_of_lists_to_array(lol,key_names){
  key_names = lol[0]||key_names
  array = []
  lol.forEach(function(row,row_num){
    var new_dict =  {}
    row.forEach(function(col,col_num){
      cell_val = lol[row_num][col_num]
      key_name = key_names[col_num]

      new_dict[key_name] = cell_val
    })
    array.push(new_dict)
  })
  return array 
}


//filter tasks for text and return sum from it
function array_filter_from_text_sum(array,text,key_name,sum_field){
  sum_field = sum_field||'duration'
  array = array_filter_from_text(array,text,key_name)
  var sum_total = sum_float_convert_from_array_underscore(array,sum_field)
  return sum_total
}
//make triple check for the key 
function dictionary_check_keys_triple_return(item,check_key,second_key,third_key,alternative_val){
  alternative_val = alternative_val||"null"
  check_key = check_key||'fullName'
  not_undefined = item[check_key] != undefined
  if (not_undefined){
      not_second_undefined = item[check_key][second_key] != undefined
      if (not_second_undefined){
        r = item[check_key][second_key][third_key]||alternative_val
      }
      else {
        r = alternative_val
      }
  }
  else {
    r = alternative_val
  }
  return r 
}

//check for the key on second layer or return null
function dictionary_check_keys_double_return(item,check_key,second_key,alternative_val){
  alternative_val = alternative_val||"null"
  check_key = check_key||'fullName'
  not_undefined = item[check_key] != undefined
  if (not_undefined){
    r = item[check_key][second_key]||alternative_val

  }
  else {
    r = alternative_val
  }
  return r 
}

//checks if item has a key and gives it null if not
function dictionary_check_keys(item,check_keys,alternative_val){
  alternative_val = alternative_val||"null"
  check_keys = check_keys||['fullName','active','connectedAt','id']
  check_keys.forEach(function(i){
    item[i] = item[i]||'null'
  })
}

//checks if item has a key and gives it null if not (for the whole array)
function array_check_keys(array,check_keys){
  check_keys = check_keys||['fullName','active','connectedAt','id']
  array.forEach(function(item){
    dictionary_check_keys(item,check_keys)
  })
}

// turn an array  e.g. list of dictionaries into a list of lists because certain functions such as datatables takes an input of a list of lists
function list_of_lists_from_array(array,keys){
  list_of_lists = [] //this is an empty list that will be filled with sublists
  array.forEach(function(dictionary_object,index){ //we're going to loop through every dictionary in the array
    sublist = []
    keys.forEach(function(key_name,key_index){ //we're also going to loop through every key
      sublist.push(dictionary_object[key_name]) //then we're going to get the key's definition to create the subli
    })
    list_of_lists.push(sublist) //push the sublist to the list_of_lists
   })
  return list_of_lists
}

//convert array to dictionary
function array_to_dictionary(array,key_name){
  key_name = key_name || 'id'
  new_dict = {}
  array.forEach(function(item,index){
    new_dict[String(item[key_name])] = item
  })
  return new_dict
}

//check if key has a value and if not, add it a value
function key_check_func_dictionary(check_keys,item){
    check_keys = check_keys||['fullName','active','connectedAt','id']
  check_keys.forEach(function(i){
    item[i] = item[i]||'null'
  })
}

//highlights syntax
function syntaxHighlight(json){
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

// prettifies the json or the list
function json_prettify(json_input){
var str = JSON.stringify(json_input, undefined, 4);
    document.body.appendChild(document.createElement('pre')).innerHTML = syntaxHighlight(str);

}


//combines dictionaries
function combine_dicts(a,b){//https://stackoverflow.com/questions/43449788/how-do-i-merge-two-dictionaries-in-javascript
  var a = a||{ fruit: "apple" },
    b = b||{ vegetable: "carrot" },
    food = Object.assign({}, a, b);
    return food
}

//check if the dictionary has two layers of key down and then pull and turn it to null to avoid error
function key_check_make_double(item,primary_key,secondary_key){
  item[primary_key] = item[primary_key]||{}
  item[primary_key][secondary_key] = item[primary_key][secondary_key] ||'null'
}


//date_functions.js


//https://stackoverflow.com/questions/141348/what-is-the-best-way-to-parse-a-time-into-a-date-object-from-user-input-in-javas
//parses a time such as 1:00PM
function parseTime( t ) {
   var d = new Date();
   var time = t.match( /(\d+)(?::(\d\d))?\s*(p?)/ );
   d.setHours( parseInt( time[1]) + (time[3] ? 12 : 0) );
   d.setMinutes( parseInt( time[2]) || 0 );
   return d;
}

//gives days in the month
function daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
}

//number of days this month
function days_this_month(){
  r = new Date()
  return daysInMonth(r.getMonth()+1,r.getYear())
}

//returns true if the date is todays date
function date_is_today(input_date){
    // Create date from input value
    var inputDate = new Date(input_date);

    // Get today's date
    var todaysDate = new Date();

    // call setHours to take the time out of the comparison
    return inputDate.setHours(0,0,0,0) == todaysDate.setHours(0,0,0,0)
}





//file_functions.js

//read directly from a text file
function read_text_file_data(file){
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = function ()
  {
    if(rawFile.readyState === 4)
    {
      if(rawFile.status === 200 || rawFile.status == 0)
      {
        raw_text_file_data = rawFile.responseText;
      }
    }
  }
  rawFile.send(null);
};

//read directly from a text file
function read_text_file_data_pull(file){
  read_text_file_data(file)
  return raw_text_file_data
};
//convert a downloadable data url into a download
function downloadURI(uri, name) {
  var link = document.createElement("a");
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  delete link;
}

//use paparse to read from file
function papa_parse_array(file,delimter){
    delimter = delimter || "|"
    file = file ||""
    read_text_file_data(file)
    var results = Papa.parse(raw_text_file_data);
    text_lines = results.data
    key_names = text_lines[0] 
    key_names = headers_key_names_list_format_string(key_names)
    array = []
    text_lines.forEach(function(entry,i){
        var singleObj = {}
         key_names.forEach(function(kn,num_index){
            singleObj[kn] = entry[num_index]
         })
        array.push(singleObj)
    })
    return array 
}
//html_functions.js

//add dropdown item to list of items. used in create_task_v2
function add_dropdown_item(title_text,id,item_class,parent_identifier){
    title_text = title_text||"hello_world 2"
    id = id||"id"
    item_class = item_class||"favicon_select"
    parent_identifier = parent_identifier||"#favicon_dropdown_menu"
    var outer_div = $("<li>", {});
    var link_elem = $("<a>", {"href": "#","target":"_blank","id":id,"class":item_class}).text(title_text)
    var final_div = outer_div.append(link_elem)
    $(parent_identifier).append(final_div)
    return final_div
}



//array input to formulate dropdown list
function add_dropdown_item_from_array(projects_dictionary){
    title_text = title_text||"hello_world 2"
    id = id||"id"
    item_class = item_class||"favicon_select"
    parent_identifier = parent_identifier||"#favicon_dropdown_menu"

    projects_dictionary.forEach(function(D){
        add_dropdown_item(title_text,id,item_class,parent_identifier)
    })  

    $(item_class).on('click', function (e) {
        $("#favicon_select_button").html($(this))
    })
}


//add icon from favicon
function add_favicon_div_from_javascript(title_text,url,image_url){
    url = url||"https://cruz.site44.com/profile.html"
    title_text = title_text||"hello_world 2"
    icon_class = icon_class||"fa fa-trophy fa-5x"
    var outer_div = $("<div>", {"class": "col-md-3"});
    var inner_div = $("<div>", {"class": "contact-box center-version"});
    var link_elem = $("<a>", {"href": url});
    //var image_elem = $("<img>", {"src": image_url});
    var image_elem = $("<i>", {"class": icon_class});

    var text_elem = $("<h3>", {"class": "m-b-xs"}).text(title_text)
    var final_div = link_elem.append(image_elem).append(text_elem)
    var final_div = inner_div.append(final_div)
    var final_div = outer_div.append(final_div)
    $("#target").append(final_div)
    return final_div
}
//creates an image div to append to a jquery object with append
function create_image_div(title_text,url,image_url){
    url = url||"https://cruz.site44.com/profile.html"
    image_url = image_url||"https://cruz.site44.com/img/a2.jpg"
    title_text = title_text||"hello_world 2"
    var outer_div = $("<div>", {"class": "col-md-2"});
    var inner_div = $("<div>", {"class": "contact-box center-version"});
    var link_elem = $("<a>", {"href": url});
    var image_elem = $("<img>", {"src": image_url});
    var text_elem = $("<h3>", {"class": "m-b-xs"}).text(title_text)
    var final_div = link_elem.append(image_elem).append(text_elem)
    var final_div = inner_div.append(final_div)
    var final_div = outer_div.append(final_div)
    return final_div
}


// appends the image div from create_image_div
function append_image_div(div_id,title_text,url,image_url){
    $(div_id).append(create_image_div(title_text,url,image_url))
}

//creates a metric div and adds it to the div
function metric_header_create(title_text,sub_title,metric_text,sub_metric_text,id){
    title_text = title_text||"TITLE"
    metric_text = metric_text||"metric_text"
    sub_metric_text = sub_metric_text||"sub_metric_text"
    sub_title = sub_title||"sub_title"
    id = id||"null"

    var outer_div_one = $("<div>", {"class": "col-md-2 "+title_text,"id":id});
    var outer_div_two = $("<div>", {"class": "ibox float-e-margins"});
    var inner_div_one = $("<div>", {"class": "ibox-title"});
    var elem_one = $("<span>", {"class": "label label-success pull-right"});
    var elem_two = $("<h5>").text(title_text)

    var inner_div_two = $("<div>", {"class": "ibox-content"});
    var elem_three = $("<h1>", {"class": "no-margins metric_text"}).text(metric_text)
    var elem_four = $("<div>", {"class": "stat-percent font-bold text-success sub_metric_text"}).text(sub_metric_text)
    var elem_five = $("<small>").text(sub_title)


    inner_div_one = inner_div_one.append(elem_one).append(elem_two)
    inner_div_two = inner_div_two.append(elem_three).append(elem_four).append(elem_five)
    var inner_ibox_div = outer_div_two.append(inner_div_one).append(inner_div_two)
    var final_div = outer_div_one.append(inner_ibox_div)
    return final_div
}

//creates a metric div and adds it to the div
function append_metric_header_div(div_id,title_text,sub_title,metric_text,sub_metric_text){
    $(div_id).append(metric_header_create(title_text,sub_title,metric_text,sub_metric_text))
}

//math_functions.js

//round the number
function round_number(i){
  i.toFixed(2)
}


//get the median from list of numbers
function median_get(values) {
    values.sort( function(a,b) {return a - b;} );
    var half = Math.floor(values.length/2);
    if(values.length % 2)
        return values[half];
    else
        return (values[half-1] + values[half]) / 2.0;
}


//create g unique identifier
function create_guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

//string_functions.js

//convert stirng to fromatted string 
function file_formatted_string(header){
	return header.replace(" ","_").replace(" ","_").replace(" ","_").replace(" ","_").toLowerCase().trim()
}

function string_within_string_check(target_string,parent_string){
	return file_formatted_string(parent_string).indexOf(file_formatted_string(target_string)) != -1
}

//convert stirng to fromatted string 
function headers_key_names_list_format_string(headers){
  l = []
      headers.forEach(function(header,i){
        new_header = header.replace(" ","_").replace(" ","_").replace(" ","_").replace(" ","_").toLowerCase().trim()
        l.push(new_header)
      })
  return l 
}

//convert string to binary
function text2Binary(string) {
    return string.split('').map(function (char) {
        return char.charCodeAt(0).toString(2);
    }).join(' ');
}
//web_functions.js

//open url in new tab
function openInNewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
}


//get url parameter 
function parameter_attain_from_url(param){
	var url = new URL(window.location.href );
	var result = url.searchParams.get(param)
	return result
}


//chartjs_functions.js


//initiates a simple bar chart using chartjs
function bar_chart_initiate_render_chartjs(chart_id,labels,numbers_list,colors){
  labels = labels||['No Data']
  numbers_list = numbers_list||[0]
  colors = colors||["#a3e1d4"]

  simple_chart_data = {labels:labels, datasets: [{data: numbers_list, backgroundColor: colors }] };
  simple_options = {legend: {display: false}, responsive: true, tooltips: {enabled: true}};

  var ctx = document.getElementById(chart_id).getContext("2d");
  simple_chart_object = new Chart(ctx, {type: 'bar', data: simple_chart_data, options:simple_options});
  return simple_chart_object
}


//initiates a simple bar chart using chartjs
function horizontal_bar_chart_initiate_render_chartjs(chart_id,labels,numbers_list,colors){
  labels = labels||['No Data']
  numbers_list = numbers_list||[0]
  colors = colors||["#a3e1d4"]

  simple_chart_data = {labels:labels, datasets: [{data: numbers_list, backgroundColor: colors }] };
  simple_options = {legend: {display: false}, responsive: true, tooltips: {enabled: true}};

  var ctx = document.getElementById(chart_id).getContext("2d");
  simple_chart_object = new Chart(ctx, {type: 'horizontalBar', data: simple_chart_data, options:simple_options});
  return simple_chart_object
}

//
//updates bar_chart for data 
function bar_chart_update_chartjs(chart_object,new_labels,new_data_points,new_colors){
    chart_object.data.labels = new_labels // ['label a','label b']
    chart_object.data.datasets[0].data = new_data_points//[1,2]
    chart_object.data.datasets[0].backgroundColor = new_colors//["#a3e1d4","#dedede"]
    chart_object.update()
}

//update based on days
function bar_chart_update_category_calculate_function(chart_object,array,date_field,metric_func,date_strf,color_func){
  //date_func = date_func || function(D){return D.date_field}
  metric_func = metric_func || function(l){return l.length}
  date_strf = date_strf ||"MM/DD"

  grouped_array_dictionary = _.groupBy(array,date_field)
  color_func = color_func || function(key_name,index,grouped_array){return "#a3e1d4"}
  labels = []
  vals = []
  colors = []
  dates = Object.keys(grouped_array_dictionary)

  //dates = _.sortBy(dates, function(num){ return moment(num,date_strf).unix(); });
  dates.forEach(function(key_name,i){
    val = metric_func(grouped_array_dictionary[key_name])
    color = color_func(key_name,i,grouped_array_dictionary)
    labels.push(key_name)
    vals.push(val)
    colors.push(color)
  })
  bar_chart_update_chartjs(chart_object,labels,vals,colors)


}

//update based on days
function bar_chart_update_time_scale_calculate_function(chart_object,array,date_field,metric_func,date_strf,color_func){
  //date_func = date_func || function(D){return D.date_field}
  metric_func = metric_func || function(l){return l.length}
  date_strf = date_strf ||"MM/DD"


  grouped_array_dictionary = _.groupBy(array,function(D){return moment(D[date_field]).format(date_strf)})
  color_func = color_func || function(key_name,index,grouped_array){return "#a3e1d4"}
  console.log(grouped_array_dictionary)
  labels = []
  vals = []
  colors = []
  dates = Object.keys(grouped_array_dictionary)

  dates = _.sortBy(dates, function(num){ return moment(num,date_strf).unix(); });
  dates.forEach(function(key_name,i){
    val = metric_func(grouped_array_dictionary[key_name])
    color = color_func(key_name,i,grouped_array_dictionary)
    labels.push(key_name)
    vals.push(val)
    colors.push(color)
  })
  bar_chart_update_chartjs(chart_object,labels,vals,colors)


}




//datatable_functions.js

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
//excel_functions.js


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



//firebase_functions.js


//sign in using firebase
function firebase_signin(){
      // FirebaseUI config.
      var uiConfig = {
        callbacks: {
          signInSuccess: function(currentUser, credential, redirectUrl) {
            console.log(currentUser)
                        console.log(credential)
            console.log(redirectUrl)

            // Do something.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            return true;
          },
          uiShown: function() {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById('loader').style.display = 'none';
          }
        },
        credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM,
        // Query parameter name for mode.
        queryParameterForWidgetMode: 'mode',
        // Query parameter name for sign in success url.
        queryParameterForSignInSuccessUrl: 'signInSuccessUrl',
        // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
        signInFlow: 'popup',
        signInSuccessUrl: 'https://chriscruze.github.io/CruzControl/main.html',
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          firebase.auth.TwitterAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        // Terms of service url.
        tosUrl: '<your-tos-url>'
      };

      var ui = new firebaseui.auth.AuthUI(firebase.auth());
      // The start method will wait until the DOM is loaded.
      ui.start('#firebaseui-auth-container', uiConfig);
}

function account_sign_in_status(){
        function initApp() {
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var uid = user.uid;
            var phoneNumber = user.phoneNumber;
            var providerData = user.providerData;
            user.getIdToken().then(function(accessToken) {
                console.log(displayName)
                console.log(email)

              // $("#username").html(displayName)
              // $("#email").html(email)
              // $("#user_photo").attr('src',photoURL)

            });
          } else {
                            console.log('not signed in')

            //window.location.href = 'https://chriscruze.github.io/CruzControl/login.html';
            document.getElementById('sign-in-status').textContent = 'Signed out';
            document.getElementById('sign-in').textContent = 'Sign in';
            document.getElementById('account-details').textContent = 'null';
          }
        

        }, function(error) {
          console.log(error);
        });
      


      };

      window.addEventListener('load', function() {
        initApp()
      });

}

//pull ref from firebase
function ref_attain_from_firebase(reference_name,child_name){
	var dbRef = firebase.database();
	var contactsRef = dbRef.ref(reference_name).child(child_name)
	return contactsRef
}

//push data to firebase
function data_push_to_firebase(contactsRef,data_to_push){
  //data_to_push = {'chat_id':chat_id, 'viewer':site_viewer, 'content': input_text, 'timestamp': date_time }
  contactsRef.push(data_to_push)

}

//query the contacts ref and run the process_func on the results
function query_elements_array_firebase(contactsRef,process_func){
	contactsRef.on('child_added', function(snapshot) {
  		process_func(snapshot.val())
	})
}

//pulls straight json if the firebase is open
function firebase_json_pull(url){
    url = url||"https://shippy-ac235.firebaseio.com/DataTablesTest/Test3.json"
    l = $.ajax({
      url: url,
      method: "GET",
      async:false,
      headers: {"Accept":"application/json; odata=verbose"}
    })
    results = l.responseJSON
    return results
  }

//purpose is to check one dictionary against another and update it 
function dictionary_cross_check_apply_key(D,firebase_defined_dict,key){
    	if (firebase_defined_dict != undefined) {
      		D[key] = firebase_defined_dict[key]||"null";
    	} else {
      		D[key] = "null";
    	}

}

//purpose is to sync firebase array with regular array across keys
function firebase_array_integrate(array,firebase_url,identifier,keys) {
	keys = keys||['status']
	firebase_url = firebase_url||"https://shippy-ac235.firebaseio.com/dashbot/accounts.json"
	identifier = identifier||"DT_RowId"
  	firebase_dict = firebase_json_pull(firebase_url)||{}
  	array.forEach(function(D) {
    	firebase_defined_dict = firebase_dict[D[String(identifier)]]
    	keys.forEach(function(key){
    		dictionary_cross_check_apply_key(D,firebase_defined_dict,key)
    	})
    	

  });
  return array;
}


// initialize the firebase instance
function firebase_initialize(){
	var config = {
	apiKey: "AIzaSyApJBfnH0j3TSugzEABiMFkI_tU_XXeGzg",
	authDomain: "shippy-ac235.firebaseapp.com",
	databaseURL: "https://shippy-ac235.firebaseio.com"
	};
	firebase.initializeApp(config);
	return firebase
}

//authenticate the user that has been authed
function firebase_auth_user_process(user_process_func){
  firebase.auth().onAuthStateChanged((user) => {
  if (user) {
  	user_process_func(user)
    }
  });
}
//jquery_functions.js

//sort a list of divs https://stackoverflow.com/questions/32362404/javascript-jquery-reorder-divs

function sort_divs_jquery(parent_identifier,sort_attribute){
  sort_attribute = sort_attribute || 'data-status'
  parent_identifier = parent_identifier||'#target'
  $(parent_identifier+' > div').sort(function (a, b) {
    var contentA = parseInt($(a).attr(sort_attribute), 10);
    var contentB = parseInt($(b).attr(sort_attribute), 10);
    return (contentA < contentB) ? 1 : (contentA > contentB) ? -1 : 0;
  }).appendTo(parent_identifier);

}

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

//moment_functions.js




//create an interval string with start time, end time and minutes elapsed. used in create_task_v2 to keep track of time
function time_interval_string_format_from_start_time(start_time_core){
      end_time = moment().format()
      start_time = moment(start_time_core).format("h:mm:ssa")
      end_time = moment(end_time).format("h:mm:ssa")
      var now = moment().valueOf()  //now is the time right now
      start_time_instance = moment(start_time_core).valueOf()
      var elapsed = now - start_time_instance;
      seconds = elapsed/1000
      elapsed_minutes = String(parseFloat(seconds/60).toFixed(2))  //add a two minute buffer
      formatted_string = " [" + start_time + "-" + end_time + "|"+ elapsed_minutes+"min]"
      return formatted_string

}

//update the html of the timer
function html_timer_update_from_jquery(jquery_identifier,start_time){
    time_text = time_since_start_time_moment(start_time)
    $(jquery_identifier).html(time_text)
    document.title = time_text
}


//update from jquery identifier the time 
function timer_jquery_html_update_from_start_time_moment(start_time,jquery_identifier){
  jquery_identifier = jquery_identifier||"#input_label_timer"
  setInterval(html_timer_update_from_jquery,1000,jquery_identifier,start_time)
}



//used in create_task_v2 to keep track of time
function time_since_start_time_moment(start_time){
    now = moment().valueOf()  //now is the time right now
    start_time_instance = moment(start_time).valueOf()
    elapsed = now - start_time_instance;
    time_text_value = moment(elapsed).subtract({hours: 19}); //have to subtract 19 hours for some reason
    time_text = time_text_value.format("HH:mm:ss")
    return time_text
 }


//tells us how long ago 
function moment_time_ago(input_time){
  return moment(input_time).fromNow();
}

//check if the day is today, 'year, month, week, minute'
function check_if_date_is_current_range(input_date,date_range){
  date_range = date_range || 'day'
  return moment(input_date).isSame(Date.now(), date_range);
}
//creates a string that indicates whether its in the day,week,month,year
function date_within_range_string_create(input_date){
  date_string = ''
  if (moment(input_date).isSame(Date.now(), 'day')){
    date_string = date_string + "today"
  }
  if (moment(input_date).isSame(Date.now(), 'week')){
    date_string = date_string + "this_week"
  }
  if (moment(input_date).isSame(Date.now(), 'month')){
    date_string = date_string + "this_month"
  }
  if (moment(input_date).isSame(Date.now(), 'year')){
    date_string = date_string + "this_year"
  }
  if (moment(input_date) >= moment(Date.now())){
    date_string = date_string + "future"
  }
  if (moment(input_date) <= moment(Date.now())){
    date_string = date_string + "past"
  }
  return date_string
}


//get hour from time
function get_hour_from_time(i){
  r = Date(i)
  hour = parseInt(moment(r).format("H")) + 5
  return hour
}


//get the current time from moment
function attain_now_from_moment(){
  date_time = moment().format();
  return date_time
}

//return unix now moment
function unix_now_moment(){
	return moment().unix()
}

//return hour-minute format using moment
function hour_format_moment(timestamp){
	return moment(timestamp).format("hh:mmA")
}

//filter a certain date for current time range such as today, this month etc.
function date_range_filter_moment(date_input,strf){
    if (date_input){
      this_month = moment().format(strf) //01
      completed_date_moment = new moment(date_input)
      completed_month = completed_date_moment.format(strf)
      return completed_month === this_month
    }
}


//set the hour from a given day
function set_date_time_moment(date,hour){
  new_date = new Date(moment(date).format())
  new_date.setHours(hour)
  return moment(new_date)
}

function date_difference_from_today_days_moment(date_added){
    a = new moment()
    b = new moment(date_added)
    age_days = a.diff(b,'days')
    return age_days
}


//dates that are within this month
function dates_within_this_month(){
    days = moment().daysInMonth();
    today = new Date()
    month = String(today.getMonth()+1)
    year = String(today.getFullYear())
    date_string = year + "-" + month + "-01"
    start_time = moment(date_string)
    hours_list = []
    for (i = 0; i < days; i++) { 
        next_time = start_time.clone()
        next_time.add(i,'day')
        hours_list.push(next_time)

    }
    return hours_list
  } 

//return a list of days in the future 
function number_of_days_ahead_calculate(days_ahead){
    today = new Date()
    month = String(today.getMonth()+1)
    year = String(today.getFullYear())
    start_time = moment()
    hours_list = []
    for (i = 0; i < days_ahead; i++) { 
        next_time = start_time.clone()
        next_time.add(i,'day')
        hours_list.push(next_time.format())
    }
    return hours_list
  } 


//return a list of days in the future. This returns an array 
function number_of_days_ahead_calculate_array(days_ahead){
    today = new Date()
    month = String(today.getMonth()+1)
    year = String(today.getFullYear())
    start_time = moment()
    hours_list = []
    for (i = 0; i < days_ahead; i++) { 
        next_time = start_time.clone()
        next_time.add(i,'day')

        hours_list.push({date:next_time.format()})
    }
    return hours_list
  } 


//return list of days in the past
function dates_past_n_days(days){
    today = new Date()
    month = String(today.getMonth()+1)
    year = String(today.getFullYear())
    date_string = moment().format("YYYY-MM-DD")//year + "-" + month + "-01"
    start_time = moment(date_string)
    hours_list = []
    for (i = 0; i < days; i++) { 
        next_time = start_time.clone()
        next_time.subtract(i,'day')
        hours_list.push(next_time)

    }
    hours_list.reverse()
    return hours_list
  } 

//return list of days in the past but strf formatted
function dates_past_n_days_formatted(days,strf){
    strf = strf || "YYYY-MM-DD"
    today = new Date()
    month = String(today.getMonth()+1)
    year = String(today.getFullYear())
    date_string = moment().format("YYYY-MM-DD")//year + "-" + month + "-01"
    start_time = moment(date_string)
    hours_list = []
    for (i = 0; i < days; i++) { 
        next_time = start_time.clone()
        next_time.subtract(i,'day')
        hours_list.push(next_time.format(strf))
    }
    hours_list.reverse()
    return hours_list
  } 



//return list of days in the past but strf formatted. This is as an array.
function dates_past_n_days_formatted_array(days,strf){
    strf = strf || "YYYY-MM-DD"
    today = new Date()
    month = String(today.getMonth()+1)
    year = String(today.getFullYear())
    date_string = moment().format("YYYY-MM-DD")//year + "-" + month + "-01"
    start_time = moment(date_string)
    hours_list = []
    for (i = 0; i < days; i++) { 
        next_time = start_time.clone()
        next_time.subtract(i,'day')
        hours_list.push({date:next_time.format(strf)})

    }
    hours_list.reverse()
    return hours_list
  } 


//pulls the dates between two dates
function dates_between_dates_moment(startDate, stopDate) {
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push(currentDate.clone());
        currentDate.add(1,'day');
    }
    return dateArray;
}



//toastr_functions.js


//message notification once something is done
function toastr_notification(message){
	toastr.options.closeButton = true;
	toastr.options.onclick = function() { console.log('clicked'); }
	toastr.info(message)
}
//typewriter_functions.js


//create a typewritter effect using typewritter library (https://safi.me.uk/typewriterjs/)
function typewriter_element_create(div_id,input_text){
	div_id = div_id||'app'
	input_text = input_text||$("#"+div_id).html()


	var app = document.getElementById(div_id);
	var typewriter = new Typewriter(app, {
	    loop: true
	});

	typewriter.typeString(input_text)
	    .pauseFor(10000)
	    .start();

}

//underscore_functions.js

// get sum from array with key
function sum_float_convert_from_array_underscore(arr,key_name) { 
  // returns the sum total of all values in the array
  return _.reduce(arr, function(memo, num) { 
    r = memo + (parseFloat(num[key_name])||0)
    return r 
  }, 0); 
}

//group by an array
function group_by_underscore(gspread_array_data){
	_.groupBy(gspread_array_data,'status')['Red']||[]
}
//gspread_functions.js

//query google spreadsheets
function gspread_query(range,spreadsheet_id,api_key){
  api_key = api_key||"AIzaSyApJBfnH0j3TSugzEABiMFkI_tU_XXeGzg"
  spreadsheet_id = spreadsheet_id||"1P0m6nu4CoXVD3nHrCgfm0pEvSpEkLsErjJxTLJLFjp8"
  range = range||"Checklists!A1"
  url = "https://sheets.googleapis.com/v4/spreadsheets/"+spreadsheet_id+"/values/" + range
  return $.ajax({type: "GET",
    url: url,
    dataType: 'json',
    async: false,
    data: {
    'key':api_key
    }
  });

}

//pulls from gspread in different format
function gspread_array_pull(sheet_name,spreadsheet_id,api_key,key_names){
        api_key = api_key||"AIzaSyApJBfnH0j3TSugzEABiMFkI_tU_XXeGzg"
        spreadsheet_id = spreadsheet_id||"1P0m6nu4CoXVD3nHrCgfm0pEvSpEkLsErjJxTLJLFjp8"
        sheet_name = sheet_name||"Checklists"
        range = sheet_name + "!A:Z"
        lol = gspread_query(range,spreadsheet_id,api_key).responseJSON.values
        key_names = lol[0]||key_names
        array = list_of_lists_to_array(lol,key_names)
        array.shift()
        return array
    }

//query from gspread directly using api key
function array_pull_from_gspread(sheet_name,spreadsheet_id,api_key,key_names){
    // sheet_name = 'Tasks'
    // spreadsheet_id = "1-tszr-k0KcENCI5J4LfCOybmqpLtvsijeUvfJbC9bu0"
    // gspread_array_data = gspread_array_pull(sheet_name,spreadsheet_id)

        api_key = api_key||"AIzaSyApJBfnH0j3TSugzEABiMFkI_tU_XXeGzg"
        spreadsheet_id = spreadsheet_id||"1P0m6nu4CoXVD3nHrCgfm0pEvSpEkLsErjJxTLJLFjp8"
        sheet_name = sheet_name||"Checklists"
        range = sheet_name + "!A:Z"
        lol = gspread_query(range,spreadsheet_id,api_key).responseJSON.values
        key_names = lol[0]||key_names
        array = list_of_lists_to_array(lol,key_names)
        array.shift()
        return array
}

//guesty_functions.js

function guesty_reservation_data_pull_custom(){
  l = guesty_reservation_data_pull()
  l.forEach(guest_reservation_dictionary_customize)
  return l 
}

//determine state if reservation is current
function guest_state_determine(item){
  is_present = moment(item['checkIn']) <= moment() && moment() <= moment(item['checkOut']) 
  if (is_present){
    return 'current'
  }
  else {
    return 'not current'
  }
}


//using the information from guesty we are able to dictionary items
function guest_reservation_dictionary_customize(item,index){
    price = item['money']['netIncome']
    days_difference = Math.round((new Date(item['checkOut']) - new Date(item['checkIn']))/(1000*60*60*24)) 
    revenue_per_day = price/days_difference
    run_rate = revenue_per_day * 30
    guest_name = item.guest.fullName
    price = parseInt(price)||0
    revenue_per_day = parseInt(revenue_per_day)||0
    run_rate = parseInt(run_rate)||0
    room=item.listing.nickname
    days_from_now = Math.round((new Date(item['checkOut']) - new Date())/(1000*60*60*24)) 
    item['guest_phone'] = dictionary_check_keys_double_return(item,'guest','phone')

    item['guest_public_review'] = dictionary_check_keys_triple_return(item,'review','guestReview','public')
    item['guest_private_review'] = dictionary_check_keys_triple_return(item,'review','guestReview','private')


    item['days_from_now'] = days_from_now
    item['days_from_now_absolute'] = Math.abs(days_from_now)
    item['days_difference'] = days_difference
    item['revenue_per_day'] = revenue_per_day
    item['run_rate'] = run_rate
    item['guest_name'] = guest_name
    item['listing_nick_name'] = item.listing.nickname||'null'
    item['listing_title'] = item.listing.title||'null'
    item['account_name'] = item.integration.object.nickname||'null'
    item['state'] = guest_state_determine(item)
    item['DT_RowId'] = item._id

    item["check_out_date_range"] = date_within_range_string_create(item.checkOut);
    item["check_in_date_range"] = date_within_range_string_create(item.checkIn);


    is_3009 = item['listing']['nickname'].indexOf("2608") != -1
    is_401 = item['listing']['nickname'].indexOf("401") != -1
    is_1806 = item['listing']['nickname'].indexOf("1806") != -1
    if (is_3009){
      item['room_number'] = '2608'
    }
    else if (is_401){
      item['room_number'] = '401'
    }
    else if (is_1806){
      item['room_number'] = '1806'
    }
    else{
      item['room_number'] = 'N/A'

    }
  }



// The below function pulls the data from the guesty
function guesty_reservation_data_pull(){
    key = '57b6349a1f211d3c4b2b4c886c5632c7'
    secret = '1b8e3bd1f42ce6b054868cd47dc0412f'
    reservations_url = 'https://superhostuser.herokuapp.com/api/v2/reservations'
    results = $.ajax
    ({
      type: "GET",
      url: reservations_url,
      dataType: 'json',
      async: false,
      data: {'viewId':'5616071779035e0e0096290c'},
      headers: {
        "Authorization": "Basic " + btoa(key + ":" + secret)
    }
    });
    return results.responseJSON.results
    }


function guesty_listing_data_pull(){
  response_result = $.ajax({type: "GET",
  url: 'https://superhostuser.herokuapp.com/api/v2/listings',
  dataType: 'json',
  async: false,
  headers: { "Authorization": "Basic " + btoa("57b6349a1f211d3c4b2b4c886c5632c7:1b8e3bd1f42ce6b054868cd47dc0412f")},
  data: {limit:50}
});
  array = response_result.responseJSON.results
  array.forEach(function(D){D['nickname'] = D['nickname']||'null'})
  return array 
}

function guesty_integration_data_pull(){
  json_response =  $.ajax({type: "GET",
    url: 'https://superhostuser.herokuapp.com/api/v2/integrations',
    dataType: 'json',
    async: false,
    headers: { "Authorization": "Basic " + btoa("57b6349a1f211d3c4b2b4c886c5632c7:1b8e3bd1f42ce6b054868cd47dc0412f")},
    data: {limit:25}
  }).responseJSON
  return json_response.results
}


//create url for reservation for datatables functions
function guesty_reservations_inbox_url_create(td, cellData, rowData, row, col) {
  url = "https://app.guesty.com/reservations/" + rowData.guestId + "/inbox";
  new_url = "<a href='" + url + "'>" + cellData + "</a>";
  console.log(new_url);
  return new_url;
}

//create user airbnb url for data tables
function guest_airbnb_url_create(data, type, row, meta) {
  url = "https://www.airbnb.com/users/show/" + row.id + "";
  data = '<a target="_blank"  href="' + url + '">' + data + "</a>";
  return data;
}

//todoist_functions.js

//toodoist custom functions 
function current_task_average_age_from_array(array){
  //https://momentjs.com/docs/
  age_sum = 0
  array.forEach(function(D,index){
    date_added = D.date_added
    a = new moment()
    b = new moment(date_added)
    age_days = a.diff(b,'days')

    age_sum = age_sum + age_days
    //ages.push(age_days)
  })
  denom = array.length 
  avg = age_sum/denom 
  return avg 
}


//complete_task
function todoist_complete_task(task_id,todoist_api_token){
  todoist_api_token = todoist_api_token || 'a14f98a6b546b044dbb84bcd8eee47fbe3788671'

  r = $.ajax({
      type: "POST",
      url: 'https://beta.todoist.com/API/v8/tasks/'+String(task_id)+'/close',
      dataType: 'json',
      async: false,
      data: {
        'token': todoist_api_token
      }
    })
}

//url create of todoist task from title and task id
function html_link_from_todoist_task(task_title,task_id){
  url = 'https://en.todoist.com/app?lang=en#task%2F'+String(task_id)
  html_task = "<a target='_blank' href='" + url + "'>" + task_title + "</a>"
  return html_task 
}

//complete task in todoist
function task_complete_todoist(task_name,project_id,todoist_api_token){
  todoist_api_token = todoist_api_token || 'a14f98a6b546b044dbb84bcd8eee47fbe3788671'
  return todoist_add_tasks_ajax(todoist_api_token,{"content": task_name, "project_id": project_id},'item_complete')
}

//update task in todoist
function task_update_todoist(task_name,project_id,todoist_api_token){
  todoist_api_token = todoist_api_token || 'a14f98a6b546b044dbb84bcd8eee47fbe3788671'
  return todoist_add_tasks_ajax(todoist_api_token,{"content": task_name, "project_id": project_id},'item_update')
}
//create task in todoist
function task_create_todoist(task_name,project_id,todoist_api_token){
  todoist_api_token = todoist_api_token || 'a14f98a6b546b044dbb84bcd8eee47fbe3788671'
  return todoist_add_tasks_ajax(todoist_api_token,{"content": task_name, "project_id": project_id})
}


function gspread_table_tasks_generate(gspread_array_data,completed_tasks,current_tasks){


    gspread_array_data.forEach(function(gspread_dict){
      filtered_completed_tasks = completed_tasks.filter(function(complete_dict){return complete_dict['content'].toLowerCase().indexOf(gspread_dict['Task'].toLowerCase()) != -1})
      filtered_completed_tasks_today = filtered_completed_tasks.filter(function(complete_dict){return date_range_filter(complete_dict.completed_date,'YY-MM-DD')})
      gspread_dict['duration_today'] = sum_float_convert_from_array(filtered_completed_tasks_today,'duration')
      gspread_dict['duration'] = sum_float_convert_from_array(filtered_completed_tasks,'duration')
      gspread_dict['completed_count'] = filtered_completed_tasks.length

      if (filtered_completed_tasks.length > 0){
        last_completed = _.max(filtered_completed_tasks, function(complete_dict){ return moment(complete_dict.completed_date).valueOf();}).completed_date
        days_since_completed = moment().diff(last_completed, 'days')
        gspread_dict['days_since_last_completed'] = days_since_completed
        gspread_dict['last_completed'] = moment(last_completed).format("MM/DD hh:mm A");
        is_good = parseFloat(gspread_dict['Max Age']) > days_since_completed
        if (is_good){
          gspread_dict['status'] = 'Green'
          gspread_dict['task_assigned'] = 'Green'

        }
        else {
        gspread_dict['status'] = 'Red'
        }
      }
      else {
        gspread_dict['last_completed'] = ''
        gspread_dict['days_since_last_completed'] = ''
        gspread_dict['status'] = 'N/A'

      }
      if (gspread_dict['status'] != 'Green'){

      filtered_current_tasks = current_tasks.filter(function(current_dict){return current_dict['content'].toLowerCase().indexOf(gspread_dict['Task'].toLowerCase()) != -1})
      is_assigned = filtered_current_tasks.length > 0
      if (is_assigned){
        filtered_current_tasks_with_due_date = filtered_current_tasks.filter(function(D){return D['due_date_utc'] != null})
        has_due_date = filtered_current_tasks_with_due_date.length > 0 
        if (has_due_date){
            gspread_dict['task_assigned'] = 'Green'

        }
        else {
            gspread_dict['task_assigned'] = 'Amber'

        }
      }

      else {
        gspread_dict['task_assigned'] = 'Red'

      }
    }


    })


    return gspread_array_data


}




//filter tasks for text
function task_filter_from_text(array,text){
  array = array.filter(function(D){return D.content.toLowerCase().indexOf(text.toLowerCase()) !== -1 })
  return array 
}

//filter tasks for text and return length
function task_filter_text_calculate_count(array,text){
  array = array.filter(function(D){return D.content.toLowerCase().indexOf(text.toLowerCase()) !== -1 })
  length_total = array.length
    return length_total
  //$(div_id).html(length_total)
}

//filter tasks for text and add the sum to a div
function task_filter_text_calculate_sum(array,text,sum_field){
  sum_field = sum_field||'duration'
  array = array.filter(function(D){return D.content.toLowerCase().indexOf(text.toLowerCase()) !== -1 })
  var sum_total = sum_float_convert_from_array_underscore(array,sum_field)
    return sum_total
}


//calculate the cost of the task at 15 dollar per rate
function task_cost_calculation(item,key_name,hourly_rate){
  hourly_rate = hourly_rate||15
  key_name = key_name|| 'duration'
  minutes = parseFloat(item[key_name])
  cost = minutes * (hourly_rate/60)
  return cost 
}

//return the sub project by parsing it out from the colon
function sub_project_from_task(item){
  item_name = item.content 
  sub_project = item_name.split(":")[0].trim()
  is_sub_project = sub_project.indexOf("|") == -1 && sub_project.indexOf("[") == -1  && sub_project.indexOf("@") == -1 
  if (is_sub_project){
    return sub_project //'-'
  }
  else {
    return '-'
  }
}

//return duration from the task name
function duration_from_task_dictionary(item){
  item_name = item.content 
  item_has_time = item_name.indexOf("|") != -1 && item_name.indexOf("[") != -1 && item_name.indexOf("]") != -1
  if (item_has_time){
    var duration =parseInt(item_name.substring(item_name.lastIndexOf("|")+1,item_name.lastIndexOf("min")));
  }
  else {
    duration = 0
  }
  return duration
}


//customize each dictionary of todoist task for additional attributes
function tasks_array_customize_item(item){
  item['sub_project'] = sub_project_from_task(item)//item_name.split(":")[0].trim()
  item['duration'] = duration_from_task_dictionary(item)
  item['cost'] = task_cost_calculation(item)
  item["DT_RowId"] = item.id;
  return item 
}


//https://stackoverflow.com/questions/49394588/how-to-create-todoist-task-using-todoist-api-v7
 function todoist_add_tasks_ajax(todoist_api_token,tasks,type,sync_token) {
  var sync_token = sync_token||"*"
  type = type || "item_add"//item_update

  tasks_is_list_array = Array.isArray(tasks)
  if (!tasks_is_list_array){
    tasks = [tasks]
  }
  var commands = todoist_tasks_to_commands(tasks,type);
  var data = {
    "token" : todoist_api_token,
    'sync_token' : sync_token,
    'resource_types' : '["projects", "items"]',
    'commands' : commands
  };
  
  return jQuery.ajax({
    url: "https://todoist.com/api/v7/sync",
    data: data,
    type: "POST",
    dataType: "json",
    success: function(response) {
      console.log(response);
      sync_token = response.sync_token;
    },
    error: function(response) { 
      console.log(response);
    },
  });
  
}

//commands to to doist, item_update,item_add, item_complete, item_delete
function todoist_tasks_to_commands(tasks,type) {
  type = type || "item_add"//item_update
  var commands = [];
  
  tasks.forEach(function(args) {
    
    var temp_commands = {
      "type": type,
      "temp_id": create_guid(),
      "uuid": create_guid(),
      "args": args
    };

    commands.push(temp_commands)

  });
  
  commands = JSON.stringify(commands);
  
  return commands;
  
}


//get current tasks 
function todoist_current_tasks_pull(){
 return $.ajax({
      type: "GET",
      url: 'https://en.todoist.com/api/v7/sync/',
      dataType: 'json',
      async: false,
      data: {
        'token': 'a14f98a6b546b044dbb84bcd8eee47fbe3788671',
        'sync_token':'*',
        'resource_types':'["items","labels","projects"]'
      }
    }).responseJSON
}

//get current tasks customized with project name and label name
function todoist_current_tasks_pull_custom(){
  current_tasks_base = todoist_current_tasks_pull()
  current_tasks = current_tasks_base.items 
  labels_dictionary = current_tasks_base.labels
  labels_dictionary = array_to_dictionary(labels_dictionary) 
  projects_dictionary = current_tasks_base.projects 
  current_tasks.forEach(function(D){tasks_array_customize_item(D)})
  return current_tasks
}

//update tasks
function todoist_update_task(task_id,content){
  return $.ajax({
      type: "GET",
      url: 'https://en.todoist.com/api/v7/sync/',
      dataType: 'json',
      async: false,
      data: {
        'token': 'a14f98a6b546b044dbb84bcd8eee47fbe3788671',
        'sync_token':'*',
        'resource_types':'["items"]',
        'commands':'[{"type": "item_update", "uuid": "f8539c77-7fd7-4846-afad-3b201f0be8a5", "args": {"id": '+String(task_id)+',"content":"'+content+'" }}]'
      }
    })
}

      // "temp_id": create_guid(),
      // "uuid": create_guid(),

//completes todoist task
function todoist_complete_task_v7(task_id){
  return $.ajax({
      type: "GET",
      url: 'https://en.todoist.com/api/v7/sync/',
      dataType: 'json',
      async: false,
      data: {
        'token': 'a14f98a6b546b044dbb84bcd8eee47fbe3788671',
        'sync_token':'*',
        'resource_types':'["items"]',
        'commands':'[{"type": "item_complete", "uuid": '+create_guid()+' "args": {"ids": ['+String(task_id)+']}}]'
      }
    })
}


//deletes todoist task
function todoist_delete_task(task_id){
  return $.ajax({
      type: "GET",
      url: 'https://en.todoist.com/api/v7/sync/',
      dataType: 'json',
      async: false,
      data: {
        'token': 'a14f98a6b546b044dbb84bcd8eee47fbe3788671',
        'sync_token':'*',
        'resource_types':'["items"]',
        'commands':'[{"type": "item_delete", "uuid": "f8539c77-7fd7-4846-afad-3b201f0be8a5", "args": {"ids": ['+String(task_id)+']}}]'
      }
    })
}


//child function of todoist_completed_tasks_all
function todoist_completed_tasks_with_offset(todoist_api_token,offset,since) {
  since = since||'2018-04-28T10:00'
    results = $.ajax({
      type: "GET",
      url: 'https://en.todoist.com/api/v7/completed/get_all',
      dataType: 'json',
      async: false,
      data: {
        'token': todoist_api_token,
        'since':since,
        //'since': '2017-12-30T10:00',

        'limit':'50',
        'offset':offset
      }
    });
    return results.responseJSON.items
  }


//Since todoist only lets you pull 50 tasks at a time, we're going to use a loop to get the first 50, then the second 50, then the third 50 tasks, etc. 
//when it's pulling empty lists, it can stop 
//we're going to use a while loop here (read more here: https://www.w3schools.com/js/js_loop_while.asp)
//pulls all of todoist tasks 
function todoist_completed_tasks_all(todoist_api_token,since){
  todoist_api_token = todoist_api_token||"a14f98a6b546b044dbb84bcd8eee47fbe3788671"//"fea02db7fc04ee9c9bd7c2a67c3d9de1cfa57941" //karina api token
  todoist_tasks_pulled = []
  iterator = 0 
  master_list = []
  while (todoist_tasks_pulled.length == 50|| iterator==0) { //if todoist pulls 50 tasks, then it should try again. when it pulls less, we know that it's the last loop we need to do. since the first loop will be less than 50 tasks length, i put in or clause that is iterator is 0 which will only be when it does the first loop
    limit_variable = 50 * iterator //this will go into the todoist completed tasks query
    todoist_tasks_pulled = todoist_completed_tasks_with_offset(todoist_api_token,limit_variable,since)//this is the list of tasks 
    master_list = master_list.concat(todoist_tasks_pulled)
    iterator += 1; //this will be 1 in the first loop, 2 in the second loop, etc. 
  }
  return master_list
}



//pulls all the todoist tasks and customizes each item
function todoist_completed_tasks_all_custom(todoist_api_token,since){
  l = todoist_completed_tasks_all(todoist_api_token,since)
  l.forEach(function(item){tasks_array_customize_item(item)})
  return l 
}

//converts minute labels to minutes
function labels_add_from_labels_dictionary(task_item,labels_dictionary){
  labels_list = task_item.labels
  label_list_is_undefined = labels_list == undefined
  if (label_list_is_undefined){
    r = 0 
  }
  try {
    r = 0 
    labels_list.forEach(function(item,index){
      label_dict = labels_dictionary[item]
      minute_number = label_dict.minute||label_minute_string_to_integer(label_dict.name)
      r = r + minute_number
    })
  }
  catch(err) {
    r = 0
  }

   task_item['duration'] = task_item['duration']||r 

}

function project_name_append(item,projects_dictionary){
  
  item_project_dictionary = _.groupBy(projects_dictionary,'id')[item.project_id]
  if (item_project_dictionary != undefined){
    project_name = item_project_dictionary[0].name
  }
  else {
    project_name = 'null'
  }
  item['project_name'] = project_name
}

//get dictionary of current_tasks and completed_tasks
function todoist_tasks_pull_custom(){
  current_tasks_base = todoist_current_tasks_pull()
  completed_tasks = todoist_completed_tasks_all()
  current_tasks = current_tasks_base.items 
  labels_dictionary = array_to_dictionary(current_tasks_base.labels) 
  projects_dictionary = current_tasks_base.projects 


  current_tasks.forEach(function(D){D['task_type']='current'})
  current_tasks.forEach(function(D){D['task_date']=D['due_date_utc']})
  completed_tasks.forEach(function(D){D['task_type']='completed'})
  completed_tasks.forEach(function(D){D['task_date']=D['completed_date']})



  current_completed_tasks = completed_tasks.concat(current_tasks) //combine both arrays together into one array
  current_completed_tasks.forEach(function(item){tasks_array_customize_item(item)})
  current_completed_tasks.forEach(function(item){labels_add_from_labels_dictionary(item,labels_dictionary)})
  current_completed_tasks.forEach(function(item){project_name_append(item,projects_dictionary)})
  current_completed_tasks.forEach(function(item){item['task_date_range'] = date_within_range_string_create(item['task_date'])})

  array_check_keys(current_completed_tasks,['due_date_utc','priority','date_added','completed_date'])
  return current_completed_tasks 
}

//calculate age from todoist
function age_calculate_from_todoist_task(D){
    date_added = D.date_added
    a = new moment()
    b = new moment(date_added)
    age_days = a.diff(b,'days')
    age_days = age_days || 0
    return age_days
}

//get dictionary of current_tasks and completed_tasks
function todoist_tasks_pull_custom_gspread(){


  current_tasks_base = todoist_current_tasks_pull()
  completed_tasks = todoist_completed_tasks_all()
  current_tasks = current_tasks_base.items 
  labels_dictionary = array_to_dictionary(current_tasks_base.labels) 
  projects_dictionary = current_tasks_base.projects 


  current_tasks.forEach(function(D){D['task_type']='current'})
  current_tasks.forEach(function(D){D['task_date']=D['due_date_utc']})
  current_tasks.forEach(function(D){D['age']=age_calculate_from_todoist_task(D)})

  completed_tasks.forEach(function(D){D['task_type']='completed'})
  completed_tasks.forEach(function(D){D['task_date']=D['completed_date']})


  sheet_name = 'Tasks'
  spreadsheet_id = "1-tszr-k0KcENCI5J4LfCOybmqpLtvsijeUvfJbC9bu0"
  gspread_array_data = gspread_array_pull(sheet_name,spreadsheet_id)



  
  gspread_array = gspread_table_tasks_generate(gspread_array_data,completed_tasks,current_tasks)



  current_completed_tasks = completed_tasks.concat(current_tasks) //combine both arrays together into one array
  current_completed_tasks.forEach(function(item){tasks_array_customize_item(item)})
  current_completed_tasks.forEach(function(item){labels_add_from_labels_dictionary(item,labels_dictionary)})
  current_completed_tasks.forEach(function(item){project_name_append(item,projects_dictionary)})
  current_completed_tasks.forEach(function(item){item['task_date_range'] = date_within_range_string_create(item['task_date'])})




  todoist_current = current_completed_tasks.filter(function(D){return D['task_type'] == 'current'})
  todoist_completed = current_completed_tasks.filter(function(D){return D['task_type'] == 'completed'})


  array_check_keys(current_completed_tasks,['due_date_utc','priority','date_added','completed_date','age','task_date'])
  return {todoist_current:todoist_current,todoist_completed:todoist_completed,todoist:current_completed_tasks,gspread:gspread_array,projects:projects_dictionary,labels:labels_dictionary}
}






//toggl_functions.js


//pulls from toggl with custom fields
function toggl_data_pull_custom(since){
  array = toggl_data_pull(since)
  array.forEach(function(item){
    minutes  = (parseFloat(item.dur)/1000)/60
    cost = minutes * (15/60)
    item['cost'] = cost//.toFixed(2)
    item['minutes'] = minutes//.toFixed(2)
    item['hours'] = minutes/60
  })
  return array
}



function toggl_data_pull_iterate(since,page){
  since = since||"2018-04-28"
  secret = "api_token"
  key = "a764cd7b58fea643f44ef579b606168d"
  json_response = $.ajax({
  type: "GET",
  url: "https://toggl.com/reports/api/v2/details",
  headers: {"Authorization": "Basic " + btoa(key + ":" + secret)},
  dataType: 'json',
  async: false,
  data: {
    user_agent:"kcruz29@gmail.com",
    workspace_id:"246697",
    since:since,
    page:page
}
  }).responseJSON.data
  return json_response
}



function toggl_data_pull(since){
since = since||"2018-04-28"
  todoist_tasks_pulled = []
  iterator = 0 
  master_list = []
  while (todoist_tasks_pulled.length == 50 || iterator==0) { //if todoist pulls 50 tasks, then it should try again. when it pulls less, we know that it's the last loop we need to do. since the first loop will be less than 50 tasks length, i put in or clause that is iterator is 0 which will only be when it does the first loop
    limit_variable = iterator + 1//this will go into the todoist completed tasks query
    todoist_tasks_pulled = toggl_data_pull_iterate(since,limit_variable)
    master_list = master_list.concat(todoist_tasks_pulled)
    iterator += 1; //this will be 1 in the first loop, 2 in the second loop, etc. 
  }
  return master_list
}

//timer.js

//update the html of the timer
function html_timer_update_from_jquery(timer_instance_dictionary){
    time_text = time_since_start_time_moment(timer_instance_dictionary.start_time)
    $("#timer_text").html(time_text)
    $("#task_content").html(html_link_from_todoist_task(task_content,timer_instance_dictionary.id))
    document.title = time_text
}


//ispecific to todoist on updating page for omni.html
function timer_instance_page_initiate(timer_instance_dictionary){
    $("#input_text").attr('task_id',timer_instance_dictionary.id)
    $("#input_text").val(timer_instance_dictionary.content)
    return setInterval(html_timer_update_from_jquery,1000,timer_instance_dictionary)
}

//if timer instances exists, add certain tactions to the timer
function timer_instance_exists_process(timer_instance_dictionary,timer_instance){
    $("#input_text").attr('task_id',timer_instance_dictionary.id)
    $("#input_text").val(timer_instance_dictionary.content)
    var my_interval_timer = setInterval(html_timer_update_from_jquery,1000,timer_instance_dictionary)
	   //timer_instance_interval = timer_instance_page_initiate(timer_instance_dictionary)
        $("#input_update").click(function(event) {
            event.preventDefault()
            html_timer = time_interval_string_format_from_start_time(timer_instance_dictionary.start_time)
            todoist_update_task(timer_instance_dictionary.id,$("#input_text").val() + html_timer)
            timer_instance_dictionary['content'] = $("#input_text").val() 
            timer_instance.set(timer_instance_dictionary)
        })
        $("#input_complete").click(function(event) {
            $("#input_update").click();
            event.preventDefault()
            todoist_complete_task(String(timer_instance_dictionary.id))
            timer_instance.set({})
            $("#input_text").val("") 
            clearInterval(my_interval_timer)
        })

        $("#input_delete").click(function(event) {
            event.preventDefault()
            todoist_delete_task(timer_instance_dictionary.id)
            timer_instance.set({})
            clearInterval(my_interval_timer)
        })
}

//creates timer for omni.html
function add_dropdown_item_todoist_app(title_text,id){
    title_text = title_text||"hello_world 2"
    var outer_div = $("<li>", {});
    var link_elem = $("<a>", {"href": "#","id":id,"class":"favicon_select"}).text(title_text)
    var final_div = outer_div.append(link_elem)
    $("#favicon_dropdown_menu").append(final_div)
    return final_div
}

//for omni.html 
function create_project_dropdown_list(projects_dictionary){
    projects_dictionary.forEach(function(D){
        add_dropdown_item_todoist_app(D['name'],D['id'])
    })  
    $('.favicon_select').on('click', function (e) {
    $("#favicon_select_button").html($(this))
})

}

//todoist_gspread_table.js

function percentage_complete_metric_generate(gspread_array){
  complete_array = gspread_array.filter(function(D){return D.status == 'Green'})
  percentage_complete = (complete_array.length/gspread_array.length)*100
  title_text = 'Complete %'
  metric_text = percentage_complete.toFixed(1) + "%"
  sub_title = '-'
  sub_metric_text = complete_array.length + "/" + gspread_array.length
  $('#metric_headers').append(metric_header_create(title_text,sub_title,metric_text,sub_metric_text))
}

//remaining tasks populate
function remaining_tasks_populate(gspread_array){
    dt = $("#remaining_tasks_table").DataTable({
    paging: false,
    dom: '<"html5buttons"B>lTfgitp',
    data: gspread_array,
    scrollY:"200px",
    columns:[
    {data:'Task',title:'Task',name:'Task'},
    {data:'status',title:'status',name:'status',visible:false},
    {data:'task_assigned',title:'task_assigned',name:'task_assigned',visible:false}
    ],
    select: true,
    colReorder: true,
    buttons: [
    { extend: "excel", title: document.title },
    { extend: "colvis", title: document.title },
    {text: 'Not Assigned',name:'Not Assigned', action: function ( e, dt, node, config ) {
          dt.columns('task_assigned:name').search('Red').draw()
        }},
     {text: 'Red',name:'Red', action: function ( e, dt, node, config ) {
          dt.columns('status:name').search('Red').draw()
        }},
     {text: 'Clear',name:'Clear', action: function ( e, dt, node, config ) {
          dt.columns('').search('').draw()
        }}, 
    ],
    order: [0, "desc"]
    });
    dt.columns('status:name').search('^((?!Green).)*$',true,false).draw()
}
//todoist_table.js



function header_metrics_create_todoist(){
  sub_title = '-'
  metric_text = '-'
  sub_metric_text = '-'
  id = 'null'
  $('#metric_headers').append(metric_header_create('Tasks Completed',sub_title,metric_text,sub_metric_text,'tasks_completed_number'))
  $('#metric_headers').append(metric_header_create('Tasks Number',sub_title,metric_text,sub_metric_text,'tasks_current_number'))
  $('#metric_headers').append(metric_header_create('Average',sub_title,metric_text,sub_metric_text,'tasks_age'))
}


function current_tasks_call_back(callback_array){
  $('#tasks_current_number').find(".metric_text").html(callback_array.length)
  $('#tasks_age').find(".metric_text").html((sum_float_convert_from_array_underscore(callback_array,'age')/callback_array.length).toFixed(1) )



  // var sum_total = sum_float_convert_from_array_underscore(callback_array,'duration')
  // $("."+'Total').find(".metric_text").html(sum_total)
}

function completed_tasks_call_back(callback_array){
  $('#tasks_completed_number').find(".metric_text").html(callback_array.length)
  // var sum_total = sum_float_convert_from_array_underscore(callback_array,'duration')
  // $("."+'Total').find(".metric_text").html(sum_total)
}

function todoist_table_create_current(array,table_id,metric_headers_update_list){
    $.fn.dataTable.ext.type.order["date-format-moment-pre"] = function(d) {
      r = moment(d).utc();
      return r;
    };


    function array_dictionary_customize(item, index) {
      item["DT_RowId"] = item.id;
    }

    array.forEach(array_dictionary_customize);
    array = firebase_array_integrate(array,"https://shippy-ac235.firebaseio.com/omni/"+omni_node+".json","DT_RowId",['status','notes'])

    editor = new $.fn.dataTable.Editor({
      table: table_id,
      fields: [{ label: "status:", name: "status" },{ label: "notes:", name: "notes" }]
    });

    editor.on("postSubmit", function(e, json, data, action, xhr) {
      json_array = json.data;
      json_array.forEach(function(D) {
        record_id = D["DT_RowId"];
        D["timestamp"] = moment().format();
        FirebaseRef.child(record_id).set(D);
      });
    });

    //based on filter from table , update a funciton
    function callback_function() {
      var api = this.api();
      callback_array = api.rows({ page: "current" }).data();
      metric_headers_update_list(callback_array)
    }

    $(table_id).DataTable({
      paging: false,
      dom: '<"html5buttons"B>lTfgitp',
      data: array,
      columns: [
        {
          data: "content",
          title: "content",
          visible: true,
          name: "content"
        },
        {
          data: "duration",
          title: "duration",
          visible: true,
          name: "duration",
          type:"number-order"
        },
        {
          data: "age",
          title: "age",
          visible: true,
          name: "age",
          type: "number-order"
        },
        {
          data: "sub_project",
          title: "sub_project",
          visible: false,
          name: "sub_project"
        },
        {
          data: "status",
          title: "status",
          visible: false,
          name: "status"
        },
        {
          data: "notes",
          title: "notes",
          visible: false,
          name: "notes"
        },
        {
          data: "task_date",
          title: "task_date",
          visible: false,
          name: "task_date",
          createdCell: date_format_with_day,
          type: "date-format-moment"
        },
        {
          data: "task_date_range",
          title: "task_date_range",
          visible: false,
          name: "task_date_range"
        },
         {
          data: "task_type",
          title: "task_type",
          visible: false,
          name: "task_type"
        }
      ],
      select: true,
      colReorder: true,
      drawCallback: callback_function,
      buttons: [
        { extend: "excel", title: document.title },
        { extend: "colvis", title: document.title },
        { extend: "edit", editor: editor },
        {text: 'Clear',name:'Clear', action: function ( e, dt, node, config ) {
          dt.columns('').search('').draw()
        }},
         {text: 'Current',name:'Current', action: function ( e, dt, node, config ) {
          dt.columns('task_type:name').search('current').draw()
        }},
          {text: 'Complete',name:'Complete', action: function ( e, dt, node, config ) {
          dt.columns('task_type:name').search('complete').draw()
        }},
        {text: 'Today',name:'Today', action: function ( e, dt, node, config ) {
          dt.columns('task_date_range:name').search('today').draw()
        }},
        {text: 'This Week',name:'This Week', action: function ( e, dt, node, config ) {
          dt.columns('task_date_range:name').search('this_week').draw()
        }},
         {text: 'This Month',name:'This Month', action: function ( e, dt, node, config ) {
          dt.columns('task_date_range:name').search('this_month').draw()
        }},
        {text: 'This Year',name:'This Year', action: function ( e, dt, node, config ) {
          dt.columns('task_date_range:name').search('this_year').draw()
        }}
      ],
      order: [3, "desc"]
    });
}



function todoist_table_create_complete(array,table_id,metric_headers_update_list){
    $.fn.dataTable.ext.type.order["date-format-moment-pre"] = function(d) {
      r = moment(d).utc();
      return r;
    };


    function array_dictionary_customize(item, index) {
      item["DT_RowId"] = item.id;
    }

    array.forEach(array_dictionary_customize);
    array = firebase_array_integrate(array,"https://shippy-ac235.firebaseio.com/omni/"+omni_node+".json","DT_RowId",['status','notes'])

    editor = new $.fn.dataTable.Editor({
      table: table_id,
      fields: [{ label: "status:", name: "status" },{ label: "notes:", name: "notes" }]
    });

    editor.on("postSubmit", function(e, json, data, action, xhr) {
      json_array = json.data;
      json_array.forEach(function(D) {
        record_id = D["DT_RowId"];
        D["timestamp"] = moment().format();
        FirebaseRef.child(record_id).set(D);
      });
    });

    //based on filter from table , update a funciton
    function callback_function() {
      var api = this.api();
      callback_array = api.rows({ page: "current" }).data();
      metric_headers_update_list(callback_array)
    }

    table = $(table_id).DataTable({
      paging: false,
      dom: '<"html5buttons"B>lTfgitp',
      data: array,
      columns: [
        {
          data: "content",
          title: "content",
          visible: true,
          name: "content"
        },
        {
          data: "duration",
          title: "duration",
          visible: true,
          name: "duration"
        },
        {
          data: "sub_project",
          title: "sub_project",
          visible: true,
          name: "sub_project"
        },
        {
          data: "status",
          title: "status",
          visible: true,
          name: "status"
        },
        {
          data: "notes",
          title: "notes",
          visible: true,
          name: "notes"
        },
        {
          data: "task_date",
          title: "task_date",
          visible: true,
          name: "task_date",
          createdCell: date_format_with_day,
          type: "date-format-moment"
        },
        {
          data: "task_date_range",
          title: "task_date_range",
          visible: false,
          name: "task_date_range"
        },
         {
          data: "task_type",
          title: "task_type",
          visible: false,
          name: "task_type"
        }
      ],
      select: true,
      colReorder: true,
      drawCallback: callback_function,
      buttons: [
        { extend: "excel", title: document.title },
        { extend: "colvis", title: document.title },
        { extend: "edit", editor: editor },
        {text: 'Clear',name:'Clear', action: function ( e, dt, node, config ) {
          dt.columns('').search('').draw()
        }},
         {text: 'Current',name:'Current', action: function ( e, dt, node, config ) {
          dt.columns('task_type:name').search('current').draw()
        }},
          {text: 'Complete',name:'Complete', action: function ( e, dt, node, config ) {
          dt.columns('task_type:name').search('complete').draw()
        }},
        {text: 'Today',name:'Today', action: function ( e, dt, node, config ) {
          dt.columns('task_date_range:name').search('today').draw()
        }},
        {text: 'This Week',name:'This Week', action: function ( e, dt, node, config ) {
          dt.columns('task_date_range:name').search('this_week').draw()
        }},
         {text: 'This Month',name:'This Month', action: function ( e, dt, node, config ) {
          dt.columns('task_date_range:name').search('this_month').draw()
        }},
        {text: 'This Year',name:'This Year', action: function ( e, dt, node, config ) {
          dt.columns('task_date_range:name').search('this_year').draw()
        }}
      ],
      order: [3, "desc"]
    });

    table.columns('task_date_range:name').search('today').draw()
}
