//cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.12.4/css/bootstrap-select.min.css' 
https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.12.4/js/bootstrap-select.min.js"

function dropdown_option_add(text,field,subtext){
    subtext = subtext||''
    field = field||''
    var option_div =  $("<option>", {
        "data-subtext": subtext,
          "id":field + "_"+ text,
          "field":field,
          "value":text}).text(text)
    return option_div
}



function dropdown_options_add_from_array(parent_selector,data,key_name,params){
    selector_div = $("<select>", {
      "class":"selectpicker form-control",
      "id":parent_selector,
      "multiple":"",
      "data-live-search":'true',
      "title":"-",
      "data-size":"5",
      "data-header":"Please Select",
      "data-actions-box":"true",
      //"data-style":"btn-primary"
    })
    uniques_from_key = Object.keys(_.groupBy(data,function(D){return D[key_name]}))
    uniques_from_key.forEach(function(key){
        option_div = dropdown_option_add(key,key_name,'')
        selector_div.append(option_div)
    })
    console.log(selector_div)
    return selector_div
}


function filterable_dropdown_selectors_create(columns,data,filter_header_selector,thead_primary_row_selector){
    columns.forEach(function(column_dict,en){
        column_name = column_dict.data 
        column_name_selector = "#"+column_name+"_selector"
        selector_options = dropdown_options_add_from_array(column_name+"_selector",data,column_name)
        column_class_name = column_dict.className||''
        if (column_class_name.indexOf('rag_status') != -1){
            $(filter_header_selector).append( $("<th>", {"rowspan":"1",'width':"60px"}).append( selector_options))
            $(thead_primary_row_selector).append( $("<th>", {'width':"60px" }).text(column_name))
        }
        else {
            $(thead_primary_row_selector).append( $("<th>", {}).text(column_name))
            $(filter_header_selector).append( $("<th>", {"rowspan":"1"}).append( selector_options))
        }
    })
}


function select_picker_options_create(table_identifier,columns,data){
    $(table_identifier).prepend($('<thead> <tr id="thead_filter_row"> </tr> <tr id="thead_primary_row"> </tr> </thead>'))

    filterable_dropdown_selectors_create(columns,data,'#thead_filter_row','#thead_primary_row')
    $(".selectpicker").selectpicker()
}


function callback_function() { 
  var api = this.api();
  callback_array = api.rows({
    page: 'current'
  }).data()

  selectpicker_callback_array(columns,callback_array)
}



function uniques_from_array_key(data,key){
    uniques_from_key = Object.keys(_.groupBy(data,function(D){return D[key]}))
    return uniques_from_key
}

function show_options_hide(parent_selector,data,key){ 
    if (Object.keys($(parent_selector)).length > 0){
        if ($(parent_selector).val().length == 0){
            unique_values_to_show = uniques_from_array_key(data ,key )
            $(parent_selector).closest('th').find('li').each(function(row_number){
                item_text = $(this).text()
                if (unique_values_to_show.indexOf(item_text) != -1){
                  $(this).show()
                  }
              else {
                 $(this).hide()
              }
              $(this).addClass(item_text)
          })  
        }
    }
}

function selectpicker_callback_array(columns,callback_array){
    columns.forEach(function(column_dict, en) {
        column_name = column_dict.data
        column_name_selector = "#" + column_name + "_selector"
        show_options_hide(column_name_selector,callback_array,column_name)
    })
}



function any_of_items_true(l,search_field){
    if ( l != undefined){

    if (l.length > 0){

    r = false 
    l.forEach(function(i){
        is_true = search_field == i//search_field.indexOf(i) >= 0
        if (is_true){
            r = true
        }
    })
        }

    else {
        r = true
    }
    }
    else {
    r = true
    }
    return r 
}


function determine_if_any_of_fields_searched_on(configuration_data,rowData){
    l = []
    configuration_data.columns.forEach(function(column_dict,en){
        column_name = column_dict.data 
        column_name_selector = "#"+column_name+"_selector"
        r = any_of_items_true($(column_name_selector).val(),String(rowData[column_name]))
        l.push(r)
    })
    var allTrue = Object.keys(l).every(function(k){ return l[k] });
    return allTrue
}



function push_filter_to_datatables(configuration_data,table_identifier){
$.fn.dataTable.ext.search.push(   
    function(settings,searchData,index,rowData,counter){
      if (table_identifier == undefined||(table_identifier.indexOf(settings.nTable.id) > -1) ) {
        return determine_if_any_of_fields_searched_on(configuration_data,rowData) 
      }
      else {
        return true
      }
    }
)


$(".selectpicker").change(function() {
  $(table_identifier).DataTable().draw()
})
}




