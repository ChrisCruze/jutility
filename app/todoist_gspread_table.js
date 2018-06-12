function percentage_complete_metric_generate(gspread_array){
  complete_array = gspread_array.filter(function(D){return D.status == 'Green'})
  percentage_complete = (complete_array.length/gspread_array.length)*100
  title_text = 'Complete %'
  metric_text = percentage_complete.toFixed(1) + "%"
  sub_title = 'Remaining: ' + (gspread_array.length - complete_array.length)
  sub_metric_text = complete_array.length + "/" + gspread_array.length
  $('#metric_headers').append(metric_header_create(title_text,sub_title,metric_text,sub_metric_text))
}

//remaining tasks populate
function remaining_tasks_populate(gspread_array){
    dt = $("#remaining_tasks_table").DataTable({
    paging: false,
    dom: '<"html5buttons"B>lTfgitp',
    data: gspread_array,
    scrollY:"200px",
    columns:[
    {data:'Task',title:'Task',name:'Task'},
    {data:'Estimated Duration',title:'Estimated Duration',name:'Estimated Duration',visible:false},
    {data:'status',title:'status',name:'status',visible:false},
    {data:'task_assigned',title:'task_assigned',name:'task_assigned',visible:false},
    {data:'Category',title:'Category',name:'Category',visible:false},
    {data:'project_id',title:'project_id',name:'project_id',visible:false}
    ],
    select: true,
    colReorder: true,
    buttons: [
    { extend: "excel", title: document.title },
    { extend: "colvis", title: document.title },
    {text: 'Not Assigned',name:'Not Assigned', action: function ( e, dt, node, config ) {
          dt.columns('task_assigned:name').search('Red').draw()
        }},
     {text: 'Red',name:'Red', action: function ( e, dt, node, config ) {
          dt.columns('status:name').search('Red').draw()
        }},
     {text: 'Clear',name:'Clear', action: function ( e, dt, node, config ) {
          dt.columns('').search('').draw()
        }}, 
    ],
    order: [1, "asc"]
    });
    dt.columns('status:name').search('^((?!Green).)*$',true,false).draw()
}