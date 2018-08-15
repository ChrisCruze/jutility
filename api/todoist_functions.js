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
        due_date = moment(last_completed).add(parseFloat(gspread_dict['Max Age']),'days').format()
        gspread_dict['due_date'] = due_date
        gspread_dict['days_remaining'] = (moment().diff(due_date, 'minutes')/1440)*-1

        is_good = parseFloat(gspread_dict['Max Age']) > days_since_completed
        days_to_incomplete = days_since_completed/parseFloat(gspread_dict['Max Age']) 

        gspread_dict['days_to_incomplete'] = days_to_incomplete



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
        gspread_dict['days_to_incomplete'] = ''

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
  since = since||moment().subtract(30,'days').format('YYYY-MM-DD') + "T10:00"// '2018-05-08T10:00'//moment().subtract(60,'days').format('YYYY-MM-DD') //
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


function gspread_array_project_id_append(gspread_array_data,projects_dictionary){
  project_dictionary_reference = {}
  projects_dictionary.forEach(function(D){project_dictionary_reference[D['name']] = D['id']})
  gspread_array_data.forEach(function(D){
    D['project_id'] = project_dictionary_reference[D['Category']] || 'null'
  })
}

function gspread_array_manual_pull(){
  return [
    {
        "Category": "Bnb",
        "Description": "Pay 401 and Murano via Wells Fargo and 1806 via PayPal",
        "Estimated Duration": "5",
        "Max Age": "30",
        "Sprint": "Recurring",
        "Task": "Pay Rent",
        "Type": "Recurring",
        "completed_count": 1,
        "days_since_last_completed": 4,
        "duration": 0,
        "duration_today": 0,
        "last_completed": "07/04 04:00 PM",
        "project_id": 2159935681,
        "status": "Green",
        "task_assigned": "Green"
    },
    {
        "Category": "Entrepreneurship",
        "Description": "-",
        "Estimated Duration": "90",
        "Max Age": "3",
        "Sprint": "Intense",
        "Task": "Aesop",
        "Type": "Goal",
        "completed_count": 134,
        "days_since_last_completed": 0,
        "duration": 0,
        "duration_today": 0,
        "last_completed": "07/08 08:56 PM",
        "project_id": 2159934063,
        "status": "Green",
        "task_assigned": "Green"
    },
    {
        "Category": "Entrepreneurship",
        "Description": "-",
        "Estimated Duration": "5",
        "Max Age": "7",
        "Sprint": "Phone - Quick",
        "Task": "Ideate",
        "Type": "Habit",
        "completed_count": 4,
        "days_since_last_completed": 0,
        "duration": 0,
        "duration_today": 0,
        "last_completed": "07/08 07:57 PM",
        "project_id": 2159934063,
        "status": "Green",
        "task_assigned": "Green"
    },
    {
        "Category": "Entrepreneurship",
        "Description": "-",
        "Estimated Duration": "5",
        "Max Age": "1",
        "Sprint": "Phone - Messages",
        "Task": "Check Aesop Email",
        "Type": "Recurring",
        "completed_count": 17,
        "days_since_last_completed": 0,
        "duration": 0,
        "duration_today": 0,
        "last_completed": "07/08 08:00 PM",
        "project_id": 2159934063,
        "status": "Green",
        "task_assigned": "Green"
    },
    {
        "Category": "Entrepreneurship",
        "Description": "-",
        "Estimated Duration": "5",
        "Max Age": "2",
        "Sprint": "Phone - Messages",
        "Task": "Aesop: Correspond on Slack",
        "Type": "Recurring",
        "completed_count": 17,
        "days_since_last_completed": 0,
        "duration": 0,
        "duration_today": 0,
        "last_completed": "07/08 08:00 PM",
        "project_id": 2159934063,
        "status": "Green",
        "task_assigned": "Green"
    },
    {
        "Category": "Fitness",
        "Description": "-",
        "Estimated Duration": "90",
        "Max Age": "3",
        "Sprint": "Intense",
        "Task": "Exercise",
        "Type": "Goal",
        "completed_count": 10,
        "days_since_last_completed": 0,
        "duration": 0,
        "duration_today": 0,
        "last_completed": "07/08 11:56 PM",
        "project_id": 2159936401,
        "status": "Green",
        "task_assigned": "Green"
    },
    {
        "Category": "Finance",
        "Description": "Capital One, Chase, Amex, Barclays Uber",
        "Estimated Duration": "5",
        "Max Age": "5",
        "Sprint": "Phone - Quick",
        "Task": "Pay Credit Cards",
        "Type": "Recurring",
        "completed_count": 6,
        "days_since_last_completed": 2,
        "duration": 0,
        "duration_today": 0,
        "last_completed": "07/06 09:19 PM",
        "project_id": 2168189199,
        "status": "Green",
        "task_assigned": "Green"
    },
    {
        "Category": "Finance",
        "Description": "",
        "Estimated Duration": "5",
        "Max Age": "2",
        "Sprint": "Phone - Quick",
        "Task": "Check Balances",
        "Type": "Recurring",
        "completed_count": 6,
        "days_since_last_completed": 2,
        "duration": 0,
        "duration_today": 0,
        "last_completed": "07/06 09:19 PM",
        "project_id": 2168189199,
        "status": "Green",
        "task_assigned": "Green"
    },
    {
        "Category": "Homeostasis",
        "Description": "-",
        "Estimated Duration": "5",
        "Max Age": "14",
        "Sprint": "Errand",
        "Task": "Check Mail",
        "Type": "Recurring",
        "completed_count": 1,
        "days_since_last_completed": 16,
        "duration": 0,
        "duration_today": 0,
        "last_completed": "06/23 08:16 AM",
        "project_id": 2159896039,
        "status": "Red",
        "task_assigned": "Amber"
    },
    {
        "Category": "Homeostasis",
        "Description": "-",
        "Estimated Duration": "5",
        "Max Age": "7",
        "Sprint": "Errand",
        "Task": "Clean Laptop",
        "Type": "Recurring",
        "completed_count": 4,
        "days_since_last_completed": 0,
        "duration": 0,
        "duration_today": 0,
        "last_completed": "07/08 09:02 PM",
        "project_id": 2159896039,
        "status": "Green",
        "task_assigned": "Green"
    },
    {
        "Category": "Homeostasis",
        "Description": "-",
        "Estimated Duration": "25",
        "Max Age": "21",
        "Sprint": "Errand",
        "Task": "Laundry",
        "Type": "Recurring",
        "completed_count": 2,
        "days_since_last_completed": 6,
        "duration": 0,
        "duration_today": 0,
        "last_completed": "07/02 07:07 PM",
        "project_id": 2159896039,
        "status": "Green",
        "task_assigned": "Green"
    },
    {
        "Category": "Homeostasis",
        "Description": "-",
        "Estimated Duration": "5",
        "Max Age": "3",
        "Sprint": "Other",
        "Task": "Meditate",
        "Type": "Habit/Goal",
        "completed_count": 6,
        "days_since_last_completed": 1,
        "duration": 0,
        "duration_today": 0,
        "last_completed": "07/07 06:26 PM",
        "project_id": 2159896039,
        "status": "Green",
        "task_assigned": "Green"
    },
    {
        "Category": "Homeostasis",
        "Description": "-",
        "Estimated Duration": "5",
        "Max Age": "14",
        "Sprint": "Other",
        "Task": "Wardrobe Search",
        "Type": "Recurring",
        "completed_count": 2,
        "days_since_last_completed": 14,
        "duration": 0,
        "duration_today": 0,
        "last_completed": "06/24 07:32 PM",
        "project_id": 2159896039,
        "status": "Red",
        "task_assigned": "Amber"
    },
    {
        "Category": "Homeostasis",
        "Description": "-",
        "Estimated Duration": "25",
        "Max Age": "5",
        "Sprint": "Other",
        "Task": "Clean Room",
        "Type": "Recurring",
        "completed_count": 6,
        "days_since_last_completed": 2,
        "duration": 0,
        "duration_today": 0,
        "last_completed": "07/06 09:40 PM",
        "project_id": 2159896039,
        "status": "Green",
        "task_assigned": "Green"
    },
    {
        "Category": "Homeostasis",
        "Description": "-",
        "Estimated Duration": "2",
        "Max Age": "1",
        "Sprint": "Phone - Messages",
        "Task": "Check Email",
        "Type": "Recurring",
        "completed_count": 15,
        "days_since_last_completed": 0,
        "duration": 0,
        "duration_today": 0,
        "last_completed": "07/08 07:40 PM",
        "project_id": 2159896039,
        "status": "Green",
        "task_assigned": "Green"
    },
    {
        "Category": "Homeostasis",
        "Description": "-",
        "Estimated Duration": "2",
        "Max Age": "3",
        "Sprint": "Phone - Messages",
        "Task": "Update LinkedIn",
        "Type": "Recurring",
        "completed_count": 4,
        "days_since_last_completed": 2,
        "duration": 0,
        "duration_today": 0,
        "last_completed": "07/06 09:12 PM",
        "project_id": 2159896039,
        "status": "Green",
        "task_assigned": "Green"
    },
    {
        "Category": "Homeostasis",
        "Description": "-",
        "Estimated Duration": "5",
        "Max Age": "14",
        "Sprint": "Phone - Quick",
        "Task": "Order Food and Beverages",
        "Type": "Recurring",
        "completed_count": 2,
        "days_since_last_completed": 13,
        "duration": 0,
        "duration_today": 0,
        "last_completed": "06/25 07:32 PM",
        "project_id": 2159896039,
        "status": "Green",
        "task_assigned": "Green"
    },
    {
        "Category": "Homeostasis",
        "Description": "-",
        "Estimated Duration": "2",
        "Max Age": "29",
        "Sprint": "Recurring",
        "Task": "Prescription Request",
        "Type": "Recurring",
        "completed_count": 1,
        "days_since_last_completed": 14,
        "duration": 0,
        "duration_today": 0,
        "last_completed": "06/24 07:20 PM",
        "project_id": 2159896039,
        "status": "Green",
        "task_assigned": "Green"
    },
    {
        "Category": "Homeostasis",
        "Description": "-",
        "Estimated Duration": "5",
        "Max Age": "45",
        "Sprint": "Recurring",
        "Task": "Order Contacts",
        "Type": "Recurring",
        "completed_count": 1,
        "days_since_last_completed": 8,
        "duration": 0,
        "duration_today": 0,
        "last_completed": "06/30 08:50 PM",
        "project_id": 2159896039,
        "status": "Green",
        "task_assigned": "Green"
    },
    {
        "Category": "Homeostasis",
        "Description": "-",
        "Estimated Duration": "2",
        "Max Age": "90",
        "Sprint": "Recurring",
        "Task": "Get Haircut",
        "Type": "Recurring",
        "completed_count": 1,
        "days_since_last_completed": 14,
        "duration": 0,
        "duration_today": 0,
        "last_completed": "06/24 07:23 PM",
        "project_id": 2159896039,
        "status": "Green",
        "task_assigned": "Green"
    },
    {
        "Category": "JP",
        "Description": "-",
        "Estimated Duration": "5",
        "Max Age": "30",
        "Sprint": "Overdone",
        "Task": "Zeus",
        "Type": "Limit",
        "completed_count": 13,
        "days_since_last_completed": 3,
        "duration": 0,
        "duration_today": 0,
        "last_completed": "07/05 02:30 PM",
        "project_id": 2159934072,
        "status": "Green",
        "task_assigned": "Green"
    },
    {
        "Category": "JP",
        "Description": "-",
        "Estimated Duration": "5",
        "Max Age": "30",
        "Sprint": "Overdone",
        "Task": "Testing Results",
        "Type": "Limit",
        "completed_count": 10,
        "days_since_last_completed": 5,
        "duration": 0,
        "duration_today": 0,
        "last_completed": "07/03 07:31 PM",
        "project_id": 2159934072,
        "status": "Green",
        "task_assigned": "Green"
    },
    {
        "Category": "JP",
        "Description": "-",
        "Estimated Duration": "5",
        "Max Age": "7",
        "Sprint": "Remember",
        "Task": "Clarity",
        "Type": "Recurring",
        "completed_count": 4,
        "days_since_last_completed": 6,
        "duration": 0,
        "duration_today": 0,
        "last_completed": "07/02 07:29 PM",
        "project_id": 2159934072,
        "status": "Green",
        "task_assigned": "Green"
    },
    {
        "Category": "JP",
        "Description": "-",
        "Estimated Duration": "5",
        "Max Age": "7",
        "Sprint": "Remember",
        "Task": "Beeline",
        "Type": "Recurring",
        "completed_count": 4,
        "days_since_last_completed": 6,
        "duration": 0,
        "duration_today": 0,
        "last_completed": "07/02 07:29 PM",
        "project_id": 2159934072,
        "status": "Green",
        "task_assigned": "Green"
    },
    {
        "Category": "Life Engineering",
        "Description": "-",
        "Estimated Duration": "20",
        "Max Age": "21",
        "Sprint": "Overdone",
        "Task": "Cruz Control",
        "Type": "Limit",
        "completed_count": 37,
        "days_since_last_completed": 2,
        "duration": 0,
        "duration_today": 0,
        "last_completed": "07/07 03:53 AM",
        "project_id": 2160096908,
        "status": "Green",
        "task_assigned": "Green"
    },
    {
        "Category": "Life Engineering",
        "Description": "-",
        "Estimated Duration": "25",
        "Max Age": "3",
        "Sprint": "Transit",
        "Task": "Reading",
        "Type": "Habit/Goal",
        "completed_count": 3,
        "days_since_last_completed": 7,
        "duration": 0,
        "duration_today": 0,
        "last_completed": "07/01 04:47 PM",
        "project_id": 2160096908,
        "status": "Red",
        "task_assigned": "Amber"
    },
    {
        "Category": "Social",
        "Description": "-",
        "Estimated Duration": "5",
        "Max Age": "1",
        "Sprint": "Phone - Messages",
        "Task": "Respond to Missed Text Messages",
        "Type": "Recurring",
        "completed_count": 11,
        "days_since_last_completed": 0,
        "duration": 0,
        "duration_today": 0,
        "last_completed": "07/08 08:02 PM",
        "project_id": 2159934103,
        "status": "Green",
        "task_assigned": "Green"
    },
    {
        "Category": "Social",
        "Description": "-",
        "Estimated Duration": "10",
        "Max Age": "14",
        "Sprint": "Phone - Messages",
        "Task": "Friends Connect",
        "Type": "Habit",
        "completed_count": 2,
        "days_since_last_completed": 6,
        "duration": 0,
        "duration_today": 0,
        "last_completed": "07/02 09:26 AM",
        "project_id": 2159934103,
        "status": "Green",
        "task_assigned": "Green"
    },
    {
        "Category": "Social",
        "Description": "-",
        "Estimated Duration": "3",
        "Max Age": "3",
        "Sprint": "Phone - Messages",
        "Task": "Gs Reach Out",
        "Type": "Habit",
        "completed_count": 6,
        "days_since_last_completed": 2,
        "duration": 0,
        "duration_today": 0,
        "last_completed": "07/06 04:45 PM",
        "project_id": 2159934103,
        "status": "Green",
        "task_assigned": "Green"
    },
    {
        "Category": "Social",
        "Description": "Check UWishuKnu, Meetup, and GroupMe",
        "Estimated Duration": "5",
        "Max Age": "14",
        "Sprint": "Phone - Plan",
        "Task": "Plan Social Events",
        "Type": "Habit",
        "completed_count": 3,
        "days_since_last_completed": 1,
        "duration": 0,
        "duration_today": 0,
        "last_completed": "07/07 03:05 PM",
        "project_id": 2159934103,
        "status": "Green",
        "task_assigned": "Green"
    },
    {
        "Category": "Social",
        "Description": "-",
        "Estimated Duration": "2",
        "Max Age": "30",
        "Sprint": "Unimportant",
        "Task": "Choice Purchase",
        "Type": "Recurring",
        "completed_count": 1,
        "days_since_last_completed": 14,
        "duration": 0,
        "duration_today": 0,
        "last_completed": "06/24 07:34 PM",
        "project_id": 2159934103,
        "status": "Green",
        "task_assigned": "Green"
    },
    {
        "Category": "Bnb",
        "Description": "Learn about the laws as it applies to 401 and 2116 and follow-up",
        "Estimated Duration": "15",
        "Max Age": "10",
        "Sprint": "Procastinate",
        "Task": "Landlord Legal",
        "Type": "Procastinating Project",
        "completed_count": 5,
        "days_since_last_completed": 0,
        "duration": 0,
        "duration_today": 0,
        "last_completed": "07/08 10:25 PM",
        "project_id": 2159935681,
        "status": "Green",
        "task_assigned": "Green"
    },
    {
        "Category": "Homeostasis",
        "Description": "Prioritize/Tag/Clean Tasks and Ensure Tasks have task assigned",
        "Estimated Duration": "3",
        "Max Age": "1",
        "Sprint": "Phone - Plan",
        "Task": "Clean Todoist",
        "Type": "Recurring",
        "completed_count": 13,
        "days_since_last_completed": 0,
        "duration": 0,
        "duration_today": 0,
        "last_completed": "07/08 07:42 PM",
        "project_id": 2159896039,
        "status": "Green",
        "task_assigned": "Green"
    },
    {
        "Category": "Life Engineering",
        "Description": "Schedule Day Out",
        "Estimated Duration": "3",
        "Max Age": "2",
        "Sprint": "Phone - Plan",
        "Task": "Morning Review",
        "Type": "Habit",
        "completed_count": 8,
        "days_since_last_completed": 0,
        "duration": 0,
        "duration_today": 0,
        "last_completed": "07/08 07:47 PM",
        "project_id": 2160096908,
        "status": "Green",
        "task_assigned": "Green"
    },
    {
        "Category": "Homeostasis",
        "Description": "-",
        "Estimated Duration": "5",
        "Max Age": "7",
        "Sprint": "Phone - Plan",
        "Task": "Plan Intake",
        "Type": "Goal",
        "completed_count": 2,
        "days_since_last_completed": 0,
        "duration": 0,
        "duration_today": 0,
        "last_completed": "07/09 01:08 AM",
        "project_id": 2159896039,
        "status": "Green",
        "task_assigned": "Green"
    }
]
}

function completed_task_start_time_end_time(D){
  between_brackets_text = regex_between_brackets_pull(D.content)
  if (between_brackets_text != null){

  between_brackets_text_time = between_brackets_text.split("|")[0]
  start_time = between_brackets_text_time.split("-")[0]
  end_time = between_brackets_text_time.split("-")[1]
  completed_date = moment(D['completed_date']).format("MM-DD-YYYY")

  start_time_moment = moment(completed_date+ " "+start_time,"MM-DD-YYYY h:mm:ssa")
  end_time_moment = moment(completed_date+ " "+end_time,"MM-DD-YYYY h:mm:ssa")
  D.start_time =start_time_moment.format()
  D.end_time =end_time_moment.format()
  }
  else {
  D.start_time =null
  D.end_time =null
  }
  return D

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
  completed_tasks.forEach(function(D){completed_task_start_time_end_time(D)})



  sheet_name = 'Tasks'
  spreadsheet_id = "1-tszr-k0KcENCI5J4LfCOybmqpLtvsijeUvfJbC9bu0"
  gspread_array_data = gspread_array_manual_pull()//gspread_array_pull(sheet_name,spreadsheet_id)



  
  gspread_array = gspread_table_tasks_generate(gspread_array_data,completed_tasks,current_tasks)
  gspread_array_project_id_append(gspread_array,projects_dictionary)


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





