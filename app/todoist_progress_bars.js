


function progress_bar_table_formulate(table_id){
	var firebaseRef = dbRef.ref('cruz_control').child('progress');
	fields = ['name','multiplier','description','percentage']
	table_id =  table_id||"#progress_table"

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
				//console.log(r)
			})

	}});


	table = $(table_id).DataTable({
            paging:false,
            dom: '<"html5buttons"B>lTfgitp',
            data: [],
            columns: [
                {data:'name',title:'name',visible:true,name:'name',createdCell: bar_create_datatable_cell,className:'progress_metric_measure'},
                {data:'multiplier',title:'multiplier',visible:false,name:'multiplier'},
                {data:'description',title:'description',visible:false,name:'description'},
                {data:'time_stamp',title:'time_stamp',visible:false,name:'time_stamp'},
                {data:'DT_RowId',title:'DT_RowId',visible:false,name:'DT_RowId'}
            ],
            select: true,
            colReorder: true,
            buttons: [
                { extend: "excel", title: document.title },
                { extend: "colvis", title: document.title },
        		{ extend: 'create', editor: editor },
                { extend: "edit", editor: editor },
                {text: 'Clear',name:'Clear', action: function ( e, dt, node, config ) {
                  dt.columns('').search('').draw()
                }}]
        });


	firebaseRef.on("child_added", function(snap) {
	    directory_addresses = snap.getRef().path.n
	    id = directory_addresses[directory_addresses.length-1]
	    firebase_dictionary = snap.val()
	    firebase_dictionary['DT_RowId'] = id
	    table.row.add(firebase_dictionary).draw(false);
	})


}