

function header_metrics_create_todoist(){
  sub_title = '-'
  metric_text = '-'
  sub_metric_text = '-'
  id = 'null'
  $('#metric_headers').append(metric_header_create('Tasks Completed',sub_title,metric_text,sub_metric_text,'tasks_completed_number'))
  $('#metric_headers').append(metric_header_create('Tasks Number',sub_title,metric_text,sub_metric_text,'tasks_current_number'))
  $('#metric_headers').append(metric_header_create('Average',sub_title,metric_text,sub_metric_text,'tasks_age'))
}


function current_tasks_call_back(callback_array){
  $('#tasks_current_number').find(".metric_text").html(callback_array.length)
  $('#tasks_age').find(".metric_text").html((sum_float_convert_from_array_underscore(callback_array,'age')/callback_array.length).toFixed(1) )



  // var sum_total = sum_float_convert_from_array_underscore(callback_array,'duration')
  // $("."+'Total').find(".metric_text").html(sum_total)
}

function completed_tasks_call_back(callback_array){
  $('#tasks_completed_number').find(".metric_text").html(callback_array.length)
  // var sum_total = sum_float_convert_from_array_underscore(callback_array,'duration')
  // $("."+'Total').find(".metric_text").html(sum_total)
}

function todoist_table_create_current(array,table_id,metric_headers_update_list){
    $.fn.dataTable.ext.type.order["date-format-moment-pre"] = function(d) {
      r = moment(d).utc();
      return r;
    };


    function array_dictionary_customize(item, index) {
      item["DT_RowId"] = item.id;
    }

    array.forEach(array_dictionary_customize);
    array = firebase_array_integrate(array,"https://shippy-ac235.firebaseio.com/omni/"+omni_node+".json","DT_RowId",['status','notes'])

    editor = new $.fn.dataTable.Editor({
      table: table_id,
      fields: [{ label: "status:", name: "status" },{ label: "notes:", name: "notes" }]
    });

    editor.on("postSubmit", function(e, json, data, action, xhr) {
      json_array = json.data;
      json_array.forEach(function(D) {
        record_id = D["DT_RowId"];
        D["timestamp"] = moment().format();
        FirebaseRef.child(record_id).set(D);
      });
    });

    //based on filter from table , update a funciton
    function callback_function() {
      var api = this.api();
      callback_array = api.rows({ page: "current" }).data();
      metric_headers_update_list(callback_array)
    }

    $(table_id).DataTable({
      paging: false,
      dom: '<"html5buttons"B>lTfgitp',
      data: array,
      columns: [
        {
          data: "content",
          title: "content",
          visible: true,
          name: "content"
        },
        {
          data: "duration",
          title: "duration",
          visible: true,
          name: "duration",
          type:"number-order"
        },
        {
          data: "age",
          title: "age",
          visible: true,
          name: "age",
          type: "number-order"
        },
        {
          data: "sub_project",
          title: "sub_project",
          visible: false,
          name: "sub_project"
        },
        {
          data: "status",
          title: "status",
          visible: false,
          name: "status"
        },
        {
          data: "notes",
          title: "notes",
          visible: false,
          name: "notes"
        },
        {
          data: "task_date",
          title: "task_date",
          visible: false,
          name: "task_date",
          createdCell: date_format_with_day,
          type: "date-format-moment"
        },
        {
          data: "task_date_range",
          title: "task_date_range",
          visible: false,
          name: "task_date_range"
        },
         {
          data: "task_type",
          title: "task_type",
          visible: false,
          name: "task_type"
        }
      ],
      select: true,
      colReorder: true,
      drawCallback: callback_function,
      buttons: [
        { extend: "excel", title: document.title },
        { extend: "colvis", title: document.title },
        { extend: "edit", editor: editor },
        {text: 'Clear',name:'Clear', action: function ( e, dt, node, config ) {
          dt.columns('').search('').draw()
        }},
         {text: 'Current',name:'Current', action: function ( e, dt, node, config ) {
          dt.columns('task_type:name').search('current').draw()
        }},
          {text: 'Complete',name:'Complete', action: function ( e, dt, node, config ) {
          dt.columns('task_type:name').search('complete').draw()
        }},
        {text: 'Today',name:'Today', action: function ( e, dt, node, config ) {
          dt.columns('task_date_range:name').search('today').draw()
        }},
        {text: 'This Week',name:'This Week', action: function ( e, dt, node, config ) {
          dt.columns('task_date_range:name').search('this_week').draw()
        }},
         {text: 'This Month',name:'This Month', action: function ( e, dt, node, config ) {
          dt.columns('task_date_range:name').search('this_month').draw()
        }},
        {text: 'This Year',name:'This Year', action: function ( e, dt, node, config ) {
          dt.columns('task_date_range:name').search('this_year').draw()
        }}
      ],
      order: [3, "desc"]
    });
}



function todoist_table_create_complete(array,table_id,metric_headers_update_list){
    $.fn.dataTable.ext.type.order["date-format-moment-pre"] = function(d) {
      r = moment(d).utc();
      return r;
    };


    function array_dictionary_customize(item, index) {
      item["DT_RowId"] = item.id;
    }

    array.forEach(array_dictionary_customize);
    array = firebase_array_integrate(array,"https://shippy-ac235.firebaseio.com/omni/"+omni_node+".json","DT_RowId",['status','notes'])

    editor = new $.fn.dataTable.Editor({
      table: table_id,
      fields: [{ label: "status:", name: "status" },{ label: "notes:", name: "notes" }]
    });

    editor.on("postSubmit", function(e, json, data, action, xhr) {
      json_array = json.data;
      json_array.forEach(function(D) {
        record_id = D["DT_RowId"];
        D["timestamp"] = moment().format();
        FirebaseRef.child(record_id).set(D);
      });
    });

    //based on filter from table , update a funciton
    function callback_function() {
      var api = this.api();
      callback_array = api.rows({ page: "current" }).data();
      metric_headers_update_list(callback_array)
    }

    table = $(table_id).DataTable({
      paging: false,
      dom: '<"html5buttons"B>lTfgitp',
      data: array,
      columns: [
        {
          data: "content",
          title: "content",
          visible: true,
          name: "content"
        },
        {
          data: "duration",
          title: "duration",
          visible: true,
          name: "duration"
        },
        {
          data: "sub_project",
          title: "sub_project",
          visible: true,
          name: "sub_project"
        },
        {
          data: "status",
          title: "status",
          visible: true,
          name: "status"
        },
        {
          data: "notes",
          title: "notes",
          visible: true,
          name: "notes"
        },
        {
          data: "task_date",
          title: "task_date",
          visible: true,
          name: "task_date",
          createdCell: date_format_with_day,
          type: "date-format-moment"
        },
        {
          data: "task_date_range",
          title: "task_date_range",
          visible: false,
          name: "task_date_range"
        },
         {
          data: "task_type",
          title: "task_type",
          visible: false,
          name: "task_type"
        }
      ],
      select: true,
      colReorder: true,
      drawCallback: callback_function,
      buttons: [
        { extend: "excel", title: document.title },
        { extend: "colvis", title: document.title },
        { extend: "edit", editor: editor },
        {text: 'Clear',name:'Clear', action: function ( e, dt, node, config ) {
          dt.columns('').search('').draw()
        }},
         {text: 'Current',name:'Current', action: function ( e, dt, node, config ) {
          dt.columns('task_type:name').search('current').draw()
        }},
          {text: 'Complete',name:'Complete', action: function ( e, dt, node, config ) {
          dt.columns('task_type:name').search('complete').draw()
        }},
        {text: 'Today',name:'Today', action: function ( e, dt, node, config ) {
          dt.columns('task_date_range:name').search('today').draw()
        }},
        {text: 'This Week',name:'This Week', action: function ( e, dt, node, config ) {
          dt.columns('task_date_range:name').search('this_week').draw()
        }},
         {text: 'This Month',name:'This Month', action: function ( e, dt, node, config ) {
          dt.columns('task_date_range:name').search('this_month').draw()
        }},
        {text: 'This Year',name:'This Year', action: function ( e, dt, node, config ) {
          dt.columns('task_date_range:name').search('this_year').draw()
        }}
      ],
      order: [3, "desc"]
    });

    table.columns('task_date_range:name').search('today').draw()
}
