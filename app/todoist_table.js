

function header_metrics_create_todoist(){
  sub_title = '-'
  metric_text = '-'
  sub_metric_text = '-'
  id = 'null'
  // $('#metric_headers').append(metric_header_create('Tasks Completed',sub_title,metric_text,sub_metric_text,'tasks_completed_number'))
  // $('#metric_headers').append(metric_header_create('Tasks Number',sub_title,metric_text,sub_metric_text,'tasks_current_number'))
  // $('#metric_headers').append(metric_header_create('Average',sub_title,metric_text,sub_metric_text,'tasks_age'))

  $('#metric_headers').append(metric_header_create_label('Tasks Completed',sub_title,metric_text,sub_metric_text,'tasks_completed_number'))
  $('#metric_headers').append(metric_header_create_label('Tasks Number',sub_title,metric_text,sub_metric_text,'tasks_current_number'))
  $('#metric_headers').append(metric_header_create_label('Age',sub_title,metric_text,sub_metric_text,'tasks_age'))




}


function percentage_sub_text(id,total_tasks,total_goal_tasks){
  id = id || "#tasks_current_number"
  total_tasks = total_tasks || 5
  total_goal_tasks = total_goal_tasks || 10

  percentage_to_goal = total_tasks/total_goal_tasks
  percentage_text = (percentage_to_goal * 100).toFixed(1) + "%"
  num_denominator = total_tasks + "/" + total_goal_tasks

  $(id).find(".sub_metric_text").html(num_denominator+"|"+percentage_text)
  add_percentage_label_html(id,percentage_to_goal)

  label_object = $(id).find(".sub_metric_text")

  if (percentage_to_goal <= 1){
    add_remove_labels(label_object,'green')
  }
  else if (percentage_to_goal <= 5){
    add_remove_labels(label_object,'amber')
  }
  else {
    add_remove_labels(label_object,'red')
  }

}

function current_tasks_call_back(callback_array){
  total_count = callback_array.length

  task_dates = Object.keys(_.groupBy(callback_array,function(D){return moment(D['task_date']).format("MM/DD/YY")})).length 

  // max_date = max_date_from_array_underscore(callback_array)['task_date']
  // min_date = min_date_from_array_underscore(callback_array)['task_date']
  // dates_between = dates_between_dates_moment(min_date,max_date)
  // days = dates_between.length
  $('#tasks_current_number').find(".metric_text").html(total_count)
  $('#tasks_current_number').find(".sub_title").html(task_dates + " Days")
  goal_number = 20

  task_age = (sum_float_convert_from_array_underscore(callback_array,'age')/callback_array.length).toFixed(1) 
  percentage_sub_text('#tasks_age',task_age,3)
  $('#tasks_age').find(".metric_text").html(task_age)


  percentage_sub_text('#tasks_current_number',total_count,goal_number)


  // var sum_total = sum_float_convert_from_array_underscore(callback_array,'duration')
  // $("."+'Total').find(".metric_text").html(sum_total)
}

function add_percentage_label_html(id,percentage_to_goal){
  id = id||'#tasks_completed_number'
  percentage_to_goal = percentage_to_goal||.5
  label_object = $(id).find(".sub_metric_text")
  .4 < percentage_to_goal && add_remove_labels(label_object,'red');
  .7 < percentage_to_goal && add_remove_labels(label_object,'amber');
  .9 < percentage_to_goal && add_remove_labels(label_object,'green');

}
function completed_tasks_call_back(callback_array){
  task_dates = Object.keys(_.groupBy(callback_array,function(D){return moment(D['task_date']).format("MM/DD/YY")})).length 

  try {
  console.log(progress_table)
  if (progress_table.rows().length > 0){

  $("td.progress_metric_measure").each(function(e) {
      row_data = progress_table.row(this).data();

      multiplier = parseFloat(row_data.multiplier)||0
      duration = array_filter_from_text_sum(callback_array,row_data["name"],"content","duration")
      denom = (task_dates * multiplier)
      percentage = (duration/denom) * 100
      percentage_text = percentage.toFixed(2)   + "%" + " " + String(duration) + "/" + denom

      $(this).find(".percentage_text").html(percentage_text)
      $(this).find(".progress-bar").attr("style","width:" + String(percentage) + "%")

  })



  }

  }
  catch(err){
    console.log(err)
  }




  total_tasks = callback_array.length
  $('#tasks_completed_number').find(".metric_text").html(total_tasks)


  //$('#tasks_completed_number').find(".sub_title").html(task_dates + " Days")

  average_tasks = (total_tasks/task_dates).toFixed(1)
  goal_task_per_day = 15
  total_goal_tasks = goal_task_per_day * task_dates
  percentage_to_goal = total_tasks/total_goal_tasks

  percentage_text = (percentage_to_goal * 100).toFixed(1) + "%"
  num_denominator = total_tasks + "/" + total_goal_tasks

  $('#tasks_completed_number').find(".sub_metric_text").html(num_denominator+"|"+percentage_text+"|"+average_tasks + " Avg")
  // label_object = $('#tasks_completed_number').find(".sub_metric_text")
  // .4 < percentage_to_goal && add_remove_labels(label_object,'red');
  // .7 < percentage_to_goal && add_remove_labels(label_object,'amber');
  // .9 < percentage_to_goal && add_remove_labels(label_object,'green');

  add_percentage_label_html('#tasks_completed_number',percentage_to_goal)


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
      if (action == 'remove'){
        items_to_delete = Object.values(data.data)
        items_to_delete.forEach(function(todoist_dictionary){
              todoist_delete_task(todoist_dictionary.id)

          //   {
          //     "day_order": -1,
          //     "assigned_by_uid": 14054638,
          //     "is_archived": 0,
          //     "labels": [],
          //     "sync_id": 2686100363,
          //     "date_completed": null,
          //     "all_day": false,
          //     "in_history": 0,
          //     "date_added": "Sat 09 Jun 2018 23:51:25 +0000",
          //     "indent": 1,
          //     "date_lang": null,
          //     "id": 2686100363,
          //     "priority": 1,
          //     "checked": 0,
          //     "user_id": 14054638,
          //     "due_date_utc": "null",
          //     "content": "test3",
          //     "parent_id": null,
          //     "item_order": 44,
          //     "is_deleted": 0,
          //     "responsible_uid": null,
          //     "project_id": 2159935681,
          //     "collapsed": 0,
          //     "date_string": null,
          //     "task_type": "current",
          //     "task_date": "null",
          //     "age": 5,
          //     "sub_project": "test3",
          //     "duration": 0,
          //     "cost": 0,
          //     "DT_RowId": 2686100363,
          //     "project_name": "Bnb",
          //     "task_date_range": "",
          //     "completed_date": "null",
          //     "status": "null",
          //     "notes": "null"
          // }

        })
      }
      else {
        json_array = json.data;
        json_array.forEach(function(D) {
          record_id = D["DT_RowId"];
          D["timestamp"] = moment().format();
          FirebaseRef.child(record_id).set(D);
        });
      }
    });

    //based on filter from table , update a funciton
    function callback_function() {
      var api = this.api();
      callback_array = api.rows({ page: "current" }).data();
      metric_headers_update_list(callback_array)
    }
    columns = [
        {
          data: "content",
          title: "content",
          visible: true,
          name: "content"
        },
        {
          data: "project_name",
          title: "project_name",
          visible: true,
          name: "project_name"
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
      ]
    table = $(table_id).DataTable({
      paging: false,
      dom: '<"html5buttons"B>lTfgitp',
      data: array,
      columns: columns,
      select: true,
      colReorder: true,
      drawCallback: callback_function,
      buttons: [
        { extend: "excel", title: document.title },
        { extend: "colvis", title: document.title },
        { extend: "edit", editor: editor },
        { extend: "remove", editor: editor },
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
    column_header_filterable_autocomplete_apply(table,columns.length)
    return table 
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
