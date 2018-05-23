rituals_array = [{name:'morning_ritual',start_time:1,end_time:12,tasks:['exercise','todoist_cleanup']}]
completed_tasks = [{content:'exercise',completed_date:"2018-05-23T02:54:19+02:00"}]
dates_list = dates_past_n_days_formatted_array(2)



function start_time_end_time_check(completed_time,date,start_time,end_time){
  result = moment(completed_time) <= set_date_time_moment(date,end_time) && moment(completed_time) >= set_date_time_moment(date,start_time)
  return result 
} 

function completed_tasks_filter(ritual_name,task_name,completed_time,date,start_time,end_time){
  contains_string = file_formatted_string(task_name).indexOf(file_formatted_string(ritual_name)) != -1
  within_time = start_time_end_time_check(completed_time,date,start_time,end_time)

  bool =  contains_string && within_time
  console.log(ritual_name,task_name,completed_time,date,start_time,end_time)
    console.log(contains_string , within_time)

  console.log(bool)
  return bool
}

//loop through dates,loop through rituals, loop through completed for that date, append to date dictionary
function completed_ritual_process_from_date(date,completed_tasks,ritual_dict){
  L = []
  ritual_dict['tasks'].forEach(function(ritual_dict_name){
  completed_tasks =  completed_tasks.filter(function(D){return completed_tasks_filter(ritual_dict_name,
  D.content,D.completed_date,date,ritual_dict.start_time,
  ritual_dict.end_time)})
  L = L.concat(completed_tasks)
  })
 return L
}


dates_list.forEach(function(date_dict){
	rituals_array.forEach(function(ritual_dictionary){
    day_ritual_list = completed_ritual_process_from_date(date_dict.date,completed_tasks,ritual_dictionary)
    date_dict[ritual_dictionary.name] = day_ritual_list
		})
})


console.log(dates_list)























