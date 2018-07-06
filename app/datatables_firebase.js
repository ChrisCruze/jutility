

function datatables_column_add_formatting_from_type(new_dictionary){
    if (new_dictionary.format == 'date'){
        new_dictionary.createdCell = date_time_datatable_format
    }

}

function datatable_column_fields_generate(custom_fields){
    l = []
    custom_fields.forEach(function(custom_field){
        if (typeof custom_field === "object"){
            custom_field_name = custom_field['data']
            custom_dictionary = {data:custom_field_name, name: custom_field_name,title:custom_field_name,label: custom_field_name}
            new_dictionary = combine_dicts(custom_dictionary,custom_field)
            datatables_column_add_formatting_from_type(new_dictionary)
        }
        else {
            new_dictionary = {data:custom_field, name: custom_field,title:custom_field,label:custom_field}

        }
        l.push(new_dictionary)
    })
    console.log(l)
    return l
}


function dataeditor_firebase_instance_generate_options(firebaseRef,row_id){

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
    else if (action == 'remove'){
        items_to_delete = Object.values(data.data)
        items_to_delete.forEach(function(D){
            record_id = D[row_id];
            r = firebaseRef.child(record_id).remove();
            console.log(r)
        })

    }
    else {
        items_to_add = Object.values(data.data)
        items_to_add.forEach(function(item){
        item['time_stamp'] = moment().format()
        r = firebaseRef.push(item)
        //console.log(r)
    })

}})}

function dataeditor_firebase_instance_generate(table_id,fields,firebaseRef,row_id){
    row_id = row_id || 'DT_RowId'
    editor = new $.fn.dataTable.Editor({
        table:table_id,
        idSrc: row_id,
        fields: fields
    });
    dataeditor_firebase_instance_generate_options(firebaseRef,row_id)
    return editor
}

function datatable_generate(table_id,columns_list,editor,input_data){
    input_data = input_data || {}
    table_example = $(table_id).DataTable({
    dom: '<"html5buttons"B>lTfgitp',
    data: [],
    columns:columns_list,
    // columns: [
    // {data:'account_name',title:'Account Name',name:'Account Name',visible:true},
    // ],
    select: true,
    paging:false,
    colReorder: true,
    buttons: [
    { extend: "excel", title: document.title },
    { extend: "colvis", title: document.title },
    { extend: 'create', editor: editor },
    { extend: 'remove', editor: editor },
    { extend: "edit", editor: editor },
    {text: 'Clear',name:'Clear', action: function ( e, dt, node, config ) {
        dt.columns('').search('').draw()
        $.fn.dataTable.ext.search = []
        dt.draw()
    }}]
    });
    return table_example
}


function firebase_dataeditor_table_generate_core(table_id,fields,firebaseRef,row_id){

    var firebaseRef = firebaseRef||dbRef.ref('drogas');
    table_id = table_id||"#ds_table"
    fields = fields||['input_text','date_time','type','within_system','DT_RowId']
    row_id = row_id || 'DT_RowId'

    new_fields = datatable_column_fields_generate(fields)
    
    editor = dataeditor_firebase_instance_generate(table_id,new_fields,firebaseRef,row_id)
    table = datatable_generate(table_id,new_fields,editor)

    firebaseRef.on("child_added", function(snap) {
        directory_addresses = snap.getRef().path.n
        id = directory_addresses[directory_addresses.length-1]
        firebase_dictionary = snap.val()
        firebase_dictionary['DT_RowId'] = id
        fields_to_check = _.map(new_fields,function(D){return D['data']})
        key_check_func_dictionary(fields_to_check,firebase_dictionary)
        table.row.add(firebase_dictionary).draw(false);
    })

    return table
}



function datatables_firebase_table_generate(params){
    table_selector = params.table_selector||"#table"
    table_row_id = params.table_row_id||'DT_RowId'
    var firebaseRef = params.firebase_reference||firebase.database().ref('bug_features');
    return firebase_dataeditor_table_generate_core(table_selector,params.columns,firebaseRef,table_row_id)
}


