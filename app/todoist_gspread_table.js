function percentage_complete_metric_generate(gspread_array){
  complete_array = gspread_array.filter(function(D){return D.status == 'Green'})
  percentage_complete = (complete_array.length/gspread_array.length)*100
  title_text = 'Complete %'
  metric_text = percentage_complete.toFixed(1) + "%"
  sub_title = 'Remaining: ' + (gspread_array.length - complete_array.length)
  sub_metric_text = complete_array.length + "/" + gspread_array.length



  percentage_to_goal = parseFloat(complete_array.length/gspread_array.length)
  console.log(percentage_to_goal)
  if (.4 > percentage_to_goal){
  label_color  =  {'green':'label-primary','amber':'label-warning','red':'label-danger'}['red']

  }
  else if (.7 > percentage_to_goal){
  label_color  =  {'green':'label-primary','amber':'label-warning','red':'label-danger'}['amber']

  }
  else if ( .9 > percentage_to_goal){
  label_color  =  {'green':'label-primary','amber':'label-warning','red':'label-danger'}['green']
  }
  else {
    label_color = 'label-default'
  }

  $('#metric_headers').append(metric_header_create_label(title_text,sub_title,metric_text,sub_metric_text,"gspread_percentage",label_color))




}

//remaining tasks populate
function remaining_tasks_populate(gspread_array){
  $.fn.dataTable.ext.type.order["number-float-pre"] = function(d) {
    r = parseFloat(d)||-1000
    return r;
  };

  $.fn.dataTable.ext.type.order["moment-sort-pre"] = function(d) {
    input_date = $(d)[0].attributes[0].nodeValue
    r = moment(input_date, "MM/DD/YY hh:mm:ssA (dd)").valueOf()
    //console.log({input_date:input_date,d:d,r:r})
    // r = parseFloat(d)||-1000
    return r;
  };

  columns = [
    {data:'Task',title:'Task',name:'Task'},
    {data:'days_remaining',title:'days_remaining',name:'days_remaining',visible:false,type:'number-float',render:number_format_render},
    {data:'due_date',title:'Time Remaining',name:'time_remaining',visible:true,render:moment_from_now_reder,type:'moment-sort'},
    {data:'Estimated Duration',title:'Estimated Duration',name:'Estimated Duration',visible:false},
    {data:'status',title:'status',name:'status',visible:false},
    {data:'days_to_incomplete',title:'days_to_incomplete',name:'days_to_incomplete',visible:false},
    {data:'days_since_last_completed',title:'days_since_last_completed',name:'days_since_last_completed',visible:false},
    {data:'due_date',title:'due_date',name:'due_date',visible:false,createdCell:date_time_datatable_format},
    {data:'task_assigned',title:'task_assigned',name:'task_assigned',visible:false},
    {data:'Category',title:'Category',name:'Category',visible:false},
    {data:'project_id',title:'project_id',name:'project_id',visible:false}
    ]


    array_check_keys(gspread_array,_.map(columns,function(D){return D['data']}))
    editor = new $.fn.dataTable.Editor({
      table: "#remaining_tasks_table",
      idSrc:  'Task',
      fields: [{ label: "Task:", name: "Task" },{ label: "project_id:", name: "project_id" }]
    });


    editor.on("postSubmit", function(e, json, data, action, xhr) {
      console.log(json)
      console.log(action)
      console.log(e)
        items_to_delete = Object.values(data.data)
        console.log(items_to_delete)
        items_to_delete.forEach(function(todoist_dictionary){
          console.log(todoist_dictionary)
              task_create_todoist(todoist_dictionary.Task,todoist_dictionary.project_id)

   

        })

    });

    dt = $("#remaining_tasks_table").DataTable({
    paging: false,
    dom: '<"html5buttons"B>lTfgitp',
    data: gspread_array,
    scrollY:"200px",
    columns:columns,
    select: true,
    colReorder: true,
    createdRow: function( row, data, dataIndex){
                if( data['days_remaining'] < 0){
                    $(row).addClass('danger');
                }
                else if( data['days_remaining'] < 1){
                    $(row).addClass('warning');
                }
                else {
                    $(row).addClass('success');
                }
            },
    buttons: [
    { extend: "excel", title: document.title },
    { extend: "colvis", title: document.title },
    { extend: "edit", editor: editor },

    {text: 'Add',name:'Add', action: function ( e, dt, node, config ) {

                row_data = dt.rows( { selected: true } ).data()[0]
                console.log(row_data)
              task_create_todoist(row_data.Task,row_data.project_id)

        },






                //ref.child('detail').push(row_data)
        },
    {text: 'Not Assigned',name:'Not Assigned', action: function ( e, dt, node, config ) {
          dt.columns('task_assigned:name').search('Red').draw()
        }},
    {text: 'Not Assigned All',name:'Not Assigned', action: function ( e, dt, node, config ) {
          dt.columns('task_assigned:name').search('Amber').draw()
        }},
     {text: 'Red',name:'Red', action: function ( e, dt, node, config ) {
          dt.columns('status:name').search('Red').draw()
        }},
     {text: 'Clear',name:'Clear', action: function ( e, dt, node, config ) {
          dt.columns('').search('').draw()
        }}, 
    ],
    order: [2, "asc"]
    });
    //dt.columns('status:name').search('^((?!Green).)*$',true,false).draw()
}





