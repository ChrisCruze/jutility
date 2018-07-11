//query google spreadsheets
function gspread_query(range,spreadsheet_id,api_key){
  api_key = api_key||"AIzaSyApJBfnH0j3TSugzEABiMFkI_tU_XXeGzg"
  spreadsheet_id = spreadsheet_id||"1P0m6nu4CoXVD3nHrCgfm0pEvSpEkLsErjJxTLJLFjp8"
  range = range||"Checklists!A1"
  url = "https://sheets.googleapis.com/v4/spreadsheets/"+spreadsheet_id+"/values/" + range
  return $.ajax({type: "GET",
    url: url,
    dataType: 'json',
    async: false,
    data: {
    'key':api_key
    }
  });

}

//pulls from gspread in different format
function gspread_pull(params,sheet_name,spreadsheet_id,api_key,key_names){
        api_key = paramsapi_key||"AIzaSyApJBfnH0j3TSugzEABiMFkI_tU_XXeGzg"
        spreadsheet_id = params.spreadsheet_id||"1P0m6nu4CoXVD3nHrCgfm0pEvSpEkLsErjJxTLJLFjp8"
        sheet_name = params.sheet_name||"Checklists"
        sheet_range = params.sheet_range||"A:Z"
        range = params.sheet_name_range||sheet_name + "!"+ sheet_range //"!A:Z"
        lol = gspread_query(range,spreadsheet_id,api_key).responseJSON.values
        key_names = lol[0]||key_names
        array = list_of_lists_to_array(lol,key_names)
        array.shift()
        return array
    }

  // sheet_name = 'Tasks'
  // spreadsheet_id = "1-tszr-k0KcENCI5J4LfCOybmqpLtvsijeUvfJbC9bu0"
  // gspread_array_data = gspread_array_pull(sheet_name,spreadsheet_id)


//pulls from gspread in different format
function gspread_array_pull(sheet_name,spreadsheet_id,api_key,key_names){
        api_key = api_key||"AIzaSyApJBfnH0j3TSugzEABiMFkI_tU_XXeGzg"
        spreadsheet_id = spreadsheet_id||"1P0m6nu4CoXVD3nHrCgfm0pEvSpEkLsErjJxTLJLFjp8"
        sheet_name = sheet_name||"Checklists"
        range = sheet_name + "!A:Z"
        lol = gspread_query(range,spreadsheet_id,api_key).responseJSON.values
        key_names = lol[0]||key_names
        array = list_of_lists_to_array(lol,key_names)
        array.shift()
        return array
    }

//query from gspread directly using api key
function array_pull_from_gspread(sheet_name,spreadsheet_id,api_key,key_names){
    // sheet_name = 'Tasks'
    // spreadsheet_id = "1-tszr-k0KcENCI5J4LfCOybmqpLtvsijeUvfJbC9bu0"
    // gspread_array_data = gspread_array_pull(sheet_name,spreadsheet_id)

        api_key = api_key||"AIzaSyApJBfnH0j3TSugzEABiMFkI_tU_XXeGzg"
        spreadsheet_id = spreadsheet_id||"1P0m6nu4CoXVD3nHrCgfm0pEvSpEkLsErjJxTLJLFjp8"
        sheet_name = sheet_name||"Checklists"
        range = sheet_name + "!A:Z"
        lol = gspread_query(range,spreadsheet_id,api_key).responseJSON.values
        key_names = lol[0]||key_names
        array = list_of_lists_to_array(lol,key_names)
        array.shift()
        return array
}
