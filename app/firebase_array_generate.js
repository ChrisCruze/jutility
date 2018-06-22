$("#drogas_submit").click(function(event) {
    input_text = $("#drogas_input").val()
    date_time = moment().format(); //new Date()
    
    input_text_is_length_one = input_text.length == 1
    if (input_text_is_length_one){
        type = 'count'
    }
    else {
        type = 'text'
    }

    within_system = $("#within_system").html()

    data_to_push = {'input_text':input_text,'date_time':date_time,'type':type,'within_system':within_system}
    contactsRef.push(data_to_push)
    $("#drogas_input").val("")
});




function firebase_editor_initiate(table_id,fields){
	editor = new $.fn.dataTable.Editor({
		table:table_id,
		idSrc:  'DT_RowId',
		fields: editor_fields_array_from_custom_fields(fields)
	});
	editor.on("postSubmit", function(e, json, data, action, xhr) {
	if (action == 'edit'){
			json_array = json.data;
			json_array.forEach(function(D) {
			record_id = D["DT_RowId"];
			D["time_stamp"] = moment().format();
			firebaseRef.child(record_id).set(D);
		});	
	}
	else {
		items_to_add = Object.values(data.data)
		items_to_add.forEach(function(item){
		item['time_stamp'] = moment().format()
		r = firebaseRef.push(item)
	})}})

	return editor 
}


function firebase_generate_datatable(table_id,fields,firebaseRef){
	//DEFINE FIREBASE
	//firebase.initializeApp({databaseURL: "https://shippy-ac235.firebaseio.com/"});
	//var dbRef = firebase.database();
	var firebaseRef = firebaseRef||dbRef.ref('drogas');
	table_id =  table_id||"#ds_table"
	fields = fields||['input_text','date_time','type','within_system','DT_RowId']

	editor = firebase_editor_initiate(table_id,fields)
	table = datatables_initiate_render(table_id,datatable_fields_array_from_custom_fields(fields),editor)


	firebaseRef.on("child_added", function(snap) {
	    directory_addresses = snap.getRef().path.n
	    id = directory_addresses[directory_addresses.length-1]
	    firebase_dictionary = snap.val()
	    firebase_dictionary['DT_RowId'] = id
	    key_check_func_dictionary(fields,firebase_dictionary)
	    console.log(firebase_dictionary)
	    table.row.add(firebase_dictionary).draw(false);
	})


}

function firebase_dataeditor_table_editor_instance_options(firebaseRef,row_id){
	
	row_id = row_id || 'DT_RowId'

	editor.on("postSubmit", function(e, json, data, action, xhr) {


	if (action == 'edit'){
	  json_array = json.data;
	  json_array.forEach(function(D) {
	    record_id = D[row_id];
	    D["time_stamp"] = moment().format();
	    firebaseRef.child(record_id).set(D);
	  });	
	}
	else {
		items_to_add = Object.values(data.data)
		items_to_add.forEach(function(item){
			item['time_stamp'] = moment().format()
			r = firebaseRef.push(item)
			//console.log(r)
		})

	}});

}

function firebase_dataeditor_table_editor_instance(table_id,fields,firebaseRef,row_id){
	row_id = row_id || 'DT_RowId'
	editor = new $.fn.dataTable.Editor({
		table:table_id,
		idSrc:  row_id,
		fields: editor_fields_array_from_custom_fields(fields)
	});

	firebase_dataeditor_table_editor_instance_options(firebaseRef,row_id)
	return editor 
}



function firebase_dataeditor_table_generate(table_id,fields,firebaseRef,row_id){
	//DEFINE FIREBASE
	//firebase.initializeApp({databaseURL: "https://shippy-ac235.firebaseio.com/"});
	//var dbRef = firebase.database();
	var firebaseRef = firebaseRef||dbRef.ref('drogas');
	table_id =  table_id||"#ds_table"
	fields = fields||['input_text','date_time','type','within_system','DT_RowId']
	row_id = row_id || 'DT_RowId'

	editor = firebase_dataeditor_table_editor_instance(table_id,fields,firebaseRef,row_id)
	table = datatables_initiate_render(table_id,datatable_fields_array_from_custom_fields(fields),editor)


	firebaseRef.on("child_added", function(snap) {
	    directory_addresses = snap.getRef().path.n
	    id = directory_addresses[directory_addresses.length-1]
	    firebase_dictionary = snap.val()
	    firebase_dictionary['DT_RowId'] = id
	    key_check_func_dictionary(fields,firebase_dictionary)
	    console.log(firebase_dictionary)
	    table.row.add(firebase_dictionary).draw(false);
	})


}