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