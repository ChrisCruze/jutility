//convert stirng to fromatted string 
function file_formatted_string(header){
	return header.replace(" ","_").replace(" ","_").replace(" ","_").replace(" ","_").toLowerCase().trim()
}

function string_within_string_check(target_string,parent_string){
	return file_formatted_string(parent_string).indexOf(file_formatted_string(target_string)) != -1
}

//convert stirng to fromatted string 
function headers_key_names_list_format_string(headers){
  l = []
      headers.forEach(function(header,i){
        new_header = header.replace(" ","_").replace(" ","_").replace(" ","_").replace(" ","_").toLowerCase().trim()
        l.push(new_header)
      })
  return l 
}

function regex_between_brackets_pull(my_string){
  var matches = my_string.match(/\[(.*?)\]/);

  if (matches) {
      var submatch = matches[1];
  }
  submatch = submatch || null
  return submatch

}



//convert string to binary
function text2Binary(string) {
    return string.split('').map(function (char) {
        return char.charCodeAt(0).toString(2);
    }).join(' ');
}