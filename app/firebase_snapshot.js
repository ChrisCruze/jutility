
function key_metrics_save(){
	metrics_array = []
	$(".metric_snapshot").each(function(row_number) {
		metrics_array.push({number:row_number,html:$(this).html(),text:$(this).text(),class:$(this).attr('class')})
	})
	var current_snapshot_ref = dbRef.ref('todoist_snapshots').child('metrics').child(moment().format("YYYYMMDD"))
	current_snapshot_ref.set(metrics_dict)

}

function key_metrics_save_minute(params){
	//selector = params.selector||
	metrics_array = []
	// $('.kpi').each(function(row_number) {
	// 	metrics_array.push({number:row_number,html:$(this).html(),text:$(this).text(),class:$(this).attr('class'),name:$(this).attr('name')||'null'})
	// })
	// console.log(metrics_array)

	metric_dict = {tasks_age:$("#tasks_age").find('.metric_text').text(),
	tasks_current_number: $("#tasks_current_number").find('.metric_text').text(),
	gspread_percentage:$("#gspread_percentage").find('.metric_text').text(),
	gspread_percentage_sub_metric_text: $("#gspread_percentage").find('.sub_metric_text').text(),
	time_stamp: moment().format()
	}

	dbRef.ref('todoist_snapshots').child('kpis').push(metric_dict)
	dbRef.ref('todoist_snapshots').child('metric_hours').child(moment().format("YYYYMMDD_HH")).set(metric_dict)

}

function todoist_snapshot_store(){
	var snapshot_ref = dbRef.ref('todoist_snapshots').child('gspread_recurring_tasks').child(moment().format("YYYYMMDD"))
	snapshot_ref.set(gspread_array)

	var current_snapshot_ref = dbRef.ref('todoist_snapshots').child('todoist_current_tasks').child(moment().format("YYYYMMDD"))
	current_snapshot_ref.set(current_tasks)


}





function todoist_gspread_pull_firebase(){
try{
    todoist_gspread_pull = todoist_tasks_pull_custom_gspread()
}
catch(err){
    todoist_gspread_pull = firebase_json_pull("https://shippy-ac235.firebaseio.com/omni/snapshot.json")
}
return todoist_gspread_pull


}
