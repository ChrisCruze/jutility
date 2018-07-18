

function datatables_column_add_formatting_from_type(new_dictionary){
    if (new_dictionary.format == 'date'){
        new_dictionary.createdCell = date_time_datatable_format
    }
    if (new_dictionary.format == 'number'){
        new_dictionary.type = "number-order"
    }
    if (new_dictionary.format == 'url'){
        new_dictionary.createdCell = url_create_datatables
    }
    if (new_dictionary.visible == 'false'){
        new_dictionary.visible = false
    }
    if (new_dictionary.format == 'vote'){
        new_dictionary.createdCell = vote_created_cell //vote_created_cell_editor(editor) //vote_created_cell
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


function dataeditor_firebase_instance_generate_options(firebaseRef,row_id,params){

    row_id = row_id || 'DT_RowId'
    editor.on("preSubmit", function(e, data, action) {
    if (action == 'create'){
        console.log(data)
        console.log(action)
        items_to_add = Object.values(data.data)
        items_to_add.forEach(function(item){
        item['time_stamp'] = moment().format()
        item['created_time'] = moment().format()
        submit_attributes = params.submit_attributes||{}
        item = combine_dicts(item,submit_attributes)
        r = firebaseRef.push(item)
        return false

    })


    }
    })


    editor.on("postSubmit", function(e, json, data, action, xhr) {

    if (action == 'edit'){
        json_array = json.data;
        json_array.forEach(function(D) {
        record_id = D[row_id];

        D["time_stamp"] = moment().format();
        D['modified_time'] = moment().format()

        edit_attributes = params.submit_attributes||params.edit_attributes
        D = combine_dicts(D,edit_attributes)

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
        return false 
        // console.log(e)
        // console.log(json)
        // console.log(data)
        // console.log(action)



}})}

function dataeditor_firebase_instance_generate(table_id,fields,firebaseRef,row_id,params){
    row_id = row_id || 'DT_RowId'
    editor = new $.fn.dataTable.Editor({
        table:table_id,
        idSrc: row_id,
        fields: fields
    });
    dataeditor_firebase_instance_generate_options(firebaseRef,row_id,params)
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
    scrollX: true,
    colReorder: true,
    buttons: [
    { extend: "excel", title: document.title },
    { extend: "colvis", title: document.title },
    { extend: 'create', editor: editor,text:'Create'},
    // { editor: editor,text:'Add',action:function () {console.log(this)} },
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


function firebase_dataeditor_table_generate_core(table_id,fields,firebaseRef,row_id,params){

    var firebaseRef = firebaseRef||dbRef.ref('drogas');
    table_id = table_id||"#ds_table"
    fields = fields||['input_text','date_time','type','within_system','DT_RowId']
    row_id = row_id || 'DT_RowId'


    new_fields = datatable_column_fields_generate(fields)
    editor = dataeditor_firebase_instance_generate(table_id,new_fields,firebaseRef,row_id,params)
    table = datatable_generate(table_id,new_fields,editor)

    firebaseRef.on("child_added", function(snap) {

        directory_addresses = snap.getRef().path.n
        id = directory_addresses[directory_addresses.length-1]
        firebase_dictionary = snap.val()
        console.log(firebase_dictionary)
        firebase_dictionary['DT_RowId'] = id
        fields_to_check = _.map(new_fields,function(D){return D['data']})
        key_check_func_dictionary(fields_to_check,firebase_dictionary)
        table.row.add(firebase_dictionary).draw(false);
    })


    return table
}


//datatables_firebase_table_generate({table_selector:"#table",firebase_reference:firebase.database().ref('bug_features'),columns:['date']})
function datatables_firebase_table_generate(params){
    table_selector = params.table_selector||"#table"
    table_row_id = params.table_row_id||'DT_RowId'
    var firebaseRef = params.firebase_reference||firebase.database().ref('bug_features');
    return firebase_dataeditor_table_generate_core(table_selector,params.columns,firebaseRef,table_row_id,params)
}

function firebase_json_pull_promise_original() {
  return new Promise(
    function(resolve) {
      setTimeout(function() {
        return resolve(firebase_json_pull("https://shippy-ac235.firebaseio.com/drogas.json"))
      }, 4000)
    },
    function(reject) {})
}


function firebase_json_pull_promise() {
  return new Promise(
    function(resolve) {
        return resolve(firebase_json_pull("https://shippy-ac235.firebaseio.com/drogas.json"))
    },
    function(reject) {})
}


function firebase_json_pull_promise_pull(array,params) {
    //array = firebase_json_pull(params['firebase_url'])
    params = params||{}
    key_names = Object.keys(array[0])
        columns_list = []
        key_names.forEach(function(i){
        columns_list.push({data:i,title:i,name:i})
    })
    params.columns = params.columns||key_names
    params['table_selector'] = "#ds_table"
    console.log(params)
    console.log('AQUI AQUI')
    return datatables_firebase_table_generate(params)
}

function firebase_json_pull_promise_pull_simple(){
    firebase_json_pull_promise().then(function(resp) {
        console.log(resp)
        resp2 = Object.values(resp)
        console.log(resp2)
  console.log(firebase_json_pull_promise_pull(resp2))
}
  )
}


function datatables_firebase_table_generate_simple(params){
    //params['firebase_reference'] = firebase.database().ref('drogas')
    params['firebase_url'] = params['firebase_url'] ||"https://shippy-ac235.firebaseio.com/drogas.json"
    array = firebase_json_pull(params['firebase_url'])
    key_names = Object.keys(array[0])
        columns_list = []
        key_names.forEach(function(i){
        columns_list.push({data:i,title:i,name:i})
    })
    params.columns = params.columns||key_names
    return datatables_firebase_table_generate(params)
}


//datatables_firebase
//{table_selector:"#table",firebase_reference:firebase.database().ref('bug_features'),columns:['date']})
//datatables_firebase({firebase_url:"https://shippy-ac235.firebaseio.com/drogas.json", table_selector:"#table"})
function datatables_firebase(params){
    table = datatables_firebase_table_generate(params)
    //table = datatables_firebase_table_generate_simple(params)
    params.table = table
    return params
}







