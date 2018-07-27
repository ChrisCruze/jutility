

function datatables_column_add_formatting_from_type(new_dictionary){
    if (new_dictionary.format == 'date'){
        new_dictionary.createdCell = date_time_datatable_format
    }
    if (new_dictionary.format == 'number'){
        new_dictionary.type = "number-order"
    }
    if (new_dictionary.format == 'url'){
                new_dictionary.render = function(data,type,row,meta){



                      title = row.name||row.title
                      return "<a target='_blank' href='"+data+"'>" +title + "</a>"


                }
        new_dictionary.createdCell = url_create_datatables
    }
    if (new_dictionary.visible == 'false'){
        new_dictionary.visible = false
    }
    if (new_dictionary.format == 'vote'||new_dictionary.format == 'rank'){
        new_dictionary.render = function(data,type,row,meta){
              cellData = parseFloat(data)||0
              field_name = new_dictionary.name
              return '<div class="vote-actions"> <a href="#" class="rank up" iterator="1" field="'+field_name+'"> <i class="fa fa-chevron-up"> </i> </a> <div>'+cellData+'</div> <a href="#" class="rank down" iterator="-1" field="'+field_name+'"> <i class="fa fa-chevron-down"> </i> </a> </div>'



            //vote_created_cell_editor(new_dictionary.name)()
        }

        //new_dictionary.createdCell = vote_created_cell_editor(new_dictionary.name)   //vote_created_cell //vote_created_cell_editor(editor) //vote_created_cell
    }

}

function datatable_column_fields_generate(custom_fields,params){
    l = []
    custom_fields.forEach(function(custom_field){
        if (typeof custom_field === "object"){
            custom_field_name = custom_field['data']
            custom_dictionary = {data:custom_field_name, name: custom_field_name,title:custom_field_name,label: custom_field_name}
            new_dictionary = combine_dicts(custom_dictionary,custom_field)
            datatables_column_add_formatting_from_type(new_dictionary)
        }
        else {
            default_visible = true
            if (params.default_visible != undefined){
                default_visible = params.default_visible
            }
            new_dictionary = {data:custom_field, name: custom_field,title:custom_field,label:custom_field,visible:default_visible}

        }
        l.push(new_dictionary)
    })
    //console.log(l)
    return l
}


function dataeditor_firebase_instance_generate_options(firebaseRef,row_id,params){

    row_id = row_id || 'DT_RowId'



    editor.on("preSubmit", function(e, data, action) {
    if (action == 'create'){
        //console.log(data)
        //console.log(action)
        items_to_add = Object.values(data.data)
        items_to_add.forEach(function(item){
        item['time_stamp'] = moment().format()
        item['created_time'] = moment().format()
        submit_attributes = params.submit_attributes||{}
        item = combine_dicts(item,submit_attributes)
        r = firebaseRef.push(item)



    })



        editor.close()
        return false

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
            //console.log(r)
        })

    }
    else {
        return false 
        // //console.log(e)
        // //console.log(json)
        // //console.log(data)
        // //console.log(action)



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

function datatable_generate(table_id,columns_list,editor,params){
    //input_data = input_data || {}
    params = params || {}

    button_params = [
    { extend: "excel", title: document.title },
    { extend: "colvis", title: document.title },
    { extend: 'create', editor: editor,text:'Create'},
    // { editor: editor,text:'Add',action:function () {//console.log(this)} },
    { extend: 'remove', editor: editor },
    { extend: "edit", editor: editor },
    {text: 'Clear',name:'Clear', action: function ( e, dt, node, config ) {
        dt.columns('').search('').draw()
        $.fn.dataTable.ext.search = []
        dt.draw()
    }}]

    if (params.additional_buttons != undefined){
        button_params = button_params.concat(params.additional_buttons)
    }

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
    autoWidth: true,
    buttons: button_params
    });
    return table_example
}

function editor_rank_apply(editor,table_id){

    $(table_id).on("click", "tbody .rank", function(e) {
        e.preventDefault()
        var table = $(table_id).DataTable();
        //cell_data = parseFloat(table.cell($(this).closest('td')).data())
        row_data = table.row($(this).closest('td')).data();
        console.log(row_data)
        iterator = parseFloat($(this).attr('iterator'))
        field = $(this).attr('field')
        cell_data = parseFloat(row_data[field])||0

        change_value = cell_data + iterator
        // console.log(iterator)
        // console.log('field')

        // console.log(field)
        // console.log('cell_data')

        // console.log(cell_data)
        // console.log('change_value')

        // console.log(change_value)

        col_num_selector = $(this).closest('td')
        //var col = $(col_num_selector).parent().children().index($(col_num_selector));
        // console.log(col_num_selector)
        // console.log(editor)

    editor
    .edit(col_num_selector, false)
    .set(field, change_value)
    .submit();


    });


}


function firebase_dataeditor_table_generate_core(table_id,fields,firebaseRef,row_id,params){

    var firebaseRef = firebaseRef||dbRef.ref('drogas');
    table_id = table_id||"#ds_table"
    fields = fields||['input_text','date_time','type','within_system','DT_RowId']
    row_id = row_id || 'DT_RowId'


    new_fields = datatable_column_fields_generate(fields,params)

    editor = dataeditor_firebase_instance_generate(table_id,new_fields,firebaseRef,row_id,params)
    table = datatable_generate(table_id,new_fields,editor,params)

    firebaseRef.on("child_added", function(snap) {

        directory_addresses = snap.getRef().path.n
        id = directory_addresses[directory_addresses.length-1]
        firebase_dictionary = snap.val()
        ////console.log(firebase_dictionary)
        firebase_dictionary['DT_RowId'] = id


        if (params.process_function != undefined){
            firebase_dictionary = params.process_function(firebase_dictionary)
        }
        
        fields_to_check = _.map(new_fields,function(D){return D['data']})
        key_check_func_dictionary(fields_to_check,firebase_dictionary)
        table.row.add(firebase_dictionary).draw(false);
    })


    editor_rank_apply(editor,table_id)
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
    //console.log(params)
    //console.log('AQUI AQUI')
    return datatables_firebase_table_generate(params)
}

function firebase_json_pull_promise_pull_simple(){
    firebase_json_pull_promise().then(function(resp) {
        //console.log(resp)
        resp2 = Object.values(resp)
        //console.log(resp2)
  //console.log(firebase_json_pull_promise_pull(resp2))
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


function datatables_firebase_columns_define(params){
    ref = params.firebase_reference
    function firebase_pull_json() {
      return new Promise(function(resolve, reject){
        ref.limitToLast(1).on("child_added", function(snapshot) {
            resolve(snapshot.val())
        })  
      })};
    var p1 = firebase_pull_json();
    p1.then(function(array){
      col_names = Object.keys(array)
      if (params.columns != undefined){
        console.log(params.columns)

        console.log(col_names)
        col_names_to_add = _.difference(col_names,_.map(params.columns,function(D){return D.data||D}))
        console.log(col_names_to_add)
        col_names = params.columns.concat(col_names_to_add)
        console.log(col_names)
        //col_names = Object.keys(_.groupBy(col_names))
      }
      //console.log(col_names)
      params.columns = col_names 
      datatables_firebase_table_generate(params)
    });

}

//datatables_firebase
//{table_selector:"#table",firebase_reference:firebase.database().ref('bug_features'),columns:['date']})
//datatables_firebase({firebase_url:"https://shippy-ac235.firebaseio.com/drogas.json", table_selector:"#table"})
function datatables_firebase(params){
if (params.columns == undefined||params.columns_generate == true){
    datatables_firebase_columns_define(params)
}
else {
    table = datatables_firebase_table_generate(params)
    params.table = table
}
    //table = datatables_firebase_table_generate_simple(params)
    return params
}







