
function dataeditor_options_from_arrays(table_id,row_id,fields,editor_create_function,editor_update_function,editor_delete_function,params){
    editor_object = new $.fn.dataTable.Editor({
        table:table_id,
        idSrc: row_id,
        fields: fields
    });

    row_id = row_id || 'DT_RowId'
    editor_object.on("postSubmit", function(e, json, data, action, xhr) {
	    if (action == 'create'){
	        items_to_add = Object.values(data.data)
	        items_to_add.forEach(function(item){
	        	editor_create_function(item)
	        })
	    }
	    else if (action == 'edit'){
	        json_array = json.data;
	        json_array.forEach(function(D) {
	        	record_id = D[row_id];
	        	editor_update_function(D)
	    });}
	    else if (action == 'remove'){
	        items_to_delete = Object.values(data.data)
	        items_to_delete.forEach(function(D){
	        	editor_delete_function(D)
	        })
	    }
	    else {
	        return false }
	    })
    params.editor= editor_object
    return params
}


function datatable_generate_from_array(table_id,columns_list,editor,data,params){

    button_params = [
    { extend: "excel", title: document.title },
    { extend: "colvis", title: document.title },
    { extend: 'create', editor: editor,text:'Create'},
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

    config = {
        dom: '<"html5buttons"B>lTfgitp',
        data: data,
        columns:columns_list,
        select: true,
        ///drawCallback:function(){params.callback_function(this.api().rows({page:'current'}).data())} ,
        paging:false,
        scrollX: true,
        colReorder: true,
        autoWidth: true,
        buttons: button_params
    }
	if (params.callback_function != null){
	    config.drawCallback = function(){
	        data_callback = this.api().rows({page:'current'}).data()
	        
	        params.callback_function(data_callback.toArray())
	    }
	}

    if (params.sort != undefined){
        sort_order = params.sort_order||'desc'
        config.order = [[_.findIndex(columns_list,function(D){return D['data'] == params.sort}),'desc']]
    }
    params.config = config
    table_example = $(table_id).DataTable(config);
    params.table = table_example
    return params
}




//{columns,table_selector,row_id,editor_create_function,editor_update_function,editor_delete_function}
function datatables_generate_from_array(params){
	columns = params.columns 
	table_id = params.table_selector
	row_id = params.row_id||'DT_RowId'

	editor_create_function = params.editor_create_function
	editor_update_function = params.editor_update_function
	editor_delete_function = params.editor_delete_function



    params.fields = datatable_column_fields_generate(columns ,params)
    params.field_names  = _.map(fields,function(D){return D['data']})


    params = dataeditor_options_from_arrays(
    	table_id,
    	row_id,
    	params.fields,
    	editor_create_function,
    	editor_update_function,
    	editor_delete_function,
    	params)
    

    params.data = array_check_keys(params.data,params.field_names)
    params = datatable_generate_from_array(
    	params.table_selector,
    	params.fields,
    	params.editor,
    	params.data,
    	params)


    editor_rank_apply(params.editor,params.table_selector)



}





