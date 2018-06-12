


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
