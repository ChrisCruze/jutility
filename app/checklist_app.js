sheet_name = "Inventory List";
spreadsheet_id = "1P0m6nu4CoXVD3nHrCgfm0pEvSpEkLsErjJxTLJLFjp8";
table_id = "#dates_table";
firebase_node = 'dashbot'
dashbot_node = 'inventory_checklist'

gspread_array_data = gspread_array_pull(sheet_name, spreadsheet_id);
var dbRef = dbRef||firebase.database();
var accountsRef = dbRef.ref(firebase_node).child(dashbot_node)
var firebase_url = "https://shippy-ac235.firebaseio.com/"+firebase_node+"/"+dashbot_node+".json"

function array_dictionary_customize(item, index) {
  item["DT_RowId"] = index;
  item["status"] = "null";
}

function array_firebase_merge(data_array) {
  firebase_dict = firebase_json_pull(
    firebase_url
  )||{}
  data_array.forEach(function(D) {
    firebase_defined_dict = firebase_dict[D["DT_RowId"]];
    if (firebase_defined_dict != undefined) {
      D["status"] = firebase_defined_dict["status"];
    } else {
      D["status"] = "Red";
    }
  });
  return data_array;
}

function status_format(td, cellData, rowData, row, col){
    if (rowData.status == 'Green'){
      html_result = '<span class="label label-primary" style="min-width: 55px ;display: inline-block">'+cellData+'</span>'
    }
    else if (rowData.status  == 'Amber'){
      html_result = '<span class="label label-warning" style="min-width: 55px ;display: inline-block">'+cellData+'</span>'
    }
    else if (rowData.status  == 'Red'){
      html_result = '<span class="label label-danger" style="min-width: 55px ;display: inline-block">'+cellData+'</span>'
    }
    else if (rowData.status  == 'Red'){
      html_result = '<span class="label label-danger" style="min-width: 55px ;display: inline-block">'+cellData+'</span>'
    }
    else {
      html_result = '<span class="label" style="min-width: 55px ;display: inline-block">'+cellData  +'</span>'
    }
    $(td).html(html_result)
}

gspread_array_data.forEach(array_dictionary_customize);
gspread_array_data = array_firebase_merge(gspread_array_data);

editor = new $.fn.dataTable.Editor({
  table: table_id,
  fields: [{ label: "name", name: "name" }, { label: "status", name: "status" }]
});


$(table_id).on("click", "tbody td", function(e) {
  var table = $(table_id).DataTable();

  row_data = table.row(this).data();
  if (row_data.status == 'Green'){
    change_value = 'Red'
  }
  else {
        change_value = 'Green'

  }
  console.log(this, row_data.name, row_data)
  row_data['status'] = change_value

  editor
    .edit(this, false)
    .set("status", change_value)
    .submit();
    status_format(this, row_data.name, row_data, 1, 1)
});


editor.on("postSubmit", function(e, json, data, action, xhr) {
  json_array = json.data;
  json_array.forEach(function(D) {
    record_id = D["DT_RowId"];
    D["timestamp"] = moment().format();
    accountsRef.child(record_id).set(D);
  });
});


editor.on("preSubmit", function(e, data, action) {
  console.log(e);

  console.log(data);
});

function callback_function() {
  var api = this.api();
}

toggl_table = $(table_id).DataTable({
  paging: false,
  dom: '<"html5buttons"B>lTfgitp',
  data: gspread_array_data,
  columns: [
    {
      data: "name",
      title: "name",
      visible: true,
      name: "name",
      createdCell:status_format,
      className: 'text-center'
    },
    { data: "status", title: "status", visible: false, name: "status" }
  ],
  select: true,
  colReorder: true,
  buttons: [
    { extend: "excel", title: document.title },
    { extend: "colvis", title: document.title },
    { extend: "edit", editor: editor },
    {text: '<div id="red_button">Red</div>',name:'red_button',action: function ( e, dt, node, config ) {
              dt.columns('status:name').search('Red').draw()
        }},
     {text: '<div id="clear_button">Clear</div>',name:'clear_button',action: function ( e, dt, node, config ) {
              dt.columns('status:name').search('').draw()
        }},
         {text: '<div id="green_button">Green</div>',name:'green_button',action: function ( e, dt, node, config ) {
              dt.columns('status:name').search('Green').draw()
        }}
  ],
  drawCallback: callback_function,
  order: [0, "desc"]
});

