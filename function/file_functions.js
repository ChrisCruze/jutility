//read directly from a text file
function read_text_file_data(file){
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = function ()
  {
    if(rawFile.readyState === 4)
    {
      if(rawFile.status === 200 || rawFile.status == 0)
      {
        raw_text_file_data = rawFile.responseText;
      }
    }
  }
  rawFile.send(null);
};

//read directly from a text file
function read_text_file_data_pull(file){
  read_text_file_data(file)
  return raw_text_file_data
};
//convert a downloadable data url into a download
function downloadURI(uri, name) {
  var link = document.createElement("a");
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  delete link;
}

function list_of_lists_to_array(text_lines){
    key_names = text_lines[0] 
    key_names = headers_key_names_list_format_string(key_names)
      array = []
    text_lines.forEach(function(entry,i){
        var singleObj = {}
         key_names.forEach(function(kn,num_index){
            singleObj[kn] = entry[num_index]
         })
        array.push(singleObj)
    })
    return array 


}
//use paparse to read from file
function papa_parse_array(file,delimter){
    delimter = delimter || "|"
    file = file ||""
    read_text_file_data(file)
    var results = Papa.parse(raw_text_file_data);
    text_lines = results.data
    key_names = text_lines[0] 
    key_names = headers_key_names_list_format_string(key_names)
    array = []
    text_lines.forEach(function(entry,i){
        var singleObj = {}
         key_names.forEach(function(kn,num_index){
            singleObj[kn] = entry[num_index]
         })
        array.push(singleObj)
    })
    return array 
}

function papa_parse_array_from_file(params){
  params = params || {'file':"woocommerce_data.csv"}

  data_results = []
  Papa.parse(params.file, {
      download: true,
      complete: function(results) {
        results_data = list_of_lists_to_array(results.data)
        data_results.concat(results_data)
        params['data'] = results_data
      }
  });

  return params 
}






function papa_parse_array_from_file_promise(params) {
  return new Promise(
    function(resolve) {
        return resolve(papa_parse_array_from_file(params))
    },
    function(reject) {})
}





function papa_parse_multiple(files){


//var files = [file_name_one, file_name_two];
var allResults = [];

for (var i = 0; i < files.length; i++)
{
    Papa.parse(files[i], {
        download: true,
        header: true,
        skipEmptyLines: true,
        error: function(err, file, inputElem, reason) { /* handle*/ },
        complete: function(results) {
            allResults.push(results);
            if (allResults.length == files.length)
            {
                result_result = allResults
                // Do whatever you need to do
            }
        }
    });
}
    return allResults

}


function papa_parse_multiple_promise(params) {

  return new Promise(
    function(resolve) {


var allResults = [];

for (var i = 0; i < files.length; i++)
{
    Papa.parse(files[i], {
        download: true,
        header: true,
        skipEmptyLines: true,
        error: function(err, file, inputElem, reason) { /* handle*/ },
        complete: function(results) {
            allResults.push(results);
            if (allResults.length == files.length)
            {
                resolve(allResults)
                result_result = allResults
                // Do whatever you need to do
            }
        }
    });
}

    },
    function(reject) {})
}


function papa_parse_multiple_promise_old(params) {

  return new Promise(
    function(resolve) {
        return resolve(papa_parse_multiple(params))
    },
    function(reject) {})
}










