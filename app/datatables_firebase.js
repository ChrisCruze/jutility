var dbRef = dbRef||firebase.database();                                           //define firebase #TODO
var FirebaseRef = dbRef.ref('dashbot').child('accounts')                          //define directory within firebase #TODO
var firebase_url = "https://shippy-ac235.firebaseio.com/dashbot/accounts.json"    //define url_directory within firebase #TODO
var array = guesty_integration_data_pull()                                        //Pull in data  #TODO
var custom_fields = ['status','notes']                                            //define custom fields #TODO



//define sorting order for datatables
$.fn.dataTable.ext.type.order["date-format-moment-pre"] = function(d) {
  r = moment(d).utc();
  return r;
};

//customize the array for appropriate keys #TODO
function array_dictionary_customize(item, index) {
  item["DT_RowId"] = item.id;
}
array.forEach(array_dictionary_customize);
array = firebase_array_integrate(array,firebase_url,"DT_RowId",custom_fields)


//define editor
editor = new $.fn.dataTable.Editor({
  table: "#table",
  fields: editor_fields_array_from_custom_fields(custom_fields)
});

editor.on("postSubmit", function(e, json, data, action, xhr) {
  json_array = json.data;
  json_array.forEach(function(D) {
    record_id = D["DT_RowId"];
    D["timestamp"] = moment().format();
    FirebaseRef.child(record_id).set(D);
  });
});

function callback_function() {
  var api = this.api();
  callback_array = api.rows({ page: "current" }).data();
}

//define the columns, button filters, and order field #TODO
$("#table").DataTable({
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
      createdCell: date_format_check_in,
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



