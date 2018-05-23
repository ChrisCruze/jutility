
//array_functions.js

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
//date_functions.js




function daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
}

function days_this_month(){
  r = new Date()
  return daysInMonth(r.getMonth()+1,r.getYear())
}



//file_functions.js

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
//math_functions.js


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
//web_functions.js

//get url parameter 
function parameter_attain_from_url(param){
	var url = new URL(window.location.href );
	var result = url.searchParams.get(param)
	return result
}


//datatable_functions.js

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
//firebase_functions.js

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

//moment_functions.js


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



//underscore_functions.js

// get sum from array with key
function sum_float_convert_from_array_underscore(arr,key_name) { 
  // returns the sum total of all values in the array
  return _.reduce(arr, function(memo, num) { 
    r = memo + (parseFloat(num[key_name])||0)
    return r 
  }, 0); 
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
//todoist_functions.js



//https://stackoverflow.com/questions/49394588/how-to-create-todoist-task-using-todoist-api-v7
todoist_add_tasks_ajax = function(todoist_api_token,tasks,sync_token) {
  var sync_token = sync_token||"*"

  tasks_is_list_array = Array.isArray(tasks)
  if (!tasks_is_list_array){
    tasks = [tasks]
  }
  var commands = todoist_tasks_to_commands(tasks);
  
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

//commands to to doist
todoist_tasks_to_commands = function(tasks) {
  
  var commands = [];
  
  tasks.forEach(function(args) {
    
    var temp_commands = {
      "type": "item_add",
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

//completes todoist task
function todoist_complete_task(task_id){
  return $.ajax({
      type: "GET",
      url: 'https://en.todoist.com/api/v7/sync/',
      dataType: 'json',
      async: false,
      data: {
        'token': 'a14f98a6b546b044dbb84bcd8eee47fbe3788671',
        'sync_token':'*',
        'resource_types':'["items"]',
        'commands':'[{"type": "item_complete", "uuid": "f8539c77-7fd7-4846-afad-3b201f0be8a5", "args": {"ids": ['+String(task_id)+']}}]'
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


//toggl_functions.js


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
