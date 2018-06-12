function percentage_complete_metric_generate(gspread_array){
  complete_array = gspread_array.filter(function(D){return D.status == 'Green'})
  percentage_complete = (complete_array.length/gspread_array.length)*100
  title_text = 'Complete %'
  metric_text = percentage_complete.toFixed(1) + "%"
  sub_title = '-'
  sub_metric_text = complete_array.length + "/" + gspread_array.length
  $('#metric_headers').append(metric_header_create(title_text,sub_title,metric_text,sub_metric_text))
}

//remaining tasks populate
function remaining_tasks_populate(gspread_array){
    dt = $("#remaining_tasks_table").DataTable({
    paging: false,
    dom: '<"html5buttons"B>lTfgitp',
    data: gspread_array,
    columns:[
    {data:'Task',title:'Task',name:'Task'},
    {data:'status',title:'status',name:'status',visible:false}

    ],
    select: true,
    colReorder: true,
    buttons: [
    { extend: "excel", title: document.title },
    { extend: "colvis", title: document.title }
    ],
    order: [0, "desc"]
    });
    dt.columns('status:name').search('^((?!Green).)*$',true,false).draw()
}