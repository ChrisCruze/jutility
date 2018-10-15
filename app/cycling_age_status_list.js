



//var dbRef = dbRef || firebase.database();


function determine_state_from_age(hours_age,recurrence_age){
	recurrence_age = parseFloat(recurrence_age)||0
	surplus_time = recurrence_age - hours_age
	if (surplus_time > 0){
		state = 'green'
	}
	else {
		state = 'red'
	}
	return surplus_time 

}
function columns_generate_cycling_list(){
	 columns = [
	 	{
            'data': 'name',
            'format': '',
            visible: true	
        }, {
            'data': 'rag',
            'format': 'rag',
            visible:true
        }, {
            'data': 'time_stamp',
            'format': 'date',
            visible:false
        }, {
            'data': 'recurrence_age',
            'format': '',
            visible:false
        }, {
            'data': 'age',
            'format': '',
             visible:false,
            render: function(data, type, row, meta) {
            	return time_difference_moment_from_now_interval(moment(row['time_stamp']),'minutes')/60
            }            
        }, {
            'data': 'state',
            'format': 'state',
            visible:false,
             render: function(data, type, row, meta) {
            	hours_age =  time_difference_moment_from_now_interval(moment(row['time_stamp']),'minutes')/60
            	return determine_state_from_age(hours_age,row['recurrence_age'])
            }       
        }, {

            'data': 'rank',
            'format': 'rank',
            visible:false
        }, {
            'data': 'summary',
            visible: false
        }, {
            'data': 'group',
            visible: false
        }, {
            'data': 'identifier',
            visible: false
        }
    ]
    return columns 
}

function cycling_list_generate(){
	columns = columns_generate_cycling_list()
	datatables_params = datatables_firebase({
	    table_selector: "#cycling_list",
	    firebase_reference: dbRef.ref('omni').child('cycling_list'),
	    columns:columns
	   // sort: 'rank'
	})

}

