

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

