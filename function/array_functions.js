
//https://stackoverflow.com/questions/38304401/javascript-check-if-dictionary - determine object type
function determine_object_type(a){
  if (typeof a === "object"){
    return 'object'
  }
  else if (Array.isArray(a)){
    return 'array'
  }
  else {
    return 'other'
  }
  


}

//array from number. iterate
function array_generate_from_number(number_of_rows){
  for(var i=0; i < number_of_rows ; i++){
    //console.log(i)
  }
}
function format_standardize_from_key_name(D,key_name){
  if (Array.isArray(key_name)){
    l = []
    key_name.forEach(function(i){
      l.push(D[i])
    })
    r = l.join(' ')
    //console.log(r)
    return r.toLowerCase()
  }
  else {
    return D[key_name].toLowerCase()
  }
}

//array filter tasks for text
function array_filter_from_text(array,text,key_name){
  key_name = key_name || "content"
  array = array.filter(function(D){return format_standardize_from_key_name(D,key_name).indexOf(text.toLowerCase()) !== -1 })
  return array 
}




//converts list of lists to array
function list_of_lists_to_array(lol,key_names){
  key_names = lol[0]||key_names
  array = []
  lol.forEach(function(row,row_num){
    var new_dict =  {}
    row.forEach(function(col,col_num){
      cell_val = lol[row_num][col_num]
      key_name = key_names[col_num]

      new_dict[key_name] = cell_val
    })
    array.push(new_dict)
  })
  return array 
}


//filter tasks for text and return sum from it
function array_filter_from_text_sum(array,text,key_name,sum_field){
  sum_field = sum_field||'duration'
  array = array_filter_from_text(array,text,key_name)
  var sum_total = sum_float_convert_from_array_underscore(array,sum_field)
  return sum_total
}
//make triple check for the key 
function dictionary_check_keys_triple_return(item,check_key,second_key,third_key,alternative_val){
  alternative_val = alternative_val||"null"
  check_key = check_key||'fullName'
  not_undefined = item[check_key] != undefined
  if (not_undefined){
      not_second_undefined = item[check_key][second_key] != undefined
      if (not_second_undefined){
        r = item[check_key][second_key][third_key]||alternative_val
      }
      else {
        r = alternative_val
      }
  }
  else {
    r = alternative_val
  }
  return r 
}

//check for the key on second layer or return null
function dictionary_check_keys_double_return(item,check_key,second_key,alternative_val){
  alternative_val = alternative_val||"null"
  check_key = check_key||'fullName'
  not_undefined = item[check_key] != undefined
  if (not_undefined){
    r = item[check_key][second_key]||alternative_val

  }
  else {
    r = alternative_val
  }
  return r 
}

//checks if item has a key and gives it null if not
function dictionary_check_keys(item,check_keys,alternative_val){
  alternative_val = alternative_val||"null"
  check_keys = check_keys||['fullName','active','connectedAt','id']
  check_keys.forEach(function(i){
    item[i] = item[i]||'null'
  })
}

//checks if item has a key and gives it null if not (for the whole array)
function array_check_keys(array,check_keys){
  check_keys = check_keys||['fullName','active','connectedAt','id']
  array.forEach(function(item){
    dictionary_check_keys(item,check_keys)
  })
  return array 
}

// turn an array  e.g. list of dictionaries into a list of lists because certain functions such as datatables takes an input of a list of lists
function list_of_lists_from_array(array,keys){
  list_of_lists = [] //this is an empty list that will be filled with sublists
  array.forEach(function(dictionary_object,index){ //we're going to loop through every dictionary in the array
    sublist = []
    keys.forEach(function(key_name,key_index){ //we're also going to loop through every key
      sublist.push(dictionary_object[key_name]) //then we're going to get the key's definition to create the subli
    })
    list_of_lists.push(sublist) //push the sublist to the list_of_lists
   })
  return list_of_lists
}

//convert array to dictionary
function array_to_dictionary(array,key_name){
  key_name = key_name || 'id'
  new_dict = {}
  array.forEach(function(item,index){
    new_dict[String(item[key_name])] = item
  })
  return new_dict
}

//check if key has a value and if not, add it a value
function key_check_func_dictionary(check_keys,item){
    check_keys = check_keys||['fullName','active','connectedAt','id']
  check_keys.forEach(function(i){
    item[i] = item[i]||'null'
  })
}

//highlights syntax
function syntaxHighlight(json){
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

// prettifies the json or the list
function json_prettify(json_input){
var str = JSON.stringify(json_input, undefined, 4);
    document.body.appendChild(document.createElement('pre')).innerHTML = syntaxHighlight(str);

}


//combines dictionaries
function combine_dicts(a,b){//https://stackoverflow.com/questions/43449788/how-do-i-merge-two-dictionaries-in-javascript
  var a = a||{ fruit: "apple" },
    b = b||{ vegetable: "carrot" },
    food = Object.assign({}, a, b);
    return food
}

//check if the dictionary has two layers of key down and then pull and turn it to null to avoid error
function key_check_make_double(item,primary_key,secondary_key){
  item[primary_key] = item[primary_key]||{}
  item[primary_key][secondary_key] = item[primary_key][secondary_key] ||'null'
}

