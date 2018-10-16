

function less_than_number_of_days(date_added,number_of_days){
	return date_difference_from_today_days_moment(date_added) < number_of_days
}

function array_filter_last_number_of_days(array,key_name,number_of_days){
	filtered_day = array.filter(function(D){return less_than_number_of_days(D[key_name],number_of_days)})
	return filtered_day
}

//"https://shippy-ac235.firebaseio.com/run_log.json"),'time_stamp',number_of_days
function array_firebase_url_filter(url,key_name,number_of_days){
	array = firebase_json_pull_values(url)
	filtered_array = array_filter_last_number_of_days(array,key_name,number_of_days)
	return filtered_array
}

function array_firebase_url_filter_sum(url,key_name,number_of_days,sum_field){
	filtered_array = array_firebase_url_filter(url,key_name,number_of_days)	
	sum_value = sum_float_convert_from_array_underscore(filtered_array, sum_field)
	return sum_value
}
function array_filter_sum_return(array,key_name,number_of_days,sum_field){
	filtered_array = array_filter_last_number_of_days(array,key_name,number_of_days)
	sum_value = sum_float_convert_from_array_underscore(filtered_array, sum_field)
	return sum_value
}

function goal_widget_of_goal_percentage(sum_value,goal_metric){
	percentage_of_goal = sum_value/goal_metric
	return percentage_of_goal
}

function color_from_percentage(percentage_of_goal){
	if (percentage_of_goal >= 1){
		color = 'navy-bg'
	}
	else if(percentage_of_goal >= .66) {
		color = 'yellow-bg'
	}
	else {
		color = 'red-bg'
	}
	return color 
}

function number_single_decimal_format(sum_value){
	return sum_value.toFixed(1)
}
function percentage_single_decimal_format(percentage_of_goal){
	percentage_of_goal_formatted =  (percentage_of_goal * 100).toFixed(1) + "%"
	return percentage_of_goal_formatted
}

function metric_text_create(sum_value,percentage_of_goal,goal_number){
	sum_value_formatted = number_single_decimal_format(sum_value)
	percentage_of_goal_formatted = percentage_single_decimal_format(percentage_of_goal)
	text = sum_value_formatted + "/" + goal_number + " (" + percentage_of_goal_formatted + ")"
	return text 
}
function run_goal_widget_dictionary(){
	url = "https://shippy-ac235.firebaseio.com/run_log.json"
	key_name = "time_stamp"
	number_of_days = 30
	sum_field = "miles"
	sum_value = array_firebase_url_filter_sum(url,key_name,number_of_days,sum_field)
	goal_number = 40
	percentage_of_goal = goal_widget_of_goal_percentage(sum_value,goal_number)
	widget_color = color_from_percentage(percentage_of_goal)
	metric_text = metric_text_create(sum_value,percentage_of_goal,goal_number)
	metric_dict = {text:metric_text,value:sum_value_formatted,percentage:percentage_of_goal,color:widget_color,name:'Run'}
	return metric_dict
}
function hours_age_determine_dict(row){
	hours_age = time_difference_moment_from_now_interval(moment(row['time_stamp']),'minutes')/60
	recurrence_age = parseFloat(row['recurrence_age'])||0
	surplus_time = recurrence_age - hours_age
	is_surplus = recurrence_age > hours_age
	return is_surplus
}
function recurring_tasks_widget_dictionary(){
	url = "https://shippy-ac235.firebaseio.com/omni/cycling_list.json"
	array = firebase_json_pull_values(url)
	filtered_array = array.filter(function(D){return hours_age_determine_dict(D)})

	key_name = "time_stamp"
	number_of_days = 21
	sum_field = "miles"
	//filtered_array = array_firebase_url_filter(url,key_name,number_of_days)	
	//filtered_array_true = filtered_array.filter(function(D){return D['status'] == 'true'})
	sum_value = filtered_array.length //array_firebase_url_filter_sum(url,key_name,number_of_days,sum_field)
	goal_number = array.length
	percentage_of_goal = goal_widget_of_goal_percentage(sum_value,goal_number)
	widget_color = color_from_percentage(percentage_of_goal)
	metric_text = metric_text_create(sum_value,percentage_of_goal,goal_number)
	metric_dict = {text:metric_text,percentage:percentage_of_goal,color:widget_color,name:'Cycle'}
	return metric_dict
}

function gs_goal_widget_dictionary(){
	url = "https://shippy-ac235.firebaseio.com/Gs/data.json"
	key_name = "time_stamp"
	number_of_days = 21
	sum_field = "miles"
	filtered_array = array_firebase_url_filter(url,key_name,number_of_days)	
	filtered_array_true = filtered_array.filter(function(D){return D['status'] == 'true'})
	sum_value = filtered_array_true.length //array_firebase_url_filter_sum(url,key_name,number_of_days,sum_field)
	goal_number = 1
	percentage_of_goal = goal_widget_of_goal_percentage(sum_value,goal_number)
	widget_color = color_from_percentage(percentage_of_goal)
	metric_text = metric_text_create(sum_value,percentage_of_goal,goal_number)
	metric_dict = {text:metric_text,value:sum_value_formatted,percentage:percentage_of_goal,color:widget_color,name:'Gs'}
	return metric_dict
}

function metric_widget_calculate_from_completed_tasks(completed_tasks){
	filtered_array = completed_tasks.filter(function(D){return D['content'].indexOf('Travel:') > -1})
	sum_value = array_filter_sum_return(filtered_array,'completed_date',7,'duration')
	goal_number = 30
	percentage_of_goal = goal_widget_of_goal_percentage(sum_value,goal_number)
	widget_color = color_from_percentage(percentage_of_goal)
	metric_text = metric_text_create(sum_value,percentage_of_goal,goal_number)
	metric_dict = {text:metric_text,value:sum_value_formatted,percentage:percentage_of_goal,color:widget_color,name:'Travel'}
	return metric_dict
}

function academy_widget_calculate_from_completed_tasks(completed_tasks){
	filtered_array = completed_tasks.filter(function(D){return D['content'].toLowerCase().indexOf('academy') > -1})
	filtered_array = array_filter_last_number_of_days(filtered_array,'completed_date',7)
	sum_value = filtered_array.length
	goal_number = 50
	percentage_of_goal = goal_widget_of_goal_percentage(sum_value,goal_number)
	widget_color = color_from_percentage(percentage_of_goal)
	metric_text = metric_text_create(sum_value,percentage_of_goal,goal_number)
	metric_dict = {text:metric_text,value:sum_value_formatted,percentage:percentage_of_goal,color:widget_color,name:'Academy'}
	return metric_dict
}


function run_goal_widget_create(){
	run_dict = run_goal_widget_dictionary()
	widget_create_html_element_append("#goal_widgets",run_dict['color'],run_dict['name'],run_dict['text'])
}

function travel_goal_widget_create(completed_tasks){
	metric_dict = metric_widget_calculate_from_completed_tasks(completed_tasks)
	widget_create_html_element_append("#goal_widgets",metric_dict['color'],metric_dict['name'],metric_dict['text'])
}
function widget_create_from_metric_dict(metric_dict){
	widget_create_html_element_append("#goal_widgets",metric_dict['color'],metric_dict['name'],metric_dict['text'])
}

function metric_widgets_create(completed_tasks){
	run_goal_widget_create()

	widget_create_from_metric_dict(recurring_tasks_widget_dictionary())
	travel_goal_widget_create(completed_tasks)
	widget_create_from_metric_dict(academy_widget_calculate_from_completed_tasks(completed_tasks))
	widget_create_from_metric_dict(gs_goal_widget_dictionary())
}

//sum_float_convert_from_array_underscore(array, sum_field)
// yellow-bg
// navy-bg
// redy-bg

// widget_create_html_element_append("#goal_widgets",goal_color,goal_name,goal_metric)