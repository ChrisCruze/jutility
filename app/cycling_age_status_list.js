



//var dbRef = dbRef || firebase.database();

function surplus_time_calculate(hours_age,recurrence_age){
    recurrence_age = parseFloat(recurrence_age)||0
    surplus_time = recurrence_age - hours_age
    return surplus_time
}
function determine_state_from_age(hours_age,recurrence_age){
	recurrence_age = parseFloat(recurrence_age)||0
	surplus_time = recurrence_age - hours_age
	if (surplus_time > 0){
		state = 'green'
	}
	else {
		state = 'red'
	}
	return state 

}

function label_create_from_rag_input(data,field_name,text_input) {
    label_name = {
        'green': 'label-primary',
        'amber': 'label-warning',
        'red': 'label-danger'
    }[data] || 'label-primary'
    span_element = $("<span>").append($("<span>", {
        "value": data,
        "field": field_name,
        "class": "rag label " + label_name
    }).text(text_input).clone()).html()
    return span_element
}

function determine_state_from_row_dictionary_calculate(row){
    hours_age =  time_difference_moment_from_now_interval(moment(row['time_stamp']),'minutes')/60
    return determine_state_from_age(hours_age,row['recurrence_age'])
}

function determine_age_from_row_dictionary_calculate(row){
    hours_age =  time_difference_moment_from_now_interval(moment(row['time_stamp']),'minutes')/60
    return surplus_time_calculate(hours_age,row['recurrence_age'])
}
function columns_generate_cycling_list(){
	 columns = [
	 	{
            'data': 'name',
            'format': '',
            visible: true	

        }, {
            'data': 'recurrence_age',
            'format': '',
            visible:false
        }, {

            'data': 'rag',
            'format': 'rag',
            'title':'Hrs Remain',
            visible:true,
            render:function(data, type, row, meta) {
            field_name = 'rag'//new_dictionary.name
            rag_status = determine_state_from_row_dictionary_calculate(row)
            text_input = determine_age_from_row_dictionary_calculate(row)

            span_element = label_create_from_rag_input(rag_status,field_name,text_input.toFixed(1)) 
            return span_element}


        }, {
        //     'data': 'rag',
        //     'format': 'rag',
        //     visible:true
        // }, {
            'data': 'time_stamp',
            'format': 'date',
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

