
//array_functions.js


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


//date_functions.js


//https://stackoverflow.com/questions/141348/what-is-the-best-way-to-parse-a-time-into-a-date-object-from-user-input-in-javas
//parses a time such as 1:00PM
function parseTime( t ) {
   var d = new Date();
   var time = t.match( /(\d+)(?::(\d\d))?\s*(p?)/ );
   d.setHours( parseInt( time[1]) + (time[3] ? 12 : 0) );
   d.setMinutes( parseInt( time[2]) || 0 );
   return d;
}

//gives days in the month
function daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
}

//number of days this month
function days_this_month(){
  r = new Date()
  return daysInMonth(r.getMonth()+1,r.getYear())
}

//returns true if the date is todays date
function date_is_today(input_date){
    // Create date from input value
    var inputDate = new Date(input_date);

    // Get today's date
    var todaysDate = new Date();

    // call setHours to take the time out of the comparison
    return inputDate.setHours(0,0,0,0) == todaysDate.setHours(0,0,0,0)
}





//file_functions.js

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
//html_functions.js






//add floating chat box
function add_floating_chat_box_base(chat_id,message_content_id,message_box_id,favicon,small_chat_date,chat_title,small_chat_box_style,small_chat_style){
    favicon = favicon || "fa fa-comments"
    chat_id = chat_id || "small-chat"
    small_chat_style = small_chat_style||""
    badge_icon =  $("<a>", {"class":"open-small-chat"}).append($("<i>", {"class":favicon}))
    badge_counter = $("<span>", {"class":"badge badge-warning pull-right"}).text('5')
    chat_icon = $("<div>", {"id":chat_id,class:'small-chat',"style":small_chat_style}).append(badge_counter).append(badge_icon)

    parent_heading = $("<div>", {"class":"heading"})//,"draggable":"true"
    chat_title = chat_title||"Small Chat"
    small_chat_box_style = small_chat_box_style || ""
    if(!('draggable' in document.createElement('span'))) {
      //handle old browsers                
    } else {
      parent_heading.attr('draggable', 'true');
    }


    small_chat_date = small_chat_date || "02.19.2015"
    message_content_id = message_content_id || "message_content"
    message_box_id = message_box_id || "message_box_text"
    heading = parent_heading.append($("<small>", {"class":"chat-date pull-right"}).text(small_chat_date)).append($("<span>",{}).text(chat_title))
    message_content = $("<div>", {"class":"content message_content","id":message_content_id})
    form_chat =  $("<div>", {"class":"form-chat"}).append($("<div>", {"class":"input-group input-group-sm"}).append($("<input>", {"type":"text","class":"form-control message_box","id":message_box_id})).append($("<span>", {"class":"input-group-btn"}).append($("<button>", {"class":"btn btn-primary message_send","type":"button"}).text("Send"))))
    chat_session = $("<div>", {"class":"small-chat-box fadeInRight animated","style":small_chat_box_style}).append(heading).append(message_content).append(form_chat)


  // <div id="small-chat">
  //   <span class="badge badge-warning pull-right">5</span>
  //   <a class="open-small-chat"><i class="fa fa-comments"></i></a>
  // </div>
  // <div class="small-chat-box fadeInRight animated">
  //   <div class="heading" draggable="true">
  //     <small class="chat-date pull-right">02.19.2015</small> Small chat
  //   </div>
  //   <div id="message_content" class="content">
  //   </div>
  //    <div class="form-chat">
  //               <div class="input-group input-group-sm">
  //                   <input id="message_box_text" type="text" class="form-control">
  //                   <span class="input-group-btn"> <button
  //                       class="btn btn-primary" type="button">Send
  //               </button> </span></div>
  //     </div>
  // </div>

    final_element = $("<div>", {'class':'chat'}).append(chat_icon,chat_session)
    return final_element
}



function add_floating_chat_box(parent_div,chat_id,message_content_id,message_box_id,favicon,small_chat_date,chat_title,small_chat_box_style,small_chat_style){
    parent_div = parent_div|| "#wrapper"
    chat_id = chat_id || "smallchat"
    message_content_id = message_content_id || "message_content"
    message_box_id = message_box_id || "message_box_text"
    favicon = favicon || "fa fa-comments"
    small_chat_date = small_chat_date || "02.19.2015"
    chat_title = chat_title||"Small Chat"
    small_chat_style = small_chat_style||""
    small_chat_box_style = small_chat_box_style || ""


    //add_floating_chat_box_base
    //"small-chat","message_content","message_box_text","fa fa-comments","02.19.2015","Small Chat"
    $(parent_div).append(add_floating_chat_box_base(chat_id,message_content_id,message_box_id,favicon,small_chat_date,chat_title,small_chat_box_style,small_chat_style))
    console.log(chat_id)

        //Open close small chat
    $('.open-small-chat').on('click', function () {
        $(this).children().toggleClass('fa-comments').toggleClass('fa-remove');
        $(this).closest('.chat').find(".small-chat-box").toggleClass('active')
        //$('.small-chat-box').toggleClass('active');
    });

    // Initialize slimscroll for small chat
    $('.small-chat-box .content').slimScroll({
        height: '234px',
        railOpacity: 0.4,
        start: 'bottom'
    });


    // $("#"+chat_id + ' .open-small-chat').on('click', function () {
    //     $(this).children().toggleClass('fa-comments').toggleClass('fa-remove');
    //     $("#"+chat_id + ' .small-chat-box').toggleClass('active');
    // });

    // // Initialize slimscroll for small chat
    // $("#"+chat_id + ' .small-chat-box .content').slimScroll({
    //     height: '234px',
    //     railOpacity: 0.4
    // });



    // $('#smallchat .open-small-chat').on('click', function () {
    //     $(this).children().toggleClass('fa-comments').toggleClass('fa-remove');
    //     $('#small-chat  .small-chat-box').toggleClass('active');
    // });

    // $('.small-chat-box .content').slimScroll({
    //     height: '234px',
    //     railOpacity: 0.4
    // });
}


//created progress bar div
function list_progress_bar_list_element_thick(title_text,id,percentage,parent_identifier,color,metric_text){
    percentage = percentage||"48"
    title_text = title_text||"title_text"
    id = id||"id"
    parent_identifier = parent_identifier||"#progress_bar_list"
    color = color||"danger"



    var outer_div = $("<div>", {"id":id})

    var title_text_div = $("<span>", {}).text(title_text)
    var metric_text_div = $("<small>", {'class':'pull-right percentage_text'}).text(metric_text)



    var progress_bar_parent_div = $("<div>",{"class":"progress progress-small"})
    var progress_bar_div = $("<div>",{"class":"progress-bar progress-bar-"+color,"style":"width:" + String(percentage) + "%"})


    metric_div = $("<div>", {}).append(title_text_div).append(metric_text_div)

    bar_div = progress_bar_parent_div.append(progress_bar_div)



    final_element = outer_div.append(metric_div).append(bar_div)

    
    $(parent_identifier).append(final_element)
    return final_element
}


//created progress bar div
function list_progress_bar_list_element_thin(title_text,id,percentage,parent_identifier){
    percentage = percentage||"48"
    title_text = title_text||"title_text"
    id = id||"id"
    parent_identifier = parent_identifier||"#progress_bar_list"

    var outer_div = $("<li>", {"id":id});
    var header_div = $("<small>", {}).text(title_text)


    var percent_div = $("<div>", {'class':'stat-percent'}).text(percentage + "%")
    var progress_bar_div = $("<div>",{"class":"progress-bar","style":"width:" + String(percentage) + "%"})
    var progress_div = $("<div>", {'class':'progress progress-mini'}).append(progress_bar_div)
    final_div = outer_div.append(header_div).append(percent_div).append(progress_div)
    
    $(parent_identifier).append(final_div)
    return final_div
}


//add dropdown item to list of items. used in create_task_v2
function add_dropdown_item(title_text,id,item_class,parent_identifier){
    title_text = title_text||"hello_world 2"
    id = id||"id"
    item_class = item_class||"favicon_select"
    parent_identifier = parent_identifier||"#favicon_dropdown_menu"
    var outer_div = $("<li>", {});
    var link_elem = $("<a>", {"href": "#","target":"_blank","id":id,"class":item_class}).text(title_text)
    var final_div = outer_div.append(link_elem)
    $(parent_identifier).append(final_div)
    return final_div
}



//array input to formulate dropdown list
function add_dropdown_item_from_array(projects_dictionary){
    title_text = title_text||"hello_world 2"
    id = id||"id"
    item_class = item_class||"favicon_select"
    parent_identifier = parent_identifier||"#favicon_dropdown_menu"

    projects_dictionary.forEach(function(D){
        add_dropdown_item(title_text,id,item_class,parent_identifier)
    })  

    $(item_class).on('click', function (e) {
        $("#favicon_select_button").html($(this))
    })
}


//add icon from favicon
function add_favicon_div_from_javascript(title_text,url,image_url){
    url = url||"https://cruz.site44.com/profile.html"
    title_text = title_text||"hello_world 2"
    icon_class = icon_class||"fa fa-trophy fa-5x"
    var outer_div = $("<div>", {"class": "col-md-3"});
    var inner_div = $("<div>", {"class": "contact-box center-version"});
    var link_elem = $("<a>", {"href": url});
    //var image_elem = $("<img>", {"src": image_url});
    var image_elem = $("<i>", {"class": icon_class});

    var text_elem = $("<h3>", {"class": "m-b-xs"}).text(title_text)
    var final_div = link_elem.append(image_elem).append(text_elem)
    var final_div = inner_div.append(final_div)
    var final_div = outer_div.append(final_div)
    $("#target").append(final_div)
    return final_div
}
//creates an image div to append to a jquery object with append
function create_image_div(title_text,url,image_url){
    url = url||"https://cruz.site44.com/profile.html"
    image_url = image_url||"https://cruz.site44.com/img/a2.jpg"
    title_text = title_text||"hello_world 2"
    var outer_div = $("<div>", {"class": "col-md-2"});
    var inner_div = $("<div>", {"class": "contact-box center-version"});
    var link_elem = $("<a>", {"href": url});
    var image_elem = $("<img>", {"src": image_url});
    var text_elem = $("<h3>", {"class": "m-b-xs"}).text(title_text)
    var final_div = link_elem.append(image_elem).append(text_elem)
    var final_div = inner_div.append(final_div)
    var final_div = outer_div.append(final_div)
    return final_div
}

function add_percentage_label_html(id,percentage_to_goal){
  id = id||'#tasks_completed_number'
  percentage_to_goal = percentage_to_goal||.5
  label_object = $(id).find(".sub_metric_text")
  .4 < percentage_to_goal && add_remove_labels(label_object,'red');
  .7 < percentage_to_goal && add_remove_labels(label_object,'amber');
  .9 < percentage_to_goal && add_remove_labels(label_object,'green');

}

// appends the image div from create_image_div
function append_image_div(div_id,title_text,url,image_url){
    $(div_id).append(create_image_div(title_text,url,image_url))
}


function add_remove_labels(jquery_object,color){
    label_name = {'green':'label-primary','amber':'label-warning','red':'label-danger'}[color]
    label_name = label_name || "label-primary"
    jquery_object.removeClass('label-success')
    jquery_object.removeClass('label-danger')
    jquery_object.removeClass('label-warning')
    jquery_object.removeClass('label-default')
    jquery_object.addClass(label_name)

}

//<span class="label label-success pull-right">Monthly</span>
//creates a metric div and adds it to the div
function metric_header_create_label(title_text,sub_title,metric_text,sub_metric_text,id,label_color,params){
    title_text = title_text||"TITLE"
    metric_text = metric_text||"metric_text"
    sub_metric_text = sub_metric_text||"sub_metric_text"
    sub_title = sub_title||"sub_title"
    id = id||"null"
    label_color = label_color ||"label-default"
    var outer_div_one = $("<div>", {"class": "col-md-2 "+title_text,"id":id});
    var outer_div_two = $("<div>", {"class": "ibox float-e-margins"});
    var inner_div_one = $("<div>", {"class": "ibox-title"});
    var elem_one = $("<span>", {"class": "label label-success pull-right"});
    var elem_two = $("<h5>").text(title_text)

    var inner_div_two = $("<div>", {"class": "ibox-content"});
    var elem_three = $("<h1>", {"class": "no-margins metric_text kpi"}).text(metric_text)
    //var elem_four = $("<div>", {"class": "stat-percent font-bold text-success sub_metric_text"}).text(sub_metric_text)
    var elem_four = $("<span>", {"class": "label pull-right sub_metric_text " + label_color}).text(sub_metric_text)

    var elem_five = $("<small>",{"class":"sub_title"}).text(sub_title)


    inner_div_one = inner_div_one.append(elem_one).append(elem_two)
    inner_div_two = inner_div_two.append(elem_three).append(elem_four).append(elem_five)
    var inner_ibox_div = outer_div_two.append(inner_div_one).append(inner_div_two)
    var final_div = outer_div_one.append(inner_ibox_div)
    return final_div
}


//creates a metric div and adds it to the div
function metric_header_create(title_text,sub_title,metric_text,sub_metric_text,id){
    title_text = title_text||"TITLE"
    metric_text = metric_text||"metric_text"
    sub_metric_text = sub_metric_text||"sub_metric_text"
    sub_title = sub_title||"sub_title"
    id = id||"null"

    var outer_div_one = $("<div>", {"class": "col-md-2 "+title_text,"id":id});
    var outer_div_two = $("<div>", {"class": "ibox float-e-margins"});
    var inner_div_one = $("<div>", {"class": "ibox-title"});
    var elem_one = $("<span>", {"class": "label label-success pull-right"});
    var elem_two = $("<h5>").text(title_text)

    var inner_div_two = $("<div>", {"class": "ibox-content"});
    var elem_three = $("<h1>", {"class": "no-margins metric_text"}).text(metric_text)
    var elem_four = $("<div>", {"class": "stat-percent font-bold text-success sub_metric_text"}).text(sub_metric_text)
    var elem_five = $("<small>",{"class":"sub_title"}).text(sub_title)


    inner_div_one = inner_div_one.append(elem_one).append(elem_two)
    inner_div_two = inner_div_two.append(elem_three).append(elem_four).append(elem_five)
    var inner_ibox_div = outer_div_two.append(inner_div_one).append(inner_div_two)
    var final_div = outer_div_one.append(inner_ibox_div)
    return final_div
}

//creates a metric div and adds it to the div
function append_metric_header_div(div_id,title_text,sub_title,metric_text,sub_metric_text){
    $(div_id).append(metric_header_create(title_text,sub_title,metric_text,sub_metric_text))
}

//math_functions.js

//round the number
function round_number(i){
  i.toFixed(2)
}


//get the median from list of numbers
function median_get(values) {
    values.sort( function(a,b) {return a - b;} );
    var half = Math.floor(values.length/2);
    if(values.length % 2)
        return values[half];
    else
        return (values[half-1] + values[half]) / 2.0;
}


//create g unique identifier
function create_guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

//string_functions.js

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

//convert string to binary
function text2Binary(string) {
    return string.split('').map(function (char) {
        return char.charCodeAt(0).toString(2);
    }).join(' ');
}
//web_functions.js

//open url in new tab
function openInNewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
}


//get url parameter 
function parameter_attain_from_url(param){
	var url = new URL(window.location.href );
	var result = url.searchParams.get(param)
	return result
}


function ipLookUp () {
  $.ajax('http://ip-api.com/json')
  .then(
      function success(response) {
          console.log('User\'s Location Data is ', response);
          console.log('User\'s Country', response.country);

      },

      function fail(data, status) {
          console.log('Request failed.  Returned status of',
                      status);
      }
  );
}

//calendar_functions.js




function calendar_initiate_base(params){
	calendar_selector = params.calendar_selector||'#calendar'
	events = params.events
	calendar_object = $(calendar_selector).fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listWeek'
      },
      defaultDate: moment().format('YYYY-MM-DD'),//'2018-06-12',
      navLinks: true, // can click day/week names to navigate views
      editable: true,
      eventLimit: true, // allow "more" link when too many events
      events: events
    });
}


function calendar_initiate(params){
	calendar_initiate_base(params)
	//setTimeout(calendar_initiate_base,2000,params)

}

//chartjs_functions.js


//initiates a simple bar chart using chartjs
function bar_chart_initiate_render_chartjs(chart_id,labels,numbers_list,colors){
  labels = labels||['No Data']
  numbers_list = numbers_list||[0]
  colors = colors||["#a3e1d4"]

  simple_chart_data = {labels:labels, datasets: [{data: numbers_list, backgroundColor: colors }] };
  



  simple_options = {    events: false,
    tooltips: {
        enabled: false
    },
    hover: {
        animationDuration: 0
    },
    animation: {
        duration: 1,
        onComplete: function () {
            var chartInstance = this.chart,
                ctx = chartInstance.ctx;
            ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';

            this.data.datasets.forEach(function (dataset, i) {
                var meta = chartInstance.controller.getDatasetMeta(i);
                meta.data.forEach(function (bar, index) {
                    var data = dataset.data[index];                            
                    ctx.fillText(data, bar._model.x, bar._model.y - 5);
                });
            });
        }
    },legend: {display: false},        scales: {
          yAxes: [{
            stacked: true,
            ticks: {
              beginAtZero: true
            }
          }],
          xAxes: [{
            stacked: true,
            ticks: {
              beginAtZero: true
            }
          }]

        }, responsive: true, tooltips: {enabled: true}};



  var ctx = document.getElementById(chart_id).getContext("2d");
  simple_chart_object = new Chart(ctx, {type: 'bar', data: simple_chart_data, options:simple_options});
  return simple_chart_object
}


//initiates a simple bar chart using chartjs
function horizontal_bar_chart_initiate_render_chartjs(chart_id,labels,numbers_list,colors){
  labels = labels||['No Data']
  numbers_list = numbers_list||[0]
  colors = colors||_.map(labels,function(D){return "#a3e1d4"})//["#a3e1d4"]

  simple_chart_data = {labels:labels, datasets: [{data: numbers_list, backgroundColor: colors }] };
  simple_options = {legend: {display: false},        scales: {
          yAxes: [{
            stacked: true,
            ticks: {
              beginAtZero: true
            }
          }],
          xAxes: [{
            stacked: true,
            ticks: {
              beginAtZero: true
            }
          }]

        }, responsive: true, tooltips: {enabled: true}};

  var ctx = document.getElementById(chart_id).getContext("2d");
  simple_chart_object = new Chart(ctx, {type: 'horizontalBar', data: simple_chart_data, options:simple_options});
  return simple_chart_object
}

//
//updates bar_chart for data 
function bar_chart_update_chartjs(chart_object,new_labels,new_data_points,new_colors){
    chart_object.data.labels = new_labels // ['label a','label b']
    chart_object.data.datasets[0].data = new_data_points//[1,2]
    chart_object.data.datasets[0].backgroundColor = new_colors//["#a3e1d4","#dedede"]
    chart_object.update()
}

//update based on days
function bar_chart_update_category_calculate_function(chart_object,array,date_field,metric_func,date_strf,color_func){
  //date_func = date_func || function(D){return D.date_field}
  metric_func = metric_func || function(l){return l.length}
  date_strf = date_strf ||"MM/DD"

  grouped_array_dictionary = _.groupBy(array,date_field)
  color_func = color_func || function(key_name,index,grouped_array){return "#a3e1d4"}
  labels = []
  vals = []
  colors = []
  dates = Object.keys(grouped_array_dictionary)

  //dates = _.sortBy(dates, function(num){ return moment(num,date_strf).unix(); });
  dates.forEach(function(key_name,i){
    val = metric_func(grouped_array_dictionary[key_name])
    color = color_func(key_name,i,grouped_array_dictionary)
    labels.push(key_name)
    vals.push(val)
    colors.push(color)
  })
  bar_chart_update_chartjs(chart_object,labels,vals,colors)


}

//update based on days
function bar_chart_update_time_scale_calculate_function(chart_object,array,date_field,metric_func,date_strf,color_func){
  //date_func = date_func || function(D){return D.date_field}
  metric_func = metric_func || function(l){ 
    if (l == undefined){
      return 0
    }
    else {
      return l.length
    }
    }
  date_strf = date_strf ||"MM/DD"


  grouped_array_dictionary = _.groupBy(array,function(D){return moment(D[date_field]).format(date_strf)})
  color_func = color_func || function(key_name,index,grouped_array){return "#a3e1d4"}
  console.log(grouped_array_dictionary)
  labels = []
  vals = []
  colors = []
  dates = Object.keys(grouped_array_dictionary)
  console.log(dates)
  min_date =_.min(dates, function(num){return moment(num,date_strf).unix()})
  console.log(min_date)
  dates = dates_between_dates_moment(moment(min_date,date_strf),moment())
  console.log(dates)
  //dates = _.sortBy(dates, function(num){ return moment(num,date_strf).unix(); });
  dates.forEach(function(key_name,i){
    key_name = key_name.format(date_strf)
    //console.log(key_name)
    val = metric_func(grouped_array_dictionary[key_name])
    color = color_func(key_name,i,grouped_array_dictionary)
    labels.push(key_name)
    vals.push(val)
    colors.push(color)
  })
  bar_chart_update_chartjs(chart_object,labels,vals,colors)


}




//crossfilter_functions.js



        function print_filter(filter){
            var f=eval(filter);
            if (typeof(f.length) != "undefined") {}else{}
            if (typeof(f.top) != "undefined") {f=f.top(Infinity);}else{}
            if (typeof(f.dimension) != "undefined") {f=f.dimension(function(d) { return "";}).top(Infinity);}else{}
            console.log(filter+"("+f.length+") = "+JSON.stringify(f).replace("[","[\n\t").replace(/}\,/g,"},\n\t").replace("]","\n]"));
        };




        function getMonthName(v) {
        var n = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return n[v]
        };



        function num_format(){
         var numFormat = d3.format(".3s")


        }



        function generateYearMonth(lst){
            // Author: Koba
            // Generates an array of full year concatenated woth a month number. 
            // Ex.g., generateYearMonth(['20140','20142') will give ['20140','20141','20142']
            var nlst = []
            nlst.push(lst[0])
            var counter = 0
            var year = parseInt(nlst[counter].substring(0,4))
            var month = parseInt(nlst[counter].substring(4,6))
            
            while (nlst[nlst.length-1] != lst[lst.length-1]){    
                month += 1
                
                if(month % 12 === 0){
                    year += 1
                    month = 0
                }
                
                nlst.push(String(year) + String(month))
                counter += 1
            }
            return nlst
        }

        function filtered_group(group, bins) {
            return {
            all:function () {
            return group.all().filter(function(d) {
            return bins.indexOf(d.key) != -1;
            })
            }
            }
        };



        function crossfilter_array_format(params){
        	lst = params.data
        var Strings = params.strings ||['Name','Type','StageName','Red_Account_Notes__c','OTF__c','Status_Notes__c','Account.Name','LeadSource','Industry__c','Success_Manager__c','Market_Developer__c','Product_Names__c'];
        var Dates = params.dates||['CloseDate','Contract_Start_Date__c','Contract_End_Date__c'];
        var Integers = params.numbers||['Amount','MRR__c','Probability','Account.Days_Since_Original_Close_Date__c'];

        lst.forEach(function (d) {

        Strings.forEach(function(key){d[key] = String(d[key]) || "None";});
        Dates.forEach(function(key){d.key = d.key || "9/30/10";});
        Dates.forEach(function(key){d[key] = new Date(d[key] + ' EST');});
        Dates.forEach(function(key){d[key + "Formatted"] = d3.time.format("%m/%d/%y")(d[key])});
        Dates.forEach(function(key){d[key + "YearString"] = d3.time.format("%y")(d[key])});
        Dates.forEach(function(key){d[key + "DayNumber"] = d3.time.format("%d")(d[key])});
        Dates.forEach(function(key){d[key + "Week"] = d[key].getWeek(1)});
        Dates.forEach(function(key){d[key + "MonthName"] = getMonthName(d[key].getMonth())});
        Dates.forEach(function(key){d[key + "YearMonth"] = String(d[key].getFullYear()) + String(d[key].getMonth())});
        Dates.forEach(function(key){d[key + "Quarter"] = String(d[key].getFullYear()) + String(Math.floor((d[key].getMonth() + 3) / 3))});
        Dates.forEach(function(key){d[key + "WeekDay"] = d[key].getDay()+"."+["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][d[key].getDay()]});
        Dates.forEach(function(key){d[key + "Year"] = d[key].getFullYear('EST')});
        Dates.forEach(function(key){d[key + "MonthNumber"] = d[key].getMonth()}); 
        Dates.forEach(function(key){d[key + "Month"] = d3.time.month(d[key])}); 
        Integers.forEach(function(key){d[key]=d[key]||"0";});
        Integers.forEach(function(key){d[key] = parseInt(d[key], 10)});
        Integers.forEach(function(key){d[key + "Formatted"] =   d3.format(",.0f")(d[key])}); 

        });

        return lst


        }



function crossfilter_generate(params){
        	lst = crossfilter_array_format(params)
        	var ndx = params.ndx||crossfilter(lst);
            params.ndx = ndx
        var numFormat = d3.format(".3s")


        function row_bar_chart_cross_filter(params) {

            D = params.dimension
            N = params.metric
            S = params.chart_identifier 
            T = params.calculation 


            var D1 = ndx.dimension(function(d) {return d[D]})

            var RowBarChart1 = dc.rowChart(S)
            RowBarChart1
            .width(180).height(500)
            .margins({top: 20, left: 15, right: 10, bottom: 20})
            .dimension(D1)
            .valueAccessor(function (d) { // must use valueAccessor
                return d.value[T];
                })
                .group(D1.group().reduce(
                function reduceAdd(p, d) {
                ++p.count;
                p.sum += d[N]
                if (d[N] in p.IDs) p.IDs[d[N]]++;
                else {
                p.IDs[d[N]] = 1;
                p.unique++;
                }
                p.avg = p.sum/p.count;
                return p;
                },
                function reduceRemove(p, d) {
                --p.count;
                p.sum -= d[N];
                p.IDs[d[N]]--;
                if (p.IDs[d[N]] === 0) {
                delete p.IDs[d[N]];
                p.unique--;
                }
                p.avg = p.sum/p.count;
                return p;
                },
                function reduceInitial() {
                return {
                count:0,
                sum:0,
                unique: 0,
                avg : 0,
                IDs: {}
                };}
                ))
            .elasticX(true)
            .label(function (d) {return d.key + "  " + numFormat(d.value[T]);})
            .ordering(function(d) { return -d.value[T] })
            .xAxis().tickFormat(function(v){return v}).ticks(3);

        }



        function pie_chart_crossfilter(params,D,N,S) {
        	ndx = params.ndx||ndx
        	D = params.dimension||D
        	N = params.metric||N
        	S = params.chart_selector ||S
            var D1 = ndx.dimension(function (d) {return d[D];})
            var Chart = dc.pieChart(S)
            var Sum = ndx.groupAll().reduceSum(function (d) {return d[N];})

            Chart
            .width(370).height(200).radius(90).innerRadius(40)
            .dimension(D1)
            .group(D1.group().reduceSum(function (d) {return d[N];}))
            .label(function (d) {return d.key + " (" + (d.value / Sum.value() * 100).toFixed(2) + "%" + ")";})
            .legend(dc.legend().x(290).y(10).itemHeight(13).gap(4))
            .renderLabel(true);

        }



        if (params.charts){
            params.charts.forEach(function(chart_dict){
                if (chart_dict.type == 'pie'){
                    pie_chart_crossfilter({},chart_dict.dimension,chart_dict.metric,chart_dict.chart_identifier);
                }

                if (chart_dict.type == 'row'){
                    row_bar_chart_cross_filter(chart_dict);
                }



            })

        }


         	//pie_chart_crossfilter({},'Dress','Top Sizes','#chart2');

        	


            dc.renderAll();
            return params
        }



        function crossfilter_filter(params){
        	ndx = params.ndx
        var D = params.dimension||"CloseDateYearString"
        var CloseDateYearFilter = ndx.dimension(function (d) {return d[D];})
        var types = params.types||['14','15']
        CloseDateYearFilter.filter(function(d) {return types.indexOf(d) > -1});


        }














//datatable_functions.js

//get table data from datatables table
function datatables_data_get(table){
  return table.data().toArray();
}

function vote_created_cell_editor(field_name){


function vote_created_cell_core(td, cellData, rowData, row, col) {
  cellData = parseFloat(cellData)||0
  $(td).html( '<div class="vote-actions"> <a href="#" class="rank up" iterator="1" field="'+field_name+'"> <i class="fa fa-chevron-up"> </i> </a> <div>'+cellData+'</div> <a href="#" class="rank down" iterator="-1" field="'+field_name+'"> <i class="fa fa-chevron-down"> </i> </a> </div>') 




} 
return vote_created_cell_core

}


function option_select_dropdown_datatables_from_options(params){
  function option_select_dropdown_datatables(td, cellData, rowData, row, col) {
    select_div = $('<select class="selectpicker form-control" data-size="5" data-header="Select a stage" data-actions-box="true"> </select> ')
    params.options.forEach(function(option){
      is_selected = cellData == option
      select_div.append($("<option>", {"id":option,"selected":is_selected}).text(option))
    })
    //console.log(select_div)
    //select_div.selectpicker()
    master_div = $('<div class="form-group"> </div>')
    master_div.append(select_div)
    $(td).html(master_div)

   // $("#"+cellData).attr('selected',true)


    //$(td).append(master_div)
        //$('.selectpicker').selectpicker()

  }



  return option_select_dropdown_datatables
}

function vote_created_cell(td, cellData, rowData, row, col) {

  $(td).html( '<div class="vote-actions"> <a href="#" class="vote_up"> <i class="fa fa-chevron-up"> </i> </a> <div>'+cellData+'</div> <a href="#" class="vote_down"> <i class="fa fa-chevron-down"> </i> </a> </div>') 
  $('.vote_up').on('click', function (e) { 
    console.log('up')
    console.log(cellData)
    console.log(td)
    console.log(rowData)
    console.log(row)
    console.log(col)
    console.log($(this))
  })
  $('.vote_down').on('click', function (e) { 
    console.log('down')
    console.log(rowData)
    console.log($(this))
  })



    // editor
    // .edit(this, false)
    // .set("status", change_value)
    // .submit();
} 

//add bar chart within the cell
function bar_create_datatable_cell(td, cellData, rowData, row, col) {

  title_text = cellData
  id = cellData
  percentage = rowData['percentage']||50
  color = 'danger'
  parent_identifier = null
  metric_text = percentage + "%"
  $(td).html(list_progress_bar_list_element_thick(title_text,id,percentage,parent_identifier,color,metric_text));
}


//This searches and filters https://datatables.net/examples/plug-ins/range_filtering.html || https://datatables.net/manual/plug-ins/search
function datatable_search_filter(){



$.fn.dataTable.ext.search.push(
    function( settings, searchData, index, rowData, counter ) {
        var min = parseInt( $('#min').val(), 10 );
        var max = parseInt( $('#max').val(), 10 );
        var age = parseFloat( searchData[3] ) || 0; // using the data from the 4th column
  
        if ( ( isNaN( min ) && isNaN( max ) ) ||
             ( isNaN( min ) && age <= max ) ||
             ( min <= age   && isNaN( max ) ) ||
             ( min <= age   && age <= max ) )
        {
            return true;
        }
        return false;
    }
);


$.fn.dataTable.ext.search.push(
    function( settings, data, dataIndex ) {
        var min = parseInt( $('#min').val(), 10 );
        var max = parseInt( $('#max').val(), 10 );
        var age = parseFloat( data[3] ) || 0; // use data for the age column
 
        if ( ( isNaN( min ) && isNaN( max ) ) ||
             ( isNaN( min ) && age <= max ) ||
             ( min <= age   && isNaN( max ) ) ||
             ( min <= age   && age <= max ) )
        {
            return true;
        }
        return false;
    }
);
    var table = $('#example').DataTable();

        table.draw();


}




//add filterable column headers for datatables
function column_header_filterable_autocomplete_apply(table_object,number_of_columns){
  l = []
  for(var i=0; i < number_of_columns ; i++){
    l.push({column_number : i, filter_type: "auto_complete", text_data_delimiter: ","})
  }
  yadcf.init(table_object, l)

}


//add a filter to the column header of the datatable (https://cdn.rawgit.com/ChrisCruze/jutility/master/libs/jquery.dataTables.yadcf.js , https://cdn.rawgit.com/ChrisCruze/jutility/master/libs/jquery.dataTables.yadcf.css | https://github.com/vedmack/yadcf)
function header_filter_add_datatable(){

var myTable = $('#example').DataTable();
  
  yadcf.init(myTable, [
    {column_number : 0},
    {column_number : 1, filter_type: "range_number_slider", filter_container_id: "external_filter_container"},
    {column_number : 2, data: ["Yes", "No"], filter_default_label: "Select Yes/No"},
    {column_number : 3, filter_type: "auto_complete", text_data_delimiter: ","},
    {column_number : 4, column_data_type: "html", html_data_type: "text", filter_default_label: "Select tag"}]);


  table = $('#example').dataTable()
  table.yadcf([
    {column_number : 0},
      {column_number : 1,  filter_type: "range_number_slider", filter_container_id: "external_filter_container"},
      {column_number : 2, data: ["Yes", "No"], filter_default_label: "Select Yes/No"},
      {column_number : 3, text_data_delimiter: ",", filter_type: "auto_complete"},
      {column_number : 4, column_data_type: "html", html_data_type: "text", filter_default_label: "Select tag"}]);
}

function datatables_search_negate(dt,search_word){
  dt.columns('status:name').search('^((?!'+search_word+').)*$',true,false).draw()
}

//how to search with datatables
function datatables_search(dt){
  dt.columns('task_type:name').search('current').draw()
}
//add a record to datatables 
function row_add_datatables(table,dictionary_obj){
    table.row.add(dictionary_obj).draw( false );
}

//update label of status of rag (created: 5/28/18)
function url_create_datatables(td, cellData, rowData, row, col){
  title = rowData.name||rowData.title
  return $(td).html("<a target='_blank' href='"+cellData+"'>" +title + "</a>")
}

//update label of status of rag (created: 5/28/18)
function airbnb_url_create_datatables(td, cellData, rowData, row, col){
  airbnb_url = rowData.airbnb_url
  title = rowData.title
  return $(td).html("<a target='_blank' href='"+airbnb_url+"'>" +title + "</a>")
}


//get the data from the api 
function datatables_data_get_from_api(table_id){
  table_id = table_id||"#table"
  return $(table_id).DataTable().api().rows({ page: "current" }).data();
}


//parse the float to two decimals
function parse_float_datatable_format(td, cellData, rowData, row, col) {
  r = parseFloat(cellData)||0
  r = r.toFixed(2)
  $(td).html(r)
}

//used by cleaners.html to format check in
function date_format_check_in(td, cellData, rowData, row, col){
  date_format = moment(cellData).format("MM/DD/YY (dd)")
  $(td).html(date_format)

}

//used by cleaners.html and others to create guest url 
function guest_url_create(data, type, row, meta){
    url = "https://app.guesty.com/reservations/"+row._id+"/inbox"
    data = '<a target="_blank"  href="' + url + '">' + data + '</a>';
    return data;
  }

//format the datatables date with the date and time
function date_time_datatable_format_render_seconds(data,type,row,meta) {
  if (moment(data).isValid()){

    date_format = moment(data).format("MM/DD/YY hh:mm:ssA (dd)")
    date_format_from = moment(data).fromNow()
  }
  else {
    date_format = moment(data,"MM-DD-YYYY h:mm a").format("MM/DD/YY hh:mmA (dd)") 
    date_format_from = moment(data,"MM-DD-YYYY h:mm a").fromNow()


  }
  return '<span title="'+date_format_from+'">'+date_format+'</span>'
  //$(td).attr('title',moment(cellData).fromNow())
  //$(td).html(date_format);
}


//format the datatables date with the date and time
function moment_from_now_reder(data,type,row,meta) {
  date_format_from_now = moment(data).fromNow()
  date_format_text = moment(data).format("MM/DD/YY hh:mmA (dd)") 
  return '<span "title"="'+date_format_text+'">'+date_format_from_now+'</span>'

}


//format the datatables date with the date and time
function number_format_render(data,type,row,meta) {
  num =  parseFloat(data)||'NaN'
  if (num != 'NaN'){
    r = num.toFixed(1)
  }
  else {
    r = num 
  }
  return r 
  //$(td).attr('title',moment(cellData).fromNow())
  //

}
//format the datatables date with the date and time
function date_time_datatable_format_render(data,type,row,meta) {
  if (moment(data).isValid()){

    date_format = moment(data).format("MM/DD/YY hh:mmA (dd)")
    date_format_from = moment(data).fromNow()
  }
  else {
    date_format = moment(data,"MM-DD-YYYY h:mm a").format("MM/DD/YY hh:mmA (dd)") 
    date_format_from = moment(data,"MM-DD-YYYY h:mm a").fromNow()


  }

  return '<span "title"="'+date_format_from+'">'+date_format+'</span>'
  //$(td).attr('title',moment(cellData).fromNow())
  //$(td).html(date_format);
}

//format the datatables date with the date and time
function date_time_datatable_format(td, cellData, rowData, row, col) {
  date_format = moment(cellData).format("MM/DD/YY hh:mmA (dd)");
  $(td).attr('title',moment(cellData).fromNow())
  $(td).html(date_format);
}


//simple datatable from array 
function data_table_simple(array,div_id){
  key_names = Object.keys(array[0])
  columns_list = []
  key_names.forEach(function(i){
    columns_list.push({data:i,title:i,name:i})
  })
  div_id = div_id || "#table"
  array.forEach(function(D){
          key_check_func_dictionary(key_names,D)

    
  })

  return $(div_id).DataTable({
  paging: false,
  dom: '<"html5buttons"B>lTfgitp',
  data: array,
  columns:columns_list,
  select: true,
  colReorder: true,
  buttons: [
    { extend: "excel", title: document.title },
    { extend: "colvis", title: document.title }
  ],
  order: [3, "desc"]
});

}

//when you click on row, it changes the value
function clickable_change_value(table_id,editor,){
  table_id = table_id||"#table"
  $(table_id).on("click", "tbody td", function(e) {
  var table = $(table_id).DataTable();
  row_data = table.row(this).data();
  if (row_data.status == 'Green'){
    change_value = 'Red'
  }
  else {
    change_value = 'Green'
  }
  row_data['status'] = change_value
  editor
    .edit(this, false)
    .set("status", change_value)
    .submit();
    status_format(this, row_data.name, row_data, 1, 1)
});
}


//update label of status of rag (created: 5/28/18)
function status_format_datatables(td, cellData, rowData, row, col){
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

//convenience function for custom fields
function datatable_fields_array_from_custom_fields(custom_fields){
  l = []
  custom_fields.forEach(function(custom_field){
    new_dictionary = {data:custom_field, name: custom_field,title:custom_field}
    l.push(new_dictionary)
  })
  return l 
}


//convenience function for custom fields
function editor_fields_array_from_custom_fields(custom_fields){
  l = []
  custom_fields.forEach(function(custom_field){
    new_dictionary = { label: custom_field + ":", name: custom_field }
    l.push(new_dictionary)
  })
  return l 
}



//this should go at top of datatables
function sort_by_unix_datatabes(){
	$.fn.dataTable.ext.type.order["date-format-moment-pre"] = function(d) {
	  r = moment(d).utc();
	  return r;
	};
}

//based on filter from table , update a funciton
function callback_function_sum_datatables(variable_name){
  var api = this.api();
  variable_name = api.column(variable_name+":name", {page:'current'} ).data().sum()
  return api 
}

//format the datatables date with the date
function date_format_with_day(td, cellData, rowData, row, col) {
  date_format = moment(cellData).format("MM/DD/YY (dd)");
  $(td).html(date_format);
}

//format the date as its created
function date_format_created_moment_datatables(td, cellData, rowData, row, col) {
  date_format = moment(cellData).format("MMM-YYYY");
  $(td).html(date_format);
}


function editor_initiate(table_id,fields_list){
	fields_list == fields_list|| [{label: "Custom Field:",name: "custom_field"}]
	editor = new $.fn.dataTable.Editor( {
      table: table_id,
      fields:fields_list,
      idSrc:  'id'
 	 });
	return editor

}
//process the response from the psot submit
function editor_post_submit_function_datatables(func){
	editor.on( 'postSubmit', function (e, json, data, action, xhr) {
	    json_array = json.data
	    json_array.forEach(function(D){
	    	func(D)
	    })
  	});
}

function datatables_initiate_render(table_id,columns_list,editor,input_data){
  input_data = input_data || {}
	table_example = $(table_id).DataTable({
    dom: '<"html5buttons"B>lTfgitp',
    data: [],
    columns:columns_list,
    // columns: [
    //   {data:'account_name',title:'Account Name',name:'Account Name',visible:true},
    //   {data:'amount',title:'Amount',name:'Amount',visible:true},
    //   {data:'category',title:'Category',name:'Category',visible:true},
    //   {data:'date',title:'Date',name:'Date',visible:true,type: "date-format-moment"},
    //   {data:'month',title:'Month',name:'month',visible:true},
    //   {data:'description',title:'Description',name:'Description',visible:true},
    //   {data:'labels',title:'Labels',name:'Labels',visible:false},
    //   {data:'notes',title:'Notes',name:'Notes',visible:false},
    //   {data:'original_description',title:'Original Description',name:'Original Description',visible:false},
    //   {data:'transaction_type',title:'Transaction Type',name:'Transaction Type',visible:true}

    // ],
    select: true,
    colReorder: true,
    buttons: [
                { extend: "excel", title: document.title },
                { extend: "colvis", title: document.title },
                { extend: 'create', editor: editor },
                { extend: "edit", editor: editor },
                {text: 'Clear',name:'Clear', action: function ( e, dt, node, config ) {
                  dt.columns('').search('').draw()
                }}]
  });

  return table_example
}
//excel_functions.js


//https://www.codeproject.com/Articles/1197349/Excel-files-in-Javascript-the-simple-way

// Create an Excel with system default font
function create_excel_object(){
	var excel = $JExcel.new();
	return excel                    
}

// Create an Excel with Arial 10 Font
function create_excel_object_with_formatting(format){
	format = format||"Arial 10 #333333"
	var excel = $JExcel.new(format);  // Default font is Arial 10 in RGB #333  
	return excel             
}

//Create an excel file to download
function generate_excel_download_file(excel,file_name){
	var excel = excel||$JExcel.new();
	file_name = file_name||"SampleData.xlsx"
	excel.generate(file_name);
	return excel 
}

//is used to register styles in the Excel document. It requires a style definition object which is made of up to 5 properties:
function excel_add_style(excel){
	var excel = excel||$JExcel.new();
	var excel_style= excel.addStyle ({
	  fill: "#ECECEC" ,                        // background color in #RRGGBB
	  border: "none,none,none,thin #333333",    // left border,right border,top border, bottom border
	  font: "Calibri 12 #0000AA B",          // font-name font-size font-color font-style
	  format: "yyyy.mm.dd hh:mm:ss",           // display format
	  align: "R T"                          // horizontal-align vertical-align
	});
	return excel_style
}

//define cell style and add cell value
function excel_define_cell(){
	var excel = excel||$JExcel.new();
	var excel_style = excel.addStyle({font: "Arial 10 B"});        // Define style Arial 10 bold                
	excel.set({sheet:0,col:5,row:3,value: "HELLO",style:excel_style});
}

//defines the name of the sheet
function excel_define_sheet_name(excel){
	var excel = excel||$JExcel.new();
	sheet_name = sheet_name||"Summary"
	sheet_number = sheet_number||0
	excel.set(sheet_number,undefined,undefined,sheet_name); 
	return excel 
}



//firebase_functions.js


function firebase_signin_prompt_params(){
  params = params||{
    firebase_auth_container:'#firebaseui-auth-container',
    signInSuccessUrl:'https://chriscruze.github.io/Taskr/index.html'
  }
      var uiConfig = {
        callbacks: {
          signInSuccess: function(currentUser, credential, redirectUrl) {
            return true;
          },
          signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            console.log(authResult)
            return true;
          },
            signInFailure: function(error) {
            return console.log(error);
          },
          uiShown: function() {
          }
        },
        credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM,
        queryParameterForWidgetMode: 'mode',
        queryParameterForSignInSuccessUrl: 'signInSuccessUrl',
        signInFlow: 'popup',
        signInSuccessUrl: params.signInSuccessUrl,
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID
        ]
      };
      var ui = new firebaseui.auth.AuthUI(firebase.auth());
      ui.start(params.firebase_auth_container, uiConfig);
}


function firebase_login_configuration(params) {
  params = params||{
    firebase_auth_container:'#firebaseui-auth-container',
    signInSuccessUrl:'https://chriscruze.github.io/Taskr/index.html',
    // application_function: function(user){console.log(user)},
    
  }
        return firebase.auth().onAuthStateChanged(function(user) {
              if (user) {
                user.getIdToken().then(function(accessToken) {
                  console.log(user)
                  params.application_function(user)
                });
              } else {
                  firebase_signin_prompt_params(params)
                  // window.location.href = params.login_url||'https://chriscruze.github.io/Taskr/index.html';
              }
            }, function(error) {
                console.log(error);
            });
    };



//This function checks whether the user is logged in. If the user is logged in, then it runs the app_start function
//{application_function:func,login_url:func}
function firebase_check_login_initiate(params) {
        return firebase.auth().onAuthStateChanged(function(user) {
              if (user) {
                user.getIdToken().then(function(accessToken) {
                  console.log(user)
                  params.application_function(user)
                });
              } else {

                  window.location.href = params.login_url||'https://chriscruze.github.io/Taskr/index.html';
              }
            }, function(error) {
                console.log(error);
            });
    };





function firebase_account_create(email,password){
 firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
}
//account_create('cruzc.09@gmail.com','sTorr955')


function firebase_account_login(email,password){
  return firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});
}


//sign in using firebase
function firebase_signin(){
      // FirebaseUI config.
      var uiConfig = {
        callbacks: {
          signInSuccess: function(currentUser, credential, redirectUrl) {
            console.log(currentUser)
                        console.log(credential)
            console.log(redirectUrl)

            // Do something.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            return true;
          },
          uiShown: function() {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById('loader').style.display = 'none';
          }
        },
        credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM,
        // Query parameter name for mode.
        queryParameterForWidgetMode: 'mode',
        // Query parameter name for sign in success url.
        queryParameterForSignInSuccessUrl: 'signInSuccessUrl',
        // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
        signInFlow: 'popup',
        signInSuccessUrl: 'https://chriscruze.github.io/CruzControl/main.html',
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          firebase.auth.TwitterAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        // Terms of service url.
        tosUrl: '<your-tos-url>'
      };

      var ui = new firebaseui.auth.AuthUI(firebase.auth());
      // The start method will wait until the DOM is loaded.
      ui.start('#firebaseui-auth-container', uiConfig);
}

function account_sign_in_status(){
        function initApp() {
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var uid = user.uid;
            var phoneNumber = user.phoneNumber;
            var providerData = user.providerData;
            user.getIdToken().then(function(accessToken) {
                console.log(displayName)
                console.log(email)

              // $("#username").html(displayName)
              // $("#email").html(email)
              // $("#user_photo").attr('src',photoURL)

            });
          } else {
                            console.log('not signed in')

            //window.location.href = 'https://chriscruze.github.io/CruzControl/login.html';
            document.getElementById('sign-in-status').textContent = 'Signed out';
            document.getElementById('sign-in').textContent = 'Sign in';
            document.getElementById('account-details').textContent = 'null';
          }
        

        }, function(error) {
          console.log(error);
        });
      


      };

      window.addEventListener('load', function() {
        initApp()
      });

}

//pull ref from firebase
function ref_attain_from_firebase(reference_name,child_name){
	var dbRef = firebase.database();
	var contactsRef = dbRef.ref(reference_name).child(child_name)
	return contactsRef
}

//push data to firebase
function data_push_to_firebase(contactsRef,data_to_push){
  //data_to_push = {'chat_id':chat_id, 'viewer':site_viewer, 'content': input_text, 'timestamp': date_time }
  contactsRef.push(data_to_push)

}

//query the contacts ref and run the process_func on the results
function query_elements_array_firebase(contactsRef,process_func){
	contactsRef.on('child_added', function(snapshot) {
  		process_func(snapshot.val())
	})
}

//pulls straight json if the firebase is open
function firebase_json_pull(url){
    url = url||"https://shippy-ac235.firebaseio.com/DataTablesTest/Test3.json"
    l = $.ajax({
      url: url,
      method: "GET",
      async:false,
      headers: {"Accept":"application/json; odata=verbose"}
    })
    results = l.responseJSON
    return results
  }

//purpose is to check one dictionary against another and update it 
function dictionary_cross_check_apply_key(D,firebase_defined_dict,key){
    	if (firebase_defined_dict != undefined) {
      		D[key] = firebase_defined_dict[key]||"null";
    	} else {
      		D[key] = "null";
    	}

}

//purpose is to sync firebase array with regular array across keys
function firebase_array_integrate(array,firebase_url,identifier,keys) {
	keys = keys||['status']
	firebase_url = firebase_url||"https://shippy-ac235.firebaseio.com/dashbot/accounts.json"
	identifier = identifier||"DT_RowId"
  
  	firebase_dict = firebase_json_pull(firebase_url)||{}
  	array.forEach(function(D) {
    	firebase_defined_dict = firebase_dict[D[String(identifier)]]
    	keys.forEach(function(key){
    		dictionary_cross_check_apply_key(D,firebase_defined_dict,key)
    	})
    	

  });
  return array;
}


// initialize the firebase instance
function firebase_initialize(){
	var config = {
	apiKey: "AIzaSyApJBfnH0j3TSugzEABiMFkI_tU_XXeGzg",
	authDomain: "shippy-ac235.firebaseapp.com",
	databaseURL: "https://shippy-ac235.firebaseio.com"
	};
	firebase.initializeApp(config);
	return firebase
}

//authenticate the user that has been authed
function firebase_auth_user_process(user_process_func){
  firebase.auth().onAuthStateChanged((user) => {
  if (user) {
  	user_process_func(user)
    }
  });
}
//jquery_functions.js

//https://stackoverflow.com/questions/18614301/keep-overflow-div-scrolled-to-bottom-unless-user-scrolls-up/21067431
function updateScroll(yourDivID){
    var element = document.getElementById(yourDivID);
    element.scrollTop = element.scrollHeight;
}

//how to find parent elements
function find_parent_elements(this_elem){
	$(this_elem).closest('.ibox').find(".markdown_edit_form").show()

}

//sort a list of divs https://stackoverflow.com/questions/32362404/javascript-jquery-reorder-divs

function sort_divs_jquery(parent_identifier,sort_attribute){
  sort_attribute = sort_attribute || 'data-status'
  parent_identifier = parent_identifier||'#target'
  $(parent_identifier+' > div').sort(function (a, b) {
    var contentA = parseInt($(a).attr(sort_attribute), 10);
    var contentB = parseInt($(b).attr(sort_attribute), 10);
    return (contentA < contentB) ? 1 : (contentA > contentB) ? -1 : 0;
  }).appendTo(parent_identifier);

}

//get the td jquery objects from a table based on a table id
function table_jquery_objects_to_array(table_id){
	list_of_lists = []
	$("#"+table_id+" tr").each(function(row_number) {
	  col_values = Object.values($(this).find('td'))
	  	if (col_values.length > 0){
	  		col_values.forEach(function(col_val,col_number){
	  			new_dictionary = {
	  				row_number: row_number,
	  				col_number: col_number,
	  				cell_value: $(col_val).text(),
	  				class_name: $(col_val).attr('class')
	  			}
	    		list_of_lists.push(new_dictionary)
	  		})
	  	}
	});
	return list_of_lists
}

//upon hovering over change the css
function style_change_upon_hover(class_name){
	class_name = class_name||'.moreBtn'

	$(class_name).hover(function(){
        $(this).css("background", "blue")
    })
}


//change text upon mouse over 
function style_change_upon_mouse_over(class_name){
	class_name = class_name||'.moreBtn'
	$(class_name).mouseover(function(){
    $(this).css({
        'color' :'red',
        //other styles
    })
});
}




//add tooltip to element
function tooltip_add_jquery(div_id,tooltip_text){
	$(div_id).attr("data-toggle","tooltip")
	$(div_id).attr("title",tooltip_text)
	$('[data-toggle="tooltip"]').tooltip(); 
}


//click on a button
function div_click_jquery(ref_id){
	$(ref_id).click();
}

//press enter when clicked
function enter_press_down_jquery(ref_id){
$(ref_id).keypress(function (e) {
 var key = e.which;
 if(key == 13)  // the enter key code
  {run_function()
  }
});  


}

//function that uses jquery to run a function from a click
function update_from_click_jquery(div_id){
	div_id = div_id||".cell-value"
	$(div_id).on('click', function (e) { $(this)})
}

//get the td jquery objects from a table based on a table id
function table_jquery_objects(table_id){
	list_of_lists = []
	$("#"+table_id+" tr").each(function(row_number) {
	  row_list = []
	  col_values = Object.values($(this).find('td'))
	  	if (col_values.length > 0){
	  		col_values.forEach(function(col_val,col_number){
	  			col_val['row_number'] = row_number
	  			col_val['col_number'] = col_number
	    		row_list.push(col_val)
	  		})
	  		list_of_lists.push(row_list)
	  	}
	});
	return list_of_lists
}

//moment_functions.js




//create an interval string with start time, end time and minutes elapsed. used in create_task_v2 to keep track of time
function time_interval_string_format_from_start_time(start_time_core){
      end_time = moment().format()
      start_time = moment(start_time_core).format("h:mm:ssa")
      end_time = moment(end_time).format("h:mm:ssa")
      var now = moment().valueOf()  //now is the time right now
      start_time_instance = moment(start_time_core).valueOf()
      var elapsed = now - start_time_instance;
      seconds = elapsed/1000
      elapsed_minutes = String(parseFloat(seconds/60).toFixed(2))  //add a two minute buffer
      formatted_string = " [" + start_time + "-" + end_time + "|"+ elapsed_minutes+"min]"
      return formatted_string

}

//update the html of the timer
function html_timer_update_from_jquery(jquery_identifier,start_time){
    time_text = time_since_start_time_moment(start_time)
    $(jquery_identifier).html(time_text)
    document.title = time_text
}


//update from jquery identifier the time 
function timer_jquery_html_update_from_start_time_moment(start_time,jquery_identifier){
  jquery_identifier = jquery_identifier||"#input_label_timer"
  setInterval(html_timer_update_from_jquery,1000,jquery_identifier,start_time)
}


//used in create_task_v2 to keep track of time
function time_since_start_time_moment_to(start_time){
    now = moment().valueOf()  //now is the time right now
    start_time_instance = moment(start_time).valueOf()
    elapsed = start_time_instance - now ;
    time_text_value = moment(elapsed).subtract({hours: 19}); //have to subtract 19 hours for some reason
    time_text = time_text_value.format("HH:mm:ss")
    return time_text
 }


//used in create_task_v2 to keep track of time
function time_since_start_time_moment_compare(end_time,start_time){
    now = moment(end_time).valueOf()  //now is the time right now
    start_time_instance = moment(start_time).valueOf()
    elapsed = now - start_time_instance;
    time_text_value = moment(elapsed).subtract({hours: 19}); //have to subtract 19 hours for some reason
    

    time_text = time_text_value.format("HH:mm:ss")
    return time_text
 }

//used in create_task_v2 to keep track of time
function time_since_start_time_moment(start_time){
    now = moment().valueOf()  //now is the time right now
    start_time_instance = moment(start_time).valueOf()
    elapsed = now - start_time_instance;
    time_text_value = moment(elapsed).subtract({hours: 19}); //have to subtract 19 hours for some reason
    time_text = time_text_value.format("HH:mm:ss")
    return time_text
 }


//tells us how long ago 
function moment_time_ago(input_time){
  return moment(input_time).fromNow();
}

//check if the day is today, 'year, month, week, minute'
function check_if_date_is_current_range(input_date,date_range){
  date_range = date_range || 'day'
  return moment(input_date).isSame(Date.now(), date_range);
}
//creates a string that indicates whether its in the day,week,month,year
function date_within_range_string_create(input_date){
  date_string = ''
  if (moment(input_date).isSame(Date.now(), 'day')){
    date_string = date_string + "today"
  }
  if (moment(input_date).isSame(Date.now(), 'week')){
    date_string = date_string + "this_week"
  }
  if (moment(input_date).isSame(Date.now(), 'month')){
    date_string = date_string + "this_month"
  }
  if (moment(input_date).isSame(Date.now(), 'year')){
    date_string = date_string + "this_year"
  }
  if (moment(input_date) >= moment(Date.now())){
    date_string = date_string + "future"
  }
  if (moment(input_date) <= moment(Date.now())){
    date_string = date_string + "past"
  }
  return date_string
}


//get hour from time
function get_hour_from_time(i){
  r = Date(i)
  hour = parseInt(moment(r).format("H")) + 5
  return hour
}


//get the current time from moment
function attain_now_from_moment(){
  date_time = moment().format();
  return date_time
}

//return unix now moment
function unix_now_moment(){
	return moment().unix()
}

//return hour-minute format using moment
function hour_format_moment(timestamp){
	return moment(timestamp).format("hh:mmA")
}

//filter a certain date for current time range such as today, this month etc.
function date_range_filter_moment(date_input,strf){
    if (date_input){
      this_month = moment().format(strf) //01
      completed_date_moment = new moment(date_input)
      completed_month = completed_date_moment.format(strf)
      return completed_month === this_month
    }
}


//set the hour from a given day
function set_date_time_moment(date,hour){
  new_date = new Date(moment(date).format())
  new_date.setHours(hour)
  return moment(new_date)
}

function date_difference_from_today_days_moment(date_added){
    a = new moment()
    b = new moment(date_added)
    age_days = a.diff(b,'days')
    return age_days
}


//dates that are within this month
function dates_within_this_month(){
    days = moment().daysInMonth();
    today = new Date()
    month = String(today.getMonth()+1)
    year = String(today.getFullYear())
    date_string = year + "-" + month + "-01"
    start_time = moment(date_string)
    hours_list = []
    for (i = 0; i < days; i++) { 
        next_time = start_time.clone()
        next_time.add(i,'day')
        hours_list.push(next_time)

    }
    return hours_list
  } 

//return a list of days in the future 
function number_of_days_ahead_calculate(days_ahead){
    today = new Date()
    month = String(today.getMonth()+1)
    year = String(today.getFullYear())
    start_time = moment()
    hours_list = []
    for (i = 0; i < days_ahead; i++) { 
        next_time = start_time.clone()
        next_time.add(i,'day')
        hours_list.push(next_time.format())
    }
    return hours_list
  } 


//return a list of days in the future. This returns an array 
function number_of_days_ahead_calculate_array(days_ahead){
    today = new Date()
    month = String(today.getMonth()+1)
    year = String(today.getFullYear())
    start_time = moment()
    hours_list = []
    for (i = 0; i < days_ahead; i++) { 
        next_time = start_time.clone()
        next_time.add(i,'day')

        hours_list.push({date:next_time.format()})
    }
    return hours_list
  } 


//return list of days in the past
function dates_past_n_days(days){
    today = new Date()
    month = String(today.getMonth()+1)
    year = String(today.getFullYear())
    date_string = moment().format("YYYY-MM-DD")//year + "-" + month + "-01"
    start_time = moment(date_string)
    hours_list = []
    for (i = 0; i < days; i++) { 
        next_time = start_time.clone()
        next_time.subtract(i,'day')
        hours_list.push(next_time)

    }
    hours_list.reverse()
    return hours_list
  } 

//return list of days in the past but strf formatted
function dates_past_n_days_formatted(days,strf){
    strf = strf || "YYYY-MM-DD"
    today = new Date()
    month = String(today.getMonth()+1)
    year = String(today.getFullYear())
    date_string = moment().format("YYYY-MM-DD")//year + "-" + month + "-01"
    start_time = moment(date_string)
    hours_list = []
    for (i = 0; i < days; i++) { 
        next_time = start_time.clone()
        next_time.subtract(i,'day')
        hours_list.push(next_time.format(strf))
    }
    hours_list.reverse()
    return hours_list
  } 



//return list of days in the past but strf formatted. This is as an array.
function dates_past_n_days_formatted_array(days,strf){
    strf = strf || "YYYY-MM-DD"
    today = new Date()
    month = String(today.getMonth()+1)
    year = String(today.getFullYear())
    date_string = moment().format("YYYY-MM-DD")//year + "-" + month + "-01"
    start_time = moment(date_string)
    hours_list = []
    for (i = 0; i < days; i++) { 
        next_time = start_time.clone()
        next_time.subtract(i,'day')
        hours_list.push({date:next_time.format(strf)})

    }
    hours_list.reverse()
    return hours_list
  } 


//pulls the dates between two dates
function dates_between_dates_moment(startDate, stopDate) {
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push(currentDate.clone());
        currentDate.add(1,'day');
    }
    return dateArray;
}



//stock_functions.js

//https://api.iextrading.com/1.0/stock/market/batch?symbols=aapl,fb&types=quote,news,chart&range=1m&last=5



function stock_pull(url){
    url = url||"https://api.iextrading.com/1.0/stock/market/batch?symbols=aapl,fb&types=quote,news,chart&range=1m&last=5"
    l = $.ajax({
      url: url,
      method: "GET",
      async:false,
      headers: {"Accept":"application/json; odata=verbose"}
    })
    results = l.responseJSON
    return results
  }
//toastr_functions.js


//message notification once something is done
function toastr_notification(message){
	toastr.options.closeButton = true;
	toastr.options.onclick = function() { console.log('clicked'); }
	toastr.info(message)
}
//typewriter_functions.js


//create a typewritter effect using typewritter library (https://safi.me.uk/typewriterjs/)
function typewriter_element_create(div_id,input_text){
	div_id = div_id||'app'
	input_text = input_text||$("#"+div_id).html()


	var app = document.getElementById(div_id);
	var typewriter = new Typewriter(app, {
	    loop: true
	});

	typewriter.typeString(input_text)
	    .pauseFor(10000)
	    .start();

}


function typewriter_multiple_questions_create(div_id) {
      div_id = div_id || 'app'
      questions = $("#" + div_id).attr("questions").split("|")

        
      var app = document.getElementById(div_id);
      var typewriter = new Typewriter(app, {
        loop: true
      });
        
    questions.forEach(function(i){
      typewriter.typeString(String(i))
      .pauseFor(1000)
      .deleteAll()
        
    })

        
          
   typewriter.start();
}
//underscore_functions.js

// get sum from array with key
function sum_float_convert_from_array_underscore(arr,key_name) { 
  // returns the sum total of all values in the array
  return _.reduce(arr, function(memo, num) { 
    r = memo + (parseFloat(num[key_name])||0)
    return r 
  }, 0); 
}

//group by an array
function group_by_underscore(gspread_array_data){
	_.groupBy(gspread_array_data,'status')['Red']||[]
}


function min_date_from_array_underscore(array,key_name){
	key_name = key_name || 'task_date'
	return _.min(array,function(D){return moment(D[key_name]).valueOf() })

}

function max_date_from_array_underscore(array,key_name){
	key_name = key_name || 'task_date'
	return _.max(array,function(D){return moment(D[key_name]).valueOf() })

}
//gspread_functions.js

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

//guesty_functions.js

function guesty_reservation_data_pull_custom(){
  l = guesty_reservation_data_pull()
  l.forEach(guest_reservation_dictionary_customize)
  return l 
}

//determine state if reservation is current
function guest_state_determine(item){
  is_present = moment(item['checkIn']) <= moment() && moment() <= moment(item['checkOut']) 
  if (is_present){
    return 'current'
  }
  else {
    return 'not current'
  }
}


//using the information from guesty we are able to dictionary items
function guest_reservation_dictionary_customize(item,index){
    price = item['money']['netIncome']
    days_difference = Math.round((new Date(item['checkOut']) - new Date(item['checkIn']))/(1000*60*60*24)) 
    revenue_per_day = price/days_difference
    run_rate = revenue_per_day * 30
    guest_name = item.guest.fullName
    price = parseInt(price)||0
    revenue_per_day = parseInt(revenue_per_day)||0
    run_rate = parseInt(run_rate)||0
    room=item.listing.nickname
    days_from_now = Math.round((new Date(item['checkOut']) - new Date())/(1000*60*60*24)) 
    item['guest_phone'] = dictionary_check_keys_double_return(item,'guest','phone')

    item['guest_public_review'] = dictionary_check_keys_triple_return(item,'review','guestReview','public')
    item['guest_private_review'] = dictionary_check_keys_triple_return(item,'review','guestReview','private')


    item['days_from_now'] = days_from_now
    item['days_from_now_absolute'] = Math.abs(days_from_now)
    item['days_difference'] = days_difference
    item['revenue_per_day'] = revenue_per_day
    item['run_rate'] = run_rate
    item['guest_name'] = guest_name
    item['listing_nick_name'] = item.listing.nickname||'null'
    item['listing_title'] = item.listing.title||'null'
    item['account_name'] = item.integration.object.nickname||'null'
    item['state'] = guest_state_determine(item)
    item['DT_RowId'] = item._id

    item["check_out_date_range"] = date_within_range_string_create(item.checkOut);
    item["check_in_date_range"] = date_within_range_string_create(item.checkIn);


    is_3009 = item['listing']['nickname'].indexOf("2608") != -1
    is_401 = item['listing']['nickname'].indexOf("401") != -1
    is_1806 = item['listing']['nickname'].indexOf("1806") != -1
    if (is_3009){
      item['room_number'] = '2608'
    }
    else if (is_401){
      item['room_number'] = '401'
    }
    else if (is_1806){
      item['room_number'] = '1806'
    }
    else{
      item['room_number'] = 'N/A'

    }
  }



// The below function pulls the data from the guesty
function guesty_reservation_data_pull(){
    key = '57b6349a1f211d3c4b2b4c886c5632c7'
    secret = '1b8e3bd1f42ce6b054868cd47dc0412f'
    reservations_url = 'https://superhostuser.herokuapp.com/api/v2/reservations'
    results = $.ajax
    ({
      type: "GET",
      url: reservations_url,
      dataType: 'json',
      async: false,
      data: {'viewId':'5616071779035e0e0096290c'},
      headers: {
        "Authorization": "Basic " + btoa(key + ":" + secret)
    }
    });
    return results.responseJSON.results
    }


function guesty_listing_data_pull(){
  response_result = $.ajax({type: "GET",
  url: 'https://superhostuser.herokuapp.com/api/v2/listings',
  dataType: 'json',
  async: false,
  headers: { "Authorization": "Basic " + btoa("57b6349a1f211d3c4b2b4c886c5632c7:1b8e3bd1f42ce6b054868cd47dc0412f")},
  data: {limit:50}
});
  array = response_result.responseJSON.results
  array.forEach(function(D){D['nickname'] = D['nickname']||'null'})
  return array 
}

function guesty_integration_data_pull(){
  json_response =  $.ajax({type: "GET",
    url: 'https://superhostuser.herokuapp.com/api/v2/integrations',
    dataType: 'json',
    async: false,
    headers: { "Authorization": "Basic " + btoa("57b6349a1f211d3c4b2b4c886c5632c7:1b8e3bd1f42ce6b054868cd47dc0412f")},
    data: {limit:25}
  }).responseJSON
  return json_response.results
}


//create url for reservation for datatables functions
function guesty_reservations_inbox_url_create(td, cellData, rowData, row, col) {
  url = "https://app.guesty.com/reservations/" + rowData.guestId + "/inbox";
  new_url = "<a href='" + url + "'>" + cellData + "</a>";
  console.log(new_url);
  return new_url;
}

//create user airbnb url for data tables
function guest_airbnb_url_create(data, type, row, meta) {
  url = "https://www.airbnb.com/users/show/" + row.id + "";
  data = '<a target="_blank"  href="' + url + '">' + data + "</a>";
  return data;
}

//iextrading_functions.js

//https://api.iextrading.com/1.0/stock/market/batch?symbols=aapl,fb&types=quote,news,chart&range=1m&last=5
//https://iextrading.com/developer/docs/#batch-requests


function stock_pull(url){
    url = url||"https://api.iextrading.com/1.0/stock/market/batch?symbols=aapl,fb&types=quote,news,chart&range=1m&last=5"
    l = $.ajax({
      url: url,
      method: "GET",
      async:false,
      headers: {"Accept":"application/json; odata=verbose"}
    })
    results = l.responseJSON
    return results
  }


  function stocks_batch_pull(stocks){
    stocks_string = stocks.join(",")
    url = "https://api.iextrading.com/1.0/stock/market/batch?symbols="+stocks_string+"&types=quote,stats,news,chart&range=1m&last=5"
    l = $.ajax({
      url: url,
      method: "GET",
      async:false,
      headers: {"Accept":"application/json; odata=verbose"}
    })
    results = l.responseJSON
    return results
  }


  ///stock/market/batch?symbols=aapl,fb,tsla&types=quote,news,chart&range=1m&last=5
  //    url = url||"https://api.iextrading.com/1.0/stock/market/batch?symbols=PZZA&types=quote,news,chart&range=1m&last=5"

//ip_functions.js

function ipLookUp () {
  $.ajax('http://ip-api.com/json').then(
      function success(response) {
        
        session_dictionary['ip_data'] = response
        update_firebase_session_dictionary(response,'ip_data')
        console.log('User\'s Location Data is ', response);
      },
      function fail(data, status) {
          console.log('Request failed.  Returned status of',status);
      }
  );
}
//todoist_functions.js

//toodoist custom functions 
function current_task_average_age_from_array(array){
  //https://momentjs.com/docs/
  age_sum = 0
  array.forEach(function(D,index){
    date_added = D.date_added
    a = new moment()
    b = new moment(date_added)
    age_days = a.diff(b,'days')

    age_sum = age_sum + age_days
    //ages.push(age_days)
  })
  denom = array.length 
  avg = age_sum/denom 
  return avg 
}


//complete_task
function todoist_complete_task(task_id,todoist_api_token){
  todoist_api_token = todoist_api_token || 'a14f98a6b546b044dbb84bcd8eee47fbe3788671'

  r = $.ajax({
      type: "POST",
      url: 'https://beta.todoist.com/API/v8/tasks/'+String(task_id)+'/close',
      dataType: 'json',
      async: false,
      data: {
        'token': todoist_api_token
      }
    })
}

//url create of todoist task from title and task id
function html_link_from_todoist_task(task_title,task_id){
  url = 'https://en.todoist.com/app?lang=en#task%2F'+String(task_id)
  html_task = "<a target='_blank' href='" + url + "'>" + task_title + "</a>"
  return html_task 
}

//complete task in todoist
function task_complete_todoist(task_name,project_id,todoist_api_token){
  todoist_api_token = todoist_api_token || 'a14f98a6b546b044dbb84bcd8eee47fbe3788671'
  return todoist_add_tasks_ajax(todoist_api_token,{"content": task_name, "project_id": project_id},'item_complete')
}

//update task in todoist
function task_update_todoist(task_name,project_id,todoist_api_token){
  todoist_api_token = todoist_api_token || 'a14f98a6b546b044dbb84bcd8eee47fbe3788671'
  return todoist_add_tasks_ajax(todoist_api_token,{"content": task_name, "project_id": project_id},'item_update')
}
//create task in todoist
function task_create_todoist(task_name,project_id,todoist_api_token){
  todoist_api_token = todoist_api_token || 'a14f98a6b546b044dbb84bcd8eee47fbe3788671'
  return todoist_add_tasks_ajax(todoist_api_token,{"content": task_name, "project_id": project_id})
}


function gspread_table_tasks_generate(gspread_array_data,completed_tasks,current_tasks){


    gspread_array_data.forEach(function(gspread_dict){
      filtered_completed_tasks = completed_tasks.filter(function(complete_dict){return complete_dict['content'].toLowerCase().indexOf(gspread_dict['Task'].toLowerCase()) != -1})
      filtered_completed_tasks_today = filtered_completed_tasks.filter(function(complete_dict){return date_range_filter(complete_dict.completed_date,'YY-MM-DD')})
      gspread_dict['duration_today'] = sum_float_convert_from_array(filtered_completed_tasks_today,'duration')
      gspread_dict['duration'] = sum_float_convert_from_array(filtered_completed_tasks,'duration')
      gspread_dict['completed_count'] = filtered_completed_tasks.length

      if (filtered_completed_tasks.length > 0){
        last_completed = _.max(filtered_completed_tasks, function(complete_dict){ return moment(complete_dict.completed_date).valueOf();}).completed_date
        days_since_completed = moment().diff(last_completed, 'days')
        gspread_dict['days_since_last_completed'] = days_since_completed
        gspread_dict['last_completed'] = moment(last_completed).format("MM/DD hh:mm A");
        due_date = moment(last_completed).add(parseFloat(gspread_dict['Max Age']),'days').format()
        gspread_dict['due_date'] = due_date
        gspread_dict['days_remaining'] = (moment().diff(due_date, 'minutes')/1440)*-1

        is_good = parseFloat(gspread_dict['Max Age']) > days_since_completed
        days_to_incomplete = days_since_completed/parseFloat(gspread_dict['Max Age']) 

        gspread_dict['days_to_incomplete'] = days_to_incomplete



        if (is_good){
          gspread_dict['status'] = 'Green'
          gspread_dict['task_assigned'] = 'Green'

        }
        else {
        gspread_dict['status'] = 'Red'
        }
      }
      else {
        gspread_dict['last_completed'] = ''
        gspread_dict['days_since_last_completed'] = ''
        gspread_dict['status'] = 'N/A'
        gspread_dict['days_to_incomplete'] = ''

      }
      if (gspread_dict['status'] != 'Green'){

      filtered_current_tasks = current_tasks.filter(function(current_dict){return current_dict['content'].toLowerCase().indexOf(gspread_dict['Task'].toLowerCase()) != -1})
      is_assigned = filtered_current_tasks.length > 0
      if (is_assigned){
        filtered_current_tasks_with_due_date = filtered_current_tasks.filter(function(D){return D['due_date_utc'] != null})
        has_due_date = filtered_current_tasks_with_due_date.length > 0 
        if (has_due_date){
            gspread_dict['task_assigned'] = 'Green'

        }
        else {
            gspread_dict['task_assigned'] = 'Amber'

        }
      }

      else {
        gspread_dict['task_assigned'] = 'Red'

      }
    }


    })


    return gspread_array_data


}




//filter tasks for text
function task_filter_from_text(array,text){
  array = array.filter(function(D){return D.content.toLowerCase().indexOf(text.toLowerCase()) !== -1 })
  return array 
}

//filter tasks for text and return length
function task_filter_text_calculate_count(array,text){
  array = array.filter(function(D){return D.content.toLowerCase().indexOf(text.toLowerCase()) !== -1 })
  length_total = array.length
    return length_total
  //$(div_id).html(length_total)
}

//filter tasks for text and add the sum to a div
function task_filter_text_calculate_sum(array,text,sum_field){
  sum_field = sum_field||'duration'
  array = array.filter(function(D){return D.content.toLowerCase().indexOf(text.toLowerCase()) !== -1 })
  var sum_total = sum_float_convert_from_array_underscore(array,sum_field)
    return sum_total
}


//calculate the cost of the task at 15 dollar per rate
function task_cost_calculation(item,key_name,hourly_rate){
  hourly_rate = hourly_rate||15
  key_name = key_name|| 'duration'
  minutes = parseFloat(item[key_name])
  cost = minutes * (hourly_rate/60)
  return cost 
}

//return the sub project by parsing it out from the colon
function sub_project_from_task(item){
  item_name = item.content 
  sub_project = item_name.split(":")[0].trim()
  is_sub_project = sub_project.indexOf("|") == -1 && sub_project.indexOf("[") == -1  && sub_project.indexOf("@") == -1 
  if (is_sub_project){
    return sub_project //'-'
  }
  else {
    return '-'
  }
}

//return duration from the task name
function duration_from_task_dictionary(item){
  item_name = item.content 
  item_has_time = item_name.indexOf("|") != -1 && item_name.indexOf("[") != -1 && item_name.indexOf("]") != -1
  if (item_has_time){
    var duration =parseInt(item_name.substring(item_name.lastIndexOf("|")+1,item_name.lastIndexOf("min")));
  }
  else {
    duration = 0
  }
  return duration
}


//customize each dictionary of todoist task for additional attributes
function tasks_array_customize_item(item){
  item['sub_project'] = sub_project_from_task(item)//item_name.split(":")[0].trim()
  item['duration'] = duration_from_task_dictionary(item)
  item['cost'] = task_cost_calculation(item)
  item["DT_RowId"] = item.id;
  return item 
}


//https://stackoverflow.com/questions/49394588/how-to-create-todoist-task-using-todoist-api-v7
 function todoist_add_tasks_ajax(todoist_api_token,tasks,type,sync_token) {
  var sync_token = sync_token||"*"
  type = type || "item_add"//item_update

  tasks_is_list_array = Array.isArray(tasks)
  if (!tasks_is_list_array){
    tasks = [tasks]
  }
  var commands = todoist_tasks_to_commands(tasks,type);
  var data = {
    "token" : todoist_api_token,
    'sync_token' : sync_token,
    'resource_types' : '["projects", "items"]',
    'commands' : commands
  };
  
  return jQuery.ajax({
    url: "https://todoist.com/api/v7/sync",
    data: data,
    type: "POST",
    dataType: "json",
    success: function(response) {
      console.log(response);
      sync_token = response.sync_token;
    },
    error: function(response) { 
      console.log(response);
    },
  });
  
}

//commands to to doist, item_update,item_add, item_complete, item_delete
function todoist_tasks_to_commands(tasks,type) {
  type = type || "item_add"//item_update
  var commands = [];
  
  tasks.forEach(function(args) {
    
    var temp_commands = {
      "type": type,
      "temp_id": create_guid(),
      "uuid": create_guid(),
      "args": args
    };

    commands.push(temp_commands)

  });
  
  commands = JSON.stringify(commands);
  
  return commands;
  
}


//get current tasks 
function todoist_current_tasks_pull(){
 return $.ajax({
      type: "GET",
      url: 'https://en.todoist.com/api/v7/sync/',
      dataType: 'json',
      async: false,
      data: {
        'token': 'a14f98a6b546b044dbb84bcd8eee47fbe3788671',
        'sync_token':'*',
        'resource_types':'["items","labels","projects"]'
      }
    }).responseJSON
}

//get current tasks customized with project name and label name
function todoist_current_tasks_pull_custom(){
  current_tasks_base = todoist_current_tasks_pull()
  current_tasks = current_tasks_base.items 
  labels_dictionary = current_tasks_base.labels
  labels_dictionary = array_to_dictionary(labels_dictionary) 
  projects_dictionary = current_tasks_base.projects 
  current_tasks.forEach(function(D){tasks_array_customize_item(D)})
  return current_tasks
}

//update tasks
function todoist_update_task(task_id,content){
  return $.ajax({
      type: "GET",
      url: 'https://en.todoist.com/api/v7/sync/',
      dataType: 'json',
      async: false,
      data: {
        'token': 'a14f98a6b546b044dbb84bcd8eee47fbe3788671',
        'sync_token':'*',
        'resource_types':'["items"]',
        'commands':'[{"type": "item_update", "uuid": "f8539c77-7fd7-4846-afad-3b201f0be8a5", "args": {"id": '+String(task_id)+',"content":"'+content+'" }}]'
      }
    })
}

      // "temp_id": create_guid(),
      // "uuid": create_guid(),

//completes todoist task
function todoist_complete_task_v7(task_id){
  return $.ajax({
      type: "GET",
      url: 'https://en.todoist.com/api/v7/sync/',
      dataType: 'json',
      async: false,
      data: {
        'token': 'a14f98a6b546b044dbb84bcd8eee47fbe3788671',
        'sync_token':'*',
        'resource_types':'["items"]',
        'commands':'[{"type": "item_complete", "uuid": '+create_guid()+' "args": {"ids": ['+String(task_id)+']}}]'
      }
    })
}


//deletes todoist task
function todoist_delete_task(task_id){
  return $.ajax({
      type: "GET",
      url: 'https://en.todoist.com/api/v7/sync/',
      dataType: 'json',
      async: false,
      data: {
        'token': 'a14f98a6b546b044dbb84bcd8eee47fbe3788671',
        'sync_token':'*',
        'resource_types':'["items"]',
        'commands':'[{"type": "item_delete", "uuid": "f8539c77-7fd7-4846-afad-3b201f0be8a5", "args": {"ids": ['+String(task_id)+']}}]'
      }
    })
}


//child function of todoist_completed_tasks_all
function todoist_completed_tasks_with_offset(todoist_api_token,offset,since) {
  since = since||moment().subtract(30,'days').format('YYYY-MM-DD') + "T10:00"// '2018-05-08T10:00'//moment().subtract(60,'days').format('YYYY-MM-DD') //
    results = $.ajax({
      type: "GET",
      url: 'https://en.todoist.com/api/v7/completed/get_all',
      dataType: 'json',
      async: false,
      data: {
        'token': todoist_api_token,
        'since':since,
        //'since': '2017-12-30T10:00',

        'limit':'50',
        'offset':offset
      }
    });
    return results.responseJSON.items
  }


//Since todoist only lets you pull 50 tasks at a time, we're going to use a loop to get the first 50, then the second 50, then the third 50 tasks, etc. 
//when it's pulling empty lists, it can stop 
//we're going to use a while loop here (read more here: https://www.w3schools.com/js/js_loop_while.asp)
//pulls all of todoist tasks 
function todoist_completed_tasks_all(todoist_api_token,since){
  todoist_api_token = todoist_api_token||"a14f98a6b546b044dbb84bcd8eee47fbe3788671"//"fea02db7fc04ee9c9bd7c2a67c3d9de1cfa57941" //karina api token
  todoist_tasks_pulled = []
  iterator = 0 
  master_list = []
  while (todoist_tasks_pulled.length == 50|| iterator==0) { //if todoist pulls 50 tasks, then it should try again. when it pulls less, we know that it's the last loop we need to do. since the first loop will be less than 50 tasks length, i put in or clause that is iterator is 0 which will only be when it does the first loop
    limit_variable = 50 * iterator //this will go into the todoist completed tasks query
    todoist_tasks_pulled = todoist_completed_tasks_with_offset(todoist_api_token,limit_variable,since)//this is the list of tasks 
    master_list = master_list.concat(todoist_tasks_pulled)
    iterator += 1; //this will be 1 in the first loop, 2 in the second loop, etc. 
  }
  return master_list
}



//pulls all the todoist tasks and customizes each item
function todoist_completed_tasks_all_custom(todoist_api_token,since){
  l = todoist_completed_tasks_all(todoist_api_token,since)
  l.forEach(function(item){tasks_array_customize_item(item)})
  return l 
}

//converts minute labels to minutes
function labels_add_from_labels_dictionary(task_item,labels_dictionary){
  labels_list = task_item.labels
  label_list_is_undefined = labels_list == undefined
  if (label_list_is_undefined){
    r = 0 
  }
  try {
    r = 0 
    labels_list.forEach(function(item,index){
      label_dict = labels_dictionary[item]
      minute_number = label_dict.minute||label_minute_string_to_integer(label_dict.name)
      r = r + minute_number
    })
  }
  catch(err) {
    r = 0
  }

   task_item['duration'] = task_item['duration']||r 

}

function project_name_append(item,projects_dictionary){
  
  item_project_dictionary = _.groupBy(projects_dictionary,'id')[item.project_id]
  if (item_project_dictionary != undefined){
    project_name = item_project_dictionary[0].name
  }
  else {
    project_name = 'null'
  }
  item['project_name'] = project_name
}

//get dictionary of current_tasks and completed_tasks
function todoist_tasks_pull_custom(){
  current_tasks_base = todoist_current_tasks_pull()
  completed_tasks = todoist_completed_tasks_all()
  current_tasks = current_tasks_base.items 
  labels_dictionary = array_to_dictionary(current_tasks_base.labels) 
  projects_dictionary = current_tasks_base.projects 


  current_tasks.forEach(function(D){D['task_type']='current'})
  current_tasks.forEach(function(D){D['task_date']=D['due_date_utc']})
  completed_tasks.forEach(function(D){D['task_type']='completed'})
  completed_tasks.forEach(function(D){D['task_date']=D['completed_date']})



  current_completed_tasks = completed_tasks.concat(current_tasks) //combine both arrays together into one array
  current_completed_tasks.forEach(function(item){tasks_array_customize_item(item)})
  current_completed_tasks.forEach(function(item){labels_add_from_labels_dictionary(item,labels_dictionary)})
  current_completed_tasks.forEach(function(item){project_name_append(item,projects_dictionary)})
  current_completed_tasks.forEach(function(item){item['task_date_range'] = date_within_range_string_create(item['task_date'])})

  array_check_keys(current_completed_tasks,['due_date_utc','priority','date_added','completed_date'])
  return current_completed_tasks 
}

//calculate age from todoist
function age_calculate_from_todoist_task(D){
    date_added = D.date_added
    a = new moment()
    b = new moment(date_added)
    age_days = a.diff(b,'days')
    age_days = age_days || 0
    return age_days
}


function gspread_array_project_id_append(gspread_array_data,projects_dictionary){
  project_dictionary_reference = {}
  projects_dictionary.forEach(function(D){project_dictionary_reference[D['name']] = D['id']})
  gspread_array_data.forEach(function(D){
    D['project_id'] = project_dictionary_reference[D['Category']] || 'null'
  })
}

function gspread_array_manual_pull(){
  return [
    {
        "Category": "Bnb",
        "Description": "Pay 401 and Murano via Wells Fargo and 1806 via PayPal",
        "Estimated Duration": "5",
        "Max Age": "30",
        "Sprint": "Recurring",
        "Task": "Pay Rent",
        "Type": "Recurring",
        "completed_count": 1,
        "days_since_last_completed": 4,
        "duration": 0,
        "duration_today": 0,
        "last_completed": "07/04 04:00 PM",
        "project_id": 2159935681,
        "status": "Green",
        "task_assigned": "Green"
    },
    {
        "Category": "Entrepreneurship",
        "Description": "-",
        "Estimated Duration": "90",
        "Max Age": "3",
        "Sprint": "Intense",
        "Task": "Aesop",
        "Type": "Goal",
        "completed_count": 134,
        "days_since_last_completed": 0,
        "duration": 0,
        "duration_today": 0,
        "last_completed": "07/08 08:56 PM",
        "project_id": 2159934063,
        "status": "Green",
        "task_assigned": "Green"
    },
    {
        "Category": "Entrepreneurship",
        "Description": "-",
        "Estimated Duration": "5",
        "Max Age": "7",
        "Sprint": "Phone - Quick",
        "Task": "Ideate",
        "Type": "Habit",
        "completed_count": 4,
        "days_since_last_completed": 0,
        "duration": 0,
        "duration_today": 0,
        "last_completed": "07/08 07:57 PM",
        "project_id": 2159934063,
        "status": "Green",
        "task_assigned": "Green"
    },
    {
        "Category": "Entrepreneurship",
        "Description": "-",
        "Estimated Duration": "5",
        "Max Age": "1",
        "Sprint": "Phone - Messages",
        "Task": "Check Aesop Email",
        "Type": "Recurring",
        "completed_count": 17,
        "days_since_last_completed": 0,
        "duration": 0,
        "duration_today": 0,
        "last_completed": "07/08 08:00 PM",
        "project_id": 2159934063,
        "status": "Green",
        "task_assigned": "Green"
    },
    {
        "Category": "Entrepreneurship",
        "Description": "-",
        "Estimated Duration": "5",
        "Max Age": "2",
        "Sprint": "Phone - Messages",
        "Task": "Aesop: Correspond on Slack",
        "Type": "Recurring",
        "completed_count": 17,
        "days_since_last_completed": 0,
        "duration": 0,
        "duration_today": 0,
        "last_completed": "07/08 08:00 PM",
        "project_id": 2159934063,
        "status": "Green",
        "task_assigned": "Green"
    },
    {
        "Category": "Fitness",
        "Description": "-",
        "Estimated Duration": "90",
        "Max Age": "3",
        "Sprint": "Intense",
        "Task": "Exercise",
        "Type": "Goal",
        "completed_count": 10,
        "days_since_last_completed": 0,
        "duration": 0,
        "duration_today": 0,
        "last_completed": "07/08 11:56 PM",
        "project_id": 2159936401,
        "status": "Green",
        "task_assigned": "Green"
    },
    {
        "Category": "Finance",
        "Description": "Capital One, Chase, Amex, Barclays Uber",
        "Estimated Duration": "5",
        "Max Age": "5",
        "Sprint": "Phone - Quick",
        "Task": "Pay Credit Cards",
        "Type": "Recurring",
        "completed_count": 6,
        "days_since_last_completed": 2,
        "duration": 0,
        "duration_today": 0,
        "last_completed": "07/06 09:19 PM",
        "project_id": 2168189199,
        "status": "Green",
        "task_assigned": "Green"
    },
    {
        "Category": "Finance",
        "Description": "",
        "Estimated Duration": "5",
        "Max Age": "2",
        "Sprint": "Phone - Quick",
        "Task": "Check Balances",
        "Type": "Recurring",
        "completed_count": 6,
        "days_since_last_completed": 2,
        "duration": 0,
        "duration_today": 0,
        "last_completed": "07/06 09:19 PM",
        "project_id": 2168189199,
        "status": "Green",
        "task_assigned": "Green"
    },
    {
        "Category": "Homeostasis",
        "Description": "-",
        "Estimated Duration": "5",
        "Max Age": "14",
        "Sprint": "Errand",
        "Task": "Check Mail",
        "Type": "Recurring",
        "completed_count": 1,
        "days_since_last_completed": 16,
        "duration": 0,
        "duration_today": 0,
        "last_completed": "06/23 08:16 AM",
        "project_id": 2159896039,
        "status": "Red",
        "task_assigned": "Amber"
    },
    {
        "Category": "Homeostasis",
        "Description": "-",
        "Estimated Duration": "5",
        "Max Age": "7",
        "Sprint": "Errand",
        "Task": "Clean Laptop",
        "Type": "Recurring",
        "completed_count": 4,
        "days_since_last_completed": 0,
        "duration": 0,
        "duration_today": 0,
        "last_completed": "07/08 09:02 PM",
        "project_id": 2159896039,
        "status": "Green",
        "task_assigned": "Green"
    },
    {
        "Category": "Homeostasis",
        "Description": "-",
        "Estimated Duration": "25",
        "Max Age": "21",
        "Sprint": "Errand",
        "Task": "Laundry",
        "Type": "Recurring",
        "completed_count": 2,
        "days_since_last_completed": 6,
        "duration": 0,
        "duration_today": 0,
        "last_completed": "07/02 07:07 PM",
        "project_id": 2159896039,
        "status": "Green",
        "task_assigned": "Green"
    },
    {
        "Category": "Homeostasis",
        "Description": "-",
        "Estimated Duration": "5",
        "Max Age": "3",
        "Sprint": "Other",
        "Task": "Meditate",
        "Type": "Habit/Goal",
        "completed_count": 6,
        "days_since_last_completed": 1,
        "duration": 0,
        "duration_today": 0,
        "last_completed": "07/07 06:26 PM",
        "project_id": 2159896039,
        "status": "Green",
        "task_assigned": "Green"
    },
    {
        "Category": "Homeostasis",
        "Description": "-",
        "Estimated Duration": "5",
        "Max Age": "14",
        "Sprint": "Other",
        "Task": "Wardrobe Search",
        "Type": "Recurring",
        "completed_count": 2,
        "days_since_last_completed": 14,
        "duration": 0,
        "duration_today": 0,
        "last_completed": "06/24 07:32 PM",
        "project_id": 2159896039,
        "status": "Red",
        "task_assigned": "Amber"
    },
    {
        "Category": "Homeostasis",
        "Description": "-",
        "Estimated Duration": "25",
        "Max Age": "5",
        "Sprint": "Other",
        "Task": "Clean Room",
        "Type": "Recurring",
        "completed_count": 6,
        "days_since_last_completed": 2,
        "duration": 0,
        "duration_today": 0,
        "last_completed": "07/06 09:40 PM",
        "project_id": 2159896039,
        "status": "Green",
        "task_assigned": "Green"
    },
    {
        "Category": "Homeostasis",
        "Description": "-",
        "Estimated Duration": "2",
        "Max Age": "1",
        "Sprint": "Phone - Messages",
        "Task": "Check Email",
        "Type": "Recurring",
        "completed_count": 15,
        "days_since_last_completed": 0,
        "duration": 0,
        "duration_today": 0,
        "last_completed": "07/08 07:40 PM",
        "project_id": 2159896039,
        "status": "Green",
        "task_assigned": "Green"
    },
    {
        "Category": "Homeostasis",
        "Description": "-",
        "Estimated Duration": "2",
        "Max Age": "3",
        "Sprint": "Phone - Messages",
        "Task": "Update LinkedIn",
        "Type": "Recurring",
        "completed_count": 4,
        "days_since_last_completed": 2,
        "duration": 0,
        "duration_today": 0,
        "last_completed": "07/06 09:12 PM",
        "project_id": 2159896039,
        "status": "Green",
        "task_assigned": "Green"
    },
    {
        "Category": "Homeostasis",
        "Description": "-",
        "Estimated Duration": "5",
        "Max Age": "14",
        "Sprint": "Phone - Quick",
        "Task": "Order Food and Beverages",
        "Type": "Recurring",
        "completed_count": 2,
        "days_since_last_completed": 13,
        "duration": 0,
        "duration_today": 0,
        "last_completed": "06/25 07:32 PM",
        "project_id": 2159896039,
        "status": "Green",
        "task_assigned": "Green"
    },
    {
        "Category": "Homeostasis",
        "Description": "-",
        "Estimated Duration": "2",
        "Max Age": "29",
        "Sprint": "Recurring",
        "Task": "Prescription Request",
        "Type": "Recurring",
        "completed_count": 1,
        "days_since_last_completed": 14,
        "duration": 0,
        "duration_today": 0,
        "last_completed": "06/24 07:20 PM",
        "project_id": 2159896039,
        "status": "Green",
        "task_assigned": "Green"
    },
    {
        "Category": "Homeostasis",
        "Description": "-",
        "Estimated Duration": "5",
        "Max Age": "45",
        "Sprint": "Recurring",
        "Task": "Order Contacts",
        "Type": "Recurring",
        "completed_count": 1,
        "days_since_last_completed": 8,
        "duration": 0,
        "duration_today": 0,
        "last_completed": "06/30 08:50 PM",
        "project_id": 2159896039,
        "status": "Green",
        "task_assigned": "Green"
    },
    {
        "Category": "Homeostasis",
        "Description": "-",
        "Estimated Duration": "2",
        "Max Age": "90",
        "Sprint": "Recurring",
        "Task": "Get Haircut",
        "Type": "Recurring",
        "completed_count": 1,
        "days_since_last_completed": 14,
        "duration": 0,
        "duration_today": 0,
        "last_completed": "06/24 07:23 PM",
        "project_id": 2159896039,
        "status": "Green",
        "task_assigned": "Green"
    },
    {
        "Category": "JP",
        "Description": "-",
        "Estimated Duration": "5",
        "Max Age": "30",
        "Sprint": "Overdone",
        "Task": "Zeus",
        "Type": "Limit",
        "completed_count": 13,
        "days_since_last_completed": 3,
        "duration": 0,
        "duration_today": 0,
        "last_completed": "07/05 02:30 PM",
        "project_id": 2159934072,
        "status": "Green",
        "task_assigned": "Green"
    },
    {
        "Category": "JP",
        "Description": "-",
        "Estimated Duration": "5",
        "Max Age": "30",
        "Sprint": "Overdone",
        "Task": "Testing Results",
        "Type": "Limit",
        "completed_count": 10,
        "days_since_last_completed": 5,
        "duration": 0,
        "duration_today": 0,
        "last_completed": "07/03 07:31 PM",
        "project_id": 2159934072,
        "status": "Green",
        "task_assigned": "Green"
    },
    {
        "Category": "JP",
        "Description": "-",
        "Estimated Duration": "5",
        "Max Age": "7",
        "Sprint": "Remember",
        "Task": "Clarity",
        "Type": "Recurring",
        "completed_count": 4,
        "days_since_last_completed": 6,
        "duration": 0,
        "duration_today": 0,
        "last_completed": "07/02 07:29 PM",
        "project_id": 2159934072,
        "status": "Green",
        "task_assigned": "Green"
    },
    {
        "Category": "JP",
        "Description": "-",
        "Estimated Duration": "5",
        "Max Age": "7",
        "Sprint": "Remember",
        "Task": "Beeline",
        "Type": "Recurring",
        "completed_count": 4,
        "days_since_last_completed": 6,
        "duration": 0,
        "duration_today": 0,
        "last_completed": "07/02 07:29 PM",
        "project_id": 2159934072,
        "status": "Green",
        "task_assigned": "Green"
    },
    {
        "Category": "Life Engineering",
        "Description": "-",
        "Estimated Duration": "20",
        "Max Age": "21",
        "Sprint": "Overdone",
        "Task": "Cruz Control",
        "Type": "Limit",
        "completed_count": 37,
        "days_since_last_completed": 2,
        "duration": 0,
        "duration_today": 0,
        "last_completed": "07/07 03:53 AM",
        "project_id": 2160096908,
        "status": "Green",
        "task_assigned": "Green"
    },
    {
        "Category": "Life Engineering",
        "Description": "-",
        "Estimated Duration": "25",
        "Max Age": "3",
        "Sprint": "Transit",
        "Task": "Reading",
        "Type": "Habit/Goal",
        "completed_count": 3,
        "days_since_last_completed": 7,
        "duration": 0,
        "duration_today": 0,
        "last_completed": "07/01 04:47 PM",
        "project_id": 2160096908,
        "status": "Red",
        "task_assigned": "Amber"
    },
    {
        "Category": "Social",
        "Description": "-",
        "Estimated Duration": "5",
        "Max Age": "1",
        "Sprint": "Phone - Messages",
        "Task": "Respond to Missed Text Messages",
        "Type": "Recurring",
        "completed_count": 11,
        "days_since_last_completed": 0,
        "duration": 0,
        "duration_today": 0,
        "last_completed": "07/08 08:02 PM",
        "project_id": 2159934103,
        "status": "Green",
        "task_assigned": "Green"
    },
    {
        "Category": "Social",
        "Description": "-",
        "Estimated Duration": "10",
        "Max Age": "14",
        "Sprint": "Phone - Messages",
        "Task": "Friends Connect",
        "Type": "Habit",
        "completed_count": 2,
        "days_since_last_completed": 6,
        "duration": 0,
        "duration_today": 0,
        "last_completed": "07/02 09:26 AM",
        "project_id": 2159934103,
        "status": "Green",
        "task_assigned": "Green"
    },
    {
        "Category": "Social",
        "Description": "-",
        "Estimated Duration": "3",
        "Max Age": "3",
        "Sprint": "Phone - Messages",
        "Task": "Gs Reach Out",
        "Type": "Habit",
        "completed_count": 6,
        "days_since_last_completed": 2,
        "duration": 0,
        "duration_today": 0,
        "last_completed": "07/06 04:45 PM",
        "project_id": 2159934103,
        "status": "Green",
        "task_assigned": "Green"
    },
    {
        "Category": "Social",
        "Description": "Check UWishuKnu, Meetup, and GroupMe",
        "Estimated Duration": "5",
        "Max Age": "14",
        "Sprint": "Phone - Plan",
        "Task": "Plan Social Events",
        "Type": "Habit",
        "completed_count": 3,
        "days_since_last_completed": 1,
        "duration": 0,
        "duration_today": 0,
        "last_completed": "07/07 03:05 PM",
        "project_id": 2159934103,
        "status": "Green",
        "task_assigned": "Green"
    },
    {
        "Category": "Social",
        "Description": "-",
        "Estimated Duration": "2",
        "Max Age": "30",
        "Sprint": "Unimportant",
        "Task": "Choice Purchase",
        "Type": "Recurring",
        "completed_count": 1,
        "days_since_last_completed": 14,
        "duration": 0,
        "duration_today": 0,
        "last_completed": "06/24 07:34 PM",
        "project_id": 2159934103,
        "status": "Green",
        "task_assigned": "Green"
    },
    {
        "Category": "Bnb",
        "Description": "Learn about the laws as it applies to 401 and 2116 and follow-up",
        "Estimated Duration": "15",
        "Max Age": "10",
        "Sprint": "Procastinate",
        "Task": "Landlord Legal",
        "Type": "Procastinating Project",
        "completed_count": 5,
        "days_since_last_completed": 0,
        "duration": 0,
        "duration_today": 0,
        "last_completed": "07/08 10:25 PM",
        "project_id": 2159935681,
        "status": "Green",
        "task_assigned": "Green"
    },
    {
        "Category": "Homeostasis",
        "Description": "Prioritize/Tag/Clean Tasks and Ensure Tasks have task assigned",
        "Estimated Duration": "3",
        "Max Age": "1",
        "Sprint": "Phone - Plan",
        "Task": "Clean Todoist",
        "Type": "Recurring",
        "completed_count": 13,
        "days_since_last_completed": 0,
        "duration": 0,
        "duration_today": 0,
        "last_completed": "07/08 07:42 PM",
        "project_id": 2159896039,
        "status": "Green",
        "task_assigned": "Green"
    },
    {
        "Category": "Life Engineering",
        "Description": "Schedule Day Out",
        "Estimated Duration": "3",
        "Max Age": "2",
        "Sprint": "Phone - Plan",
        "Task": "Morning Review",
        "Type": "Habit",
        "completed_count": 8,
        "days_since_last_completed": 0,
        "duration": 0,
        "duration_today": 0,
        "last_completed": "07/08 07:47 PM",
        "project_id": 2160096908,
        "status": "Green",
        "task_assigned": "Green"
    },
    {
        "Category": "Homeostasis",
        "Description": "-",
        "Estimated Duration": "5",
        "Max Age": "7",
        "Sprint": "Phone - Plan",
        "Task": "Plan Intake",
        "Type": "Goal",
        "completed_count": 2,
        "days_since_last_completed": 0,
        "duration": 0,
        "duration_today": 0,
        "last_completed": "07/09 01:08 AM",
        "project_id": 2159896039,
        "status": "Green",
        "task_assigned": "Green"
    }
]
}
//get dictionary of current_tasks and completed_tasks
function todoist_tasks_pull_custom_gspread(){


  current_tasks_base = todoist_current_tasks_pull()
  completed_tasks = todoist_completed_tasks_all()
  current_tasks = current_tasks_base.items 
  labels_dictionary = array_to_dictionary(current_tasks_base.labels) 
  projects_dictionary = current_tasks_base.projects 


  current_tasks.forEach(function(D){D['task_type']='current'})
  current_tasks.forEach(function(D){D['task_date']=D['due_date_utc']})
  current_tasks.forEach(function(D){D['age']=age_calculate_from_todoist_task(D)})

  completed_tasks.forEach(function(D){D['task_type']='completed'})
  completed_tasks.forEach(function(D){D['task_date']=D['completed_date']})


  sheet_name = 'Tasks'
  spreadsheet_id = "1-tszr-k0KcENCI5J4LfCOybmqpLtvsijeUvfJbC9bu0"
  gspread_array_data = gspread_array_manual_pull()//gspread_array_pull(sheet_name,spreadsheet_id)



  
  gspread_array = gspread_table_tasks_generate(gspread_array_data,completed_tasks,current_tasks)
  gspread_array_project_id_append(gspread_array,projects_dictionary)


  current_completed_tasks = completed_tasks.concat(current_tasks) //combine both arrays together into one array
  current_completed_tasks.forEach(function(item){tasks_array_customize_item(item)})
  current_completed_tasks.forEach(function(item){labels_add_from_labels_dictionary(item,labels_dictionary)})
  current_completed_tasks.forEach(function(item){project_name_append(item,projects_dictionary)})
  current_completed_tasks.forEach(function(item){item['task_date_range'] = date_within_range_string_create(item['task_date'])})




  todoist_current = current_completed_tasks.filter(function(D){return D['task_type'] == 'current'})
  todoist_completed = current_completed_tasks.filter(function(D){return D['task_type'] == 'completed'})


  array_check_keys(current_completed_tasks,['due_date_utc','priority','date_added','completed_date','age','task_date'])
  return {todoist_current:todoist_current,todoist_completed:todoist_completed,todoist:current_completed_tasks,gspread:gspread_array,projects:projects_dictionary,labels:labels_dictionary}
}






//toggl_functions.js


//pulls from toggl with custom fields
function toggl_data_pull_custom(since){
  array = toggl_data_pull(since)
  array.forEach(function(item){
    minutes  = (parseFloat(item.dur)/1000)/60
    cost = minutes * (15/60)
    item['cost'] = cost//.toFixed(2)
    item['minutes'] = minutes//.toFixed(2)
    item['hours'] = minutes/60
  })
  return array
}



function toggl_data_pull_iterate(since,page){
  since = since||"2018-04-28"
  secret = "api_token"
  key = "a764cd7b58fea643f44ef579b606168d"
  json_response = $.ajax({
  type: "GET",
  url: "https://toggl.com/reports/api/v2/details",
  headers: {"Authorization": "Basic " + btoa(key + ":" + secret)},
  dataType: 'json',
  async: false,
  data: {
    user_agent:"kcruz29@gmail.com",
    workspace_id:"246697",
    since:since,
    page:page
}
  }).responseJSON.data
  return json_response
}



function toggl_data_pull(since){
since = since||"2018-04-28"
  todoist_tasks_pulled = []
  iterator = 0 
  master_list = []
  while (todoist_tasks_pulled.length == 50 || iterator==0) { //if todoist pulls 50 tasks, then it should try again. when it pulls less, we know that it's the last loop we need to do. since the first loop will be less than 50 tasks length, i put in or clause that is iterator is 0 which will only be when it does the first loop
    limit_variable = iterator + 1//this will go into the todoist completed tasks query
    todoist_tasks_pulled = toggl_data_pull_iterate(since,limit_variable)
    master_list = master_list.concat(todoist_tasks_pulled)
    iterator += 1; //this will be 1 in the first loop, 2 in the second loop, etc. 
  }
  return master_list
}

//area_row_chart.js

function row_chart_create_from_array(array,table_id){
  table_html=""
  function html_section_create(item,index){
      width_percentage = String(item.width)//width: 19.9476%
      background_color = item.color//"rgb(250, 210, 50)"//item.color //background: #dd514c;
      style_attribute = "width: "+width_percentage+"%;background: " + background_color
      $("div[field='row_bar_color_width']").attr('style',style_attribute)
      name_title = item.name
      $("span[field='row_bar_title']").html(name_title)
      table_html=table_html+$(table_id).html()
    }
    array.forEach(html_section_create)         
    $(table_id).html(table_html)
}

function area_row_chart_initiate(params){
  completed_tasks_today = params.completed_tasks

chart_id = params.chart_id||"#row_bar_size_chart"

completed_tasks_today_duration = sum_float_convert_from_array(completed_tasks_today,'duration')
completed_dict_today = _.groupBy(completed_tasks_today, function(num){ return num['sub_project'] });
completed_dict_today_keys = Object.keys(completed_dict_today)
task_row = []
color_list = [ '#B8860B', '#A9A9A9', '#2F4F4F', '#006400', '#BDB76B', '#8B008B', '#556B2F', '#FF8C00', '#9932CC', '#8B0000', '#E9967A', '#8FBC8F', '#483D8B', '#2F4F4F', '#2F4F4F', '#00CED1', '#9400D3', '#FF1493', '#00BFFF', '#696969', '#696969', '#1E90FF', '#B22222', '#FFFAF0', '#228B22', '#FF00FF']
completed_dict_today_keys.forEach(function(k,i){
  project_dur = sum_float_convert_from_array(completed_dict_today[k],'duration')
  hours = (project_dur/60).toFixed(2)
  task_name = k + " - " + hours
  width = (project_dur/completed_tasks_today_duration) * 100
  task_row.push({width:width,color: color_list[i] ,name:task_name})
})

row_chart_create_from_array(task_row,chart_id)

}

//calendar_datatables_firebase.js


function full_calendar_generate(params){
    

    calendar_selector = params.calendar_selector||'#calendar'
    calendar_date = params.calendar_date||moment().format('YYYY-MM-DD')


    // $(calendar_selector).fullCalendar({
    //   header: {
    //     left: 'prev,next today',
    //     center: 'title',
    //     right: 'month,agendaWeek,agendaDay,listWeek'
    //   },
    //   defaultDate: calendar_date,
    //   navLinks: true, // can click day/week names to navigate views
    //   editable: true,
    //   eventLimit: true, // allow "more" link when too many events
    //   events: datatables_firebase_table_generate(params).data().toArray()
    // });

    table = datatables_firebase_table_generate(params)


console.log(table.data().toArray())
function array_from_datatables_pull() {
  // Simulate async response
  return new Promise(function(resolve, reject) {
      while (true) {
        setTimeout(function(){console.log(table.data().toArray())},1000)
        if ( table.data().toArray().length > 0){
          console.log(table.data().toArray())
          resolve(table.data().toArray());

          break
        }
        }

        console.log('here')

  })
}

function calendar_create_from_array() {
  console.log('Calling function and waiting for result for 5secs....')
  let getResult = array_from_datatables_pull();
  console.log('Got result after 5secs', getResult)

}
   getResult = array_from_datatables_pull();

//calendar_create_from_array()


// function calendar_create_from_array() {
//     array_from_datatables_pull().then(function(response) {
//         console.log(response);
//     $(calendar_selector).fullCalendar({
//       header: {
//         left: 'prev,next today',
//         center: 'title',
//         right: 'month,agendaWeek,agendaDay,listWeek'
//       },
//       defaultDate: calendar_date,
//       navLinks: true, // can click day/week names to navigate views
//       editable: true,
//       eventLimit: true, // allow "more" link when too many events
//       events: response
//     });

//       })
// }

calendar_create_from_array();


  // function create_task_promise(params) {
  //   return new Promise(function(resolve, reject) {

  //     //table = datatables_firebase_table_generate(params)
  //     if (datatables_firebase_table_generate(params).length != 0){
  //       resolve(table.data().toArray())
  //     }
  //   });}

  //create_task_promise(params).then(function(calendar_events) {
 //   console.log(calendar_events)
    // console.log(table.data().toArray())


    // calendar_events = table.data().toArray()



 // });


}



//datatables_firebase.js


function datatables_firebase_params(){
    params = {
        columns:[],
        table_selector:'#table',
        firebase_url:"https://shippy-ac235.firebaseio.com/drogas.json",
        process_function:undefined,//process firebase dictionary as its created
        table_row_id:undefined,
        columns_generate:true,//tells it to get additional columns
        default_visible:false
    }
}





function datatables_column_add_formatting_from_type(new_dictionary){
    if (new_dictionary.format == 'date_seconds'){
        new_dictionary.render = date_time_datatable_format_render_seconds
        new_dictionary.type =  "datetime"
    }
    if (new_dictionary.format == 'date'){
        new_dictionary.render = date_time_datatable_format_render
        new_dictionary.type =  "datetime"
    }
    if (new_dictionary.format == 'editor_date'){
        new_dictionary.render = date_time_datatable_format_render
        new_dictionary.type =  "datetime"
    }
    if (new_dictionary.format == 'number'){
        new_dictionary.type = "number-order"
    }
    if (new_dictionary.format == 'url'){
                new_dictionary.render = function(data,type,row,meta){



                      title = row.name||row.title
                      return "<a target='_blank' href='"+data+"'>" +title + "</a>"


                }
        new_dictionary.createdCell = url_create_datatables
    }
    if (new_dictionary.visible == 'false'){
        new_dictionary.visible = false
    }
    if (new_dictionary.format == 'vote'||new_dictionary.format == 'rank'){
        new_dictionary.render = function(data,type,row,meta){
              cellData = parseFloat(data)||0
              field_name = new_dictionary.name
              return '<div class="vote-actions"> <a href="#" class="rank up" iterator="1" field="'+field_name+'"> <i class="fa fa-chevron-up"> </i> </a> <div>'+cellData+'</div> <a href="#" class="rank down" iterator="-1" field="'+field_name+'"> <i class="fa fa-chevron-down"> </i> </a> </div>'



            //vote_created_cell_editor(new_dictionary.name)()
        }

        //new_dictionary.createdCell = vote_created_cell_editor(new_dictionary.name)   //vote_created_cell //vote_created_cell_editor(editor) //vote_created_cell
    }

}

function datatable_column_fields_generate(custom_fields,params){
    l = []
    custom_fields.forEach(function(custom_field){
        if (typeof custom_field === "object"){
            custom_field_name = custom_field['data']
            custom_dictionary = {data:custom_field_name, name: custom_field_name,title:custom_field_name,label: custom_field_name}
            new_dictionary = combine_dicts(custom_dictionary,custom_field)
            datatables_column_add_formatting_from_type(new_dictionary)
        }
        else {
            default_visible = true
            if (params.default_visible != undefined){
                default_visible = params.default_visible
            }
            new_dictionary = {data:custom_field, name: custom_field,title:custom_field,label:custom_field,visible:default_visible}

        }
        l.push(new_dictionary)
    })
    //console.log(l)
    return l
}

function date_field_format_check(item,params){
    if (params.date_fields){
        params.date_fields.forEach(function(date_field){
            console.log(date_field)
            if (moment(item[date_field],'MM-DD-YYYY h:mm a').isValid()){
                console.log(item)
                console.log(params)
                item[date_field] = moment(item[date_field],'MM-DD-YYYY h:mm a').format()
            }
            

        })
    }
}
function dataeditor_firebase_instance_generate_options(firebaseRef,row_id,params){

    row_id = row_id || 'DT_RowId'



    params.editor.on("preSubmit", function(e, data, action) {
    if (action == 'create'){
        //console.log(params)
        //console.log(data)
        //console.log(action)
        items_to_add = Object.values(data.data)
        items_to_add.forEach(function(item){
        item['time_stamp'] = moment().format()
        item['created_time'] = moment().format()
        submit_attributes = params.submit_attributes||{}
        item = combine_dicts(item,submit_attributes)
        date_field_format_check(item,params)
        r = params.firebase_reference.push(item)
        })


        params.editor.close()
        return false


    }

    })


    params.editor.on("postSubmit", function(e, json, data, action, xhr) {

    if (action == 'edit'){
        json_array = json.data;
        json_array.forEach(function(D) {
        record_id = D[row_id];

        D["time_stamp"] = moment().format();
        D['modified_time'] = moment().format()

        edit_attributes = params.submit_attributes||params.edit_attributes
        D = combine_dicts(D,edit_attributes)
        date_field_format_check(D,params)
        console.log(D)
        params.firebase_reference.child(record_id).set(D);
    });
    }
    else if (action == 'remove'){
        items_to_delete = Object.values(data.data)
        items_to_delete.forEach(function(D){
            record_id = D[row_id];
            r = params.firebase_reference.child(record_id).remove();
            //console.log(r)
        })

    }
    else {
        return false 
        // //console.log(e)
        // //console.log(json)
        // //console.log(data)
        // //console.log(action)



}})}

function dataeditor_firebase_instance_generate(table_id,fields,firebaseRef,row_id,params){
    row_id = row_id || 'DT_RowId'
    date_fields = []
    console.log(fields)
    fields.forEach(function(D){

        if (D.format == 'date' || D.format == 'MM-DD-YYYY h:mm a' ){
            D.type = 'datetime'
            //D.keyInput = false
            D.format = 'MM-DD-YYYY h:mm a'
            date_fields.push(D.data)
        }
    })
    params.editor = new $.fn.dataTable.Editor({
        table:table_id,
        idSrc: row_id,
        fields: fields
    });
    if (date_fields.length > 0){
        params.date_fields = date_fields
    }
    dataeditor_firebase_instance_generate_options(params.firebase_reference,row_id,params)
    return params.editor
}

function datatable_generate(table_id,columns_list,editor,params){
    console.log(params)
    //input_data = input_data || {}
    params = params || {}

    button_params = [
    { extend: "excel", title: document.title },
    { extend: "colvis", title: document.title },
    { extend: 'create', editor: editor,text:'Create'},
    // { editor: editor,text:'Add',action:function () {//console.log(this)} },
    { extend: 'remove', editor: editor },
    { extend: "edit", editor: editor },
    {text: 'Clear',name:'Clear', action: function ( e, dt, node, config ) {
        dt.columns('').search('').draw()
        $.fn.dataTable.ext.search = []
        dt.draw()
    }}]

    if (params.additional_buttons != undefined){
        button_params = button_params.concat(params.additional_buttons)
    }

    config = {
        dom: '<"html5buttons"B>lTfgitp',
        data: [],
        columns:columns_list,
        select: true,
        ///drawCallback:function(){params.callback_function(this.api().rows({page:'current'}).data())} ,
        paging:false,
        scrollX: true,
        colReorder: true,
        autoWidth: true,
        buttons: button_params
    }

    if (params.callback_function != null){
        config.drawCallback = function(){
            params.callback_function(this.api().rows({page:'current'}).data())
        }
    }



   // console.log(config)

    if (params.sort != undefined){
        sort_order = params.sort_order||'desc'
        config.order = [[_.findIndex(columns_list,function(D){return D['data'] == params.sort}),'desc']]
    }
    params.config = config
   // console.log(params)
    table_example = $(table_id).DataTable(config);
    params.table = table_example
   // console.log(params)

    return table_example
}

function editor_rank_apply(editor,table_id){

    $(table_id).on("click", "tbody .rank", function(e) {
        e.preventDefault()
        var table = $(table_id).DataTable();
        //cell_data = parseFloat(table.cell($(this).closest('td')).data())
        row_data = table.row($(this).closest('td')).data();
        //console.log(row_data)
        iterator = parseFloat($(this).attr('iterator'))
        field = $(this).attr('field')
        cell_data = parseFloat(row_data[field])||0

        change_value = cell_data + iterator
        // console.log(iterator)
        // console.log('field')

        // console.log(field)
        // console.log('cell_data')

        // console.log(cell_data)
        // console.log('change_value')

        // console.log(change_value)

        col_num_selector = $(this).closest('td')
        //var col = $(col_num_selector).parent().children().index($(col_num_selector));
        // console.log(col_num_selector)
        // console.log(editor)

    editor
    .edit(col_num_selector, false)
    .set(field, change_value)
    .submit();


    });


}


// function firebase_dataeditor_table_generate_core(table_selector,columns,firebaseRef,row_id,params){

//     var firebaseRef = firebaseRef||dbRef.ref('drogas');
//     table_selector = table_selector||//"#ds_table"
//     columns = fields||['input_text','date_time','type','within_system','DT_RowId']
//     row_id = row_id || 'DT_RowId'


//     new_fields = datatable_column_fields_generate(columns,params)
//     editor = dataeditor_firebase_instance_generate(table_selector,new_fields,firebaseRef,row_id,params)
//     table = datatable_generate(table_selector,new_fields,editor,params)

//     firebaseRef.on("child_added", function(snap) {

//         directory_addresses = snap.getRef().path.n
//         id = directory_addresses[directory_addresses.length-1]
//         firebase_dictionary = snap.val()
//         ////console.log(firebase_dictionary)
//         firebase_dictionary['DT_RowId'] = id


//         if (params.process_function != undefined){
//             firebase_dictionary = params.process_function(firebase_dictionary)
//         }
        
//         fields_to_check = _.map(new_fields,function(D){return D['data']})
//         key_check_func_dictionary(fields_to_check,firebase_dictionary)
//         table.row.add(firebase_dictionary).draw(false);
//     })

//     if (params.live == true){

//         firebaseRef.on("child_changed", function(snap) {
//             data = table.data().toArray();
//             data.forEach(function(D,row_number){D['row_number'] = row_number})
//             data_dict = _.groupBy(data,'DT_RowId')
//             dictionary_obj = snap.val()
//             selected_dict = data_dict[String(dictionary_obj['DT_RowId'])]
//             row_number = selected_dict[0]['row_number']
//             //dictionary_obj = dictionary_reformat(dictionary_obj)
//             table.row(row_number).data(dictionary_obj).draw( false )
//         })

//     }

//     editor_rank_apply(editor,table_id)
//     return table
// }



//columns
//table_selector
//firebase_reference
//process_function - process firebase dictionary as its created
//table_row_id
function firebase_dataeditor_table_generate_core(params){

    $.fn.dataTable.ext.type.order["datetime-pre"] = function(string_variable) {
        d = string_variable.match(/>(.*)</).pop();
        r = -1
        if (moment(d).isValid()){
            r = moment(d).utc();
        }
        else if (moment(d,"MM/DD/YY hh:mmA (dd)").isValid()){
            r = moment(d,"MM/DD/YY hh:mmA (dd)").utc();
        }
        else if (moment(d,"MM/DD/YY hh:mm:ssA (dd)").isValid()){
            r = moment(d,"MM/DD/YY hh:mm:ssA (dd)").utc();
        }
      return r;
    };

    firebase_reference = params.firebase_reference//||//dbRef.ref('drogas');
    table_selector = params.table_selector||"#table"
    columns = params.columns
    table_row_id = params.table_row_id||'DT_RowId'

    params.input_columns = columns
    new_fields = datatable_column_fields_generate(columns,params)
    params.columns = new_fields
    editor = dataeditor_firebase_instance_generate(params.table_selector,params.columns,params.firebase_reference,table_row_id,params)
    table = datatable_generate(table_selector,new_fields,editor,params)

    fields_to_check = _.map(new_fields,function(D){return D['data']})
    //console.log(fields_to_check)

    params.firebase_reference.on("child_added", function(snap) {

       // console.log(snap)
        directory_addresses = snap.getRef().path.n
        id = directory_addresses[directory_addresses.length-1]
        firebase_dictionary = snap.val()
        firebase_dictionary['DT_RowId'] = id
        if (params.process_function != undefined){
            firebase_dictionary = params.process_function(firebase_dictionary)
        }
        //fields_to_check = _.map(new_fields,function(D){return D['data']})
        //console.log()
        key_check_func_dictionary(_.map(params.columns,function(D){return D['data']}),firebase_dictionary)
        params.table.row.add(firebase_dictionary).draw(false);
    })



    params.table = table
    params.editor = editor

    firebase_reference.on("child_changed", function(snap) {

        dt_id_alternative = snap.getRef().path.n[snap.getRef().path.n.length-1]

        // console.log('my table')
        // console.log(table)
        //console.log(params)
        // directory_addresses = snap.getRef().path.n
        // id = directory_addresses[directory_addresses.length-1]
        // dictionary_obj = snap.val()

        // fields_to_check = _.map(new_fields,function(D){return D['data']})
        // key_check_func_dictionary(fields_to_check,dictionary_obj)
        // console.log('go')
        // console.log(table)
        // console.log(id)
        // console.log(dictionary_obj)
        // table.row(id).data(dictionary_obj).draw( false )




        data =params.table.data().toArray()
        //$(table_selector).dataTable()

       /// data = table.data().toArray();
        data.forEach(function(D,row_number){D['row_number'] = row_number})
        
        //console.log(data)
        data_dict = _.groupBy(data,'DT_RowId')

        dictionary_obj = snap.val()
        dictionary_obj['DT_RowId'] = dt_id_alternative
        //console.log(dictionary_obj)
        //console.log(dt_id_alternative)
        selected_dict = data_dict[String(dictionary_obj['DT_RowId']||dt_id_alternative)]

        row_number = selected_dict[0]['row_number']
        //console.log(row_number)
        //console.log(selected_dict)

        //dictionary_obj = dictionary_reformat(dictionary_obj)
        key_check_func_dictionary(_.map(params.columns,function(D){return D['data']}),dictionary_obj)

        params.table.row(row_number).data(dictionary_obj).draw( false )
    })

// editor.add( {
//     type:       "date",
//     label:      "Start date:",
//     name:       "start_date"
// } );

    editor_rank_apply(editor,table_selector)

    console.log(params)
    return table
}


//datatables_firebase_table_generate({table_selector:"#table",firebase_reference:firebase.database().ref('bug_features'),columns:['date']})
function datatables_firebase_table_generate(params){
    params.table_selector = params.table_selector||"#table"
    params.table_row_id = params.table_row_id||'DT_RowId'
    params.firebase_reference = params.firebase_reference||firebase.database().ref('bug_features');
    return firebase_dataeditor_table_generate_core(params)
}

function firebase_json_pull_promise_original() {
  return new Promise(
    function(resolve) {
      setTimeout(function() {
        return resolve(firebase_json_pull("https://shippy-ac235.firebaseio.com/drogas.json"))
      }, 4000)
    },
    function(reject) {})
}


function firebase_json_pull_promise() {
  return new Promise(
    function(resolve) {
        return resolve(firebase_json_pull("https://shippy-ac235.firebaseio.com/drogas.json"))
    },
    function(reject) {})
}


function firebase_json_pull_promise_pull(array,params) {
    //array = firebase_json_pull(params['firebase_url'])
    params = params||{}
    key_names = Object.keys(array[0])
        columns_list = []
        key_names.forEach(function(i){
        columns_list.push({data:i,title:i,name:i})
    })
    params.columns = params.columns||key_names
    params['table_selector'] = "#ds_table"
    //console.log(params)
    //console.log('AQUI AQUI')
    return datatables_firebase_table_generate(params)
}

function firebase_json_pull_promise_pull_simple(){
    firebase_json_pull_promise().then(function(resp) {
        //console.log(resp)
        resp2 = Object.values(resp)
        //console.log(resp2)
  //console.log(firebase_json_pull_promise_pull(resp2))
}
  )
}


function datatables_firebase_table_generate_simple(params){
    //params['firebase_reference'] = firebase.database().ref('drogas')
    params['firebase_url'] = params['firebase_url'] ||"https://shippy-ac235.firebaseio.com/drogas.json"
    array = firebase_json_pull(params['firebase_url'])
    key_names = Object.keys(array[0])
        columns_list = []
        key_names.forEach(function(i){
        columns_list.push({data:i,title:i,name:i})
    })
    params.columns = params.columns||key_names
    return datatables_firebase_table_generate(params)
}


function datatables_firebase_columns_define(params){
    ref = params.firebase_reference
    function firebase_pull_json() {
      return new Promise(function(resolve, reject){
        ref.limitToLast(1).on("child_added", function(snapshot) {
            resolve(snapshot.val())
        })  
      })};
    var p1 = firebase_pull_json();
    p1.then(function(array){
      col_names = Object.keys(array)
      if (params.columns != undefined){
        col_names_to_add = _.difference(col_names,_.map(params.columns,function(D){return D.data||D}))
        col_names = params.columns.concat(col_names_to_add)
      }
      params.columns = col_names 
      console.log(params)
      firebase_dataeditor_table_generate_core(params)
    });
}




//datatables_firebase
//{table_selector:"#table",firebase_reference:firebase.database().ref('bug_features'),columns:['date']})
//datatables_firebase({firebase_url:"https://shippy-ac235.firebaseio.com/drogas.json", table_selector:"#table"})
function datatables_firebase(params){
    if (params.columns == undefined||params.columns_generate == true){
        datatables_firebase_columns_define(params)
    }
    else {
        table = firebase_dataeditor_table_generate_core(params)
    }
        return params
}








//firebase_array_generate.js

$("#drogas_submit").click(function(event) {
    input_text = $("#drogas_input").val()
    date_time = moment().format(); //new Date()
    
    input_text_is_length_one = input_text.length == 1
    if (input_text_is_length_one){
        type = 'count'
    }
    else {
        type = 'text'
    }

    within_system = $("#within_system").html()

    data_to_push = {'input_text':input_text,'date_time':date_time,'type':type,'within_system':within_system}
    contactsRef.push(data_to_push)
    $("#drogas_input").val("")
});




function firebase_editor_initiate(table_id,fields){
	editor = new $.fn.dataTable.Editor({
		table:table_id,
		idSrc:  'DT_RowId',
		fields: editor_fields_array_from_custom_fields(fields)
	});
	editor.on("postSubmit", function(e, json, data, action, xhr) {
	if (action == 'edit'){
			json_array = json.data;
			json_array.forEach(function(D) {
			record_id = D["DT_RowId"];
			D["time_stamp"] = moment().format();
			firebaseRef.child(record_id).set(D);
		});	
	}
	else {
		items_to_add = Object.values(data.data)
		items_to_add.forEach(function(item){
		item['time_stamp'] = moment().format()
		r = firebaseRef.push(item)
	})}})

	return editor 
}


function firebase_generate_datatable(table_id,fields,firebaseRef){
	//DEFINE FIREBASE
	//firebase.initializeApp({databaseURL: "https://shippy-ac235.firebaseio.com/"});
	//var dbRef = firebase.database();
	var firebaseRef = firebaseRef||dbRef.ref('drogas');
	table_id =  table_id||"#ds_table"
	fields = fields||['input_text','date_time','type','within_system','DT_RowId']

	editor = firebase_editor_initiate(table_id,fields)
	table = datatables_initiate_render(table_id,datatable_fields_array_from_custom_fields(fields),editor)


	firebaseRef.on("child_added", function(snap) {
	    directory_addresses = snap.getRef().path.n
	    id = directory_addresses[directory_addresses.length-1]
	    firebase_dictionary = snap.val()
	    firebase_dictionary['DT_RowId'] = id
	    key_check_func_dictionary(fields,firebase_dictionary)
	    console.log(firebase_dictionary)
	    table.row.add(firebase_dictionary).draw(false);
	})


}

function firebase_dataeditor_table_editor_instance_options(firebaseRef,row_id){
	
	row_id = row_id || 'DT_RowId'

	editor.on("postSubmit", function(e, json, data, action, xhr) {


	if (action == 'edit'){
	  json_array = json.data;
	  json_array.forEach(function(D) {
	    record_id = D[row_id];
	    D["time_stamp"] = moment().format();
	    firebaseRef.child(record_id).set(D);
	  });	
	}
	else {
		items_to_add = Object.values(data.data)
		items_to_add.forEach(function(item){
			item['time_stamp'] = moment().format()
			r = firebaseRef.push(item)
			//console.log(r)
		})

	}});

}

function firebase_dataeditor_table_editor_instance(table_id,fields,firebaseRef,row_id){
	row_id = row_id || 'DT_RowId'
	editor = new $.fn.dataTable.Editor({
		table:table_id,
		idSrc:  row_id,
		fields: editor_fields_array_from_custom_fields(fields)
	});

	firebase_dataeditor_table_editor_instance_options(firebaseRef,row_id)
	return editor 
}



function firebase_dataeditor_table_generate(table_id,fields,firebaseRef,row_id){
	//DEFINE FIREBASE
	//firebase.initializeApp({databaseURL: "https://shippy-ac235.firebaseio.com/"});
	//var dbRef = firebase.database();
	var firebaseRef = firebaseRef||dbRef.ref('drogas');
	table_id =  table_id||"#ds_table"
	fields = fields||['input_text','date_time','type','within_system','DT_RowId']
	row_id = row_id || 'DT_RowId'

	editor = firebase_dataeditor_table_editor_instance(table_id,fields,firebaseRef,row_id)
	table = datatables_initiate_render(table_id,datatable_fields_array_from_custom_fields(fields),editor)


	firebaseRef.on("child_added", function(snap) {
	    directory_addresses = snap.getRef().path.n
	    id = directory_addresses[directory_addresses.length-1]
	    firebase_dictionary = snap.val()
	    firebase_dictionary['DT_RowId'] = id
	    key_check_func_dictionary(fields,firebase_dictionary)
	    console.log(firebase_dictionary)
	    table.row.add(firebase_dictionary).draw(false);
	})


}
//firebase_blog.js


function timer_instance_dictionary_load(timer_instance_dictionary,blog_selector,converter){
	if (timer_instance_dictionary != null){
		saved_content = timer_instance_dictionary.content
		timestamp = moment(timer_instance_dictionary.timestamp).format("MM-DD HH:mm")
		$(timer_instance_dictionary.id).find(".timestamp").html(timestamp)
		//instance_blog.find(".markdown_area").html(saved_content)
		$(timer_instance_dictionary.id).find(".markdown_area").html(saved_content)

		$(timer_instance_dictionary.id).find(".text_content").html(converter.makeHtml(saved_content))
		//instance_blog.find(".text_content").html(converter.makeHtml(saved_content))
	}
	else {
		saved_content = '-'
		$(blog_selector).find(".markdown_area").html(saved_content)
		$(blog_selector).find(".text_content").html(converter.makeHtml(saved_content))
	}

}

function timer_instance_markdown_generate(blog_selector,firebase_reference,converter){
    instance_blog = $(blog_selector)

    function set_timer_instance(input_content){
      firebase_reference.set({content:input_content,timestamp:moment().format(),id:blog_selector})
    }
    
   $(blog_selector).find(".markdown_area").markdown({
	    savable:true,
	    onShow: function(e){
	        instance_blog.find(".text_content").html(converter.makeHtml(e.getContent()))
	    },
	    onPreview: function(e) {
	        var originalContent = e.getContent()
	        instance_blog.find(".text_content").html(converter.makeHtml(e.getContent()))
	        instance_blog.find(".text_content").html(e.parseContent())
	        return e
	    },
	    onSave: function(e) {
	        $(this).closest('.ibox').find(".text_content").html(converter.makeHtml(e.getContent()))
	        set_timer_instance(e.getContent())
	    },
	    onChange: function(e){},
	    onFocus: function(e) {},
	    onBlur: function(e) {}
    })


   instance_blog.find(".edit_content").click(function(){
        console.log($(this))
        $(this).closest('.ibox').find(".markdown_edit_form").show()
    }); 


}
function load_firebase_blog(params){
    firebase_reference = params.firebase_reference||dbRef.ref('omni').child('omni_blog')
    blog_selector = params.blog_selector || "#morning_review"
    var converter = params.converter||new showdown.Converter()

    firebase_reference.on('value', function(snapshot) {
		timer_instance_dictionary = snapshot.val()
		timer_instance_dictionary_load(timer_instance_dictionary,blog_selector,converter)
    })
    timer_instance_markdown_generate(blog_selector,firebase_reference,converter)
}


//$(blog_selector).find('.date_picker_calendar').daterangepicker({singleDatePicker: true,showDropdowns: true}, function(start, end, label) {load_blog('end_of_day_review',moment(start).format("YYYY-MM-DD"))})
//firebase_chart_update.js

function chart_update_from_params(completed_tasks_array,chart_object,calculation_func,dates_this_month,date_key,bar_chart_name,line_chart_name){
  //dates_this_month =  dates_past_thirty_days()
  bar_chart_name = bar_chart_name || 'Tasks Completed by Day'
  line_chart_name = line_chart_name ||'Rolling Total'
  function length_func(l){return l.length}
  calculation_func = calculation_func || length_func

  y_axis_values = []
  y_axis_values_secondary = []
  x_axis_labels = []
  running_total = 0
  counter_of_day_i_did_it = 0
  dates_this_month.forEach(function(item,index){
    item.add(1, 'day')
    filtered_array = completed_tasks_array.filter(function(D){return moment(D[date_key]).format("YYYY-MM-DD") == item.format("YYYY-MM-DD")})
    if (filtered_array.length >0){
      counter_of_day_i_did_it = 1 + counter_of_day_i_did_it
    }
    //console.log(filtered_array)
    y_axis_value = calculation_func(filtered_array)//.length
    //console.log(y_axis_value)
    y_axis_values.push(y_axis_value)
    running_total = running_total + y_axis_value
    y_axis_values_secondary.push(running_total)
    x_axis_labels.push(item.format("MM-DD (ddd)"))
  })


  chart_object.data.datasets[0].data = y_axis_values
  chart_object.data.datasets[0].label = bar_chart_name
  //chart_object.data.datasets[1].data = y_axis_values_secondary
  //chart_object.data.datasets[1].label = line_chart_name
  chart_object.data.labels= x_axis_labels
  chart_object.update()
  //console.log(counter_of_day_i_did_it,dates_this_month.length)
  //console.log(dates_this_month)
  ds_percentage = String(parseFloat((counter_of_day_i_did_it / dates_this_month.length)*100).toFixed()) + "%"
  //$("#ds_percentage").html(ds_percentage)


  average_per_d_time = (running_total/counter_of_day_i_did_it).toFixed(2)
  console.log(average_per_d_time)
  //$("#average_per_d_time").html(average_per_d_time)
 
   

  return chart_object
}

// function firebase_chart_update(params){
// 	chart_object = params.chart_object||line_bar_chart_create('drogas_bar_chart')

// 	firebase_url = params.firebase_url||"https://shippy-ac235.firebaseio.com/drogas.json"
// 	filter_function = params.filter_function||function(D){return D.type == 'count'}
//   	dates = params.dates||dates_past_n_days(30)

//   	array = Object.values(firebase_json_pull(firebase_url))
//   	array = array.filter(filter_function)
// 	calculation_function = params.calculation_function||function(l){return sum_float_convert_from_array_underscore(l,'input_text')}
// 	date_key = params.date_key||'date_time'
// 	chart_update_from_params(array,chart_object,calculation_function,dates,date_key)

// }


function firebase_chart_update(params){
  chart_object = params.chart_object||line_bar_chart_create('drogas_bar_chart')

  filter_function = params.filter_function||function(D){return D.type == 'count'}
  dates = params.dates||dates_past_n_days(30)

  if (params.firebase_url != null){
    firebase_url = params.firebase_url||"https://shippy-ac235.firebaseio.com/drogas.json"
    array = Object.values(firebase_json_pull(firebase_url))
  }
  if (params.data != null){
    array = params.data
  }


  array = array.filter(filter_function)
  calculation_function = params.calculation_function||function(l){return sum_float_convert_from_array_underscore(l,'input_text')}
  date_key = params.date_key||'date_time'
  chart_update_from_params(array,chart_object,calculation_function,dates,date_key)

}

//firebase_chat_input.js




function initiate_firebase_chat_bubbles_base(chatRef,parent_div,chat_id,message_content_id,message_box_id,favicon,small_chat_date,chat_title,small_chat_box_style,small_chat_style){
	chatRef = chatRef ||'null'
	parent_div = parent_div || "#wrapper"
    chat_id = chat_id || "smallchat"
    message_content_id = message_content_id || "message_content"
    message_box_id = message_box_id || "message_box_text"
    favicon = favicon || "fa fa-comments"
    small_chat_date = small_chat_date || "02.19.2015"
    chat_title = chat_title||"Small Chat"
    small_chat_box_style = small_chat_box_style || ""
    small_chat_style = small_chat_style||""


    add_floating_chat_box(parent_div,chat_id,message_content_id,message_box_id,favicon,small_chat_date,chat_title,small_chat_box_style,small_chat_style)

	$(".message_send").click(function(event) {
	  input_text = $(this).closest('.chat').find(".message_box").val()
	  date_time = moment().format() //new Date()
	  data_to_push = {
	    'content': input_text,
	    'timestamp': date_time
	  }
	chatRef.push(data_to_push)
	$(this).closest('.chat').find(".message_box").val("")
	$(".message_box").val("")
	})


	$(".message_box").keypress(function (e) {
	 var key = e.which;
	 if(key == 13)  // the enter key code
	 	
	 // {$(".message_send").click();
	  {$(this).closest('.chat').find(".message_send").click();

	    return false;  
	  }
	});  



chatRef.on('child_added', function(snapshot) {
  timer_instance_dictionary = snapshot.val()
  if (timer_instance_dictionary != null){
      saved_content = timer_instance_dictionary.content
      viewer= timer_instance_dictionary.viewer
      timestamp = moment(timer_instance_dictionary.timestamp).format("hh:mmA")//MM-DD 
        message_content = '<div class="left"> <div class="author-name"> <small class="chat-date"> '+ timestamp +'</small> </div> <div class="chat-message active">'+ saved_content + ' </div> </div>'
        //console.log(message_content)
        //message_content = '<div class="right"> <div class="author-name"> Aesop <small class="chat-date"> '+ timestamp+'</small> </div> <div class="chat-message"> '+ saved_content+ '</div> </div>'
        $("#"+chat_id).closest('.chat').find(".message_content").append(message_content)
        //$("#"+message_content_id).append(message_content)

    }
});

}


function initiate_firebase_chat_bubbles(params){

	chatRef = params.firebase_reference||dbRef.ref('omni').child('ideas')
    parent_div = params.parent_div || "#wrapper"
    chat_id = params.chat_id || "smallchat"
    message_content_id = params.message_content_id || "message_content"
    message_box_id = params.message_box_id || "message_box_text"
    favicon = params.favicon || "fa fa-comments"
    small_chat_date = params.small_chat_date || "02.19.2015"
    chat_title = params.chat_title||"Small Chat"
    small_chat_box_style = params.box_style || "right: 75px"
    small_chat_style = params.bubble_style||"right: 20px"

	//chatRef = dbRef.ref('omni').child('tasks')
	initiate_firebase_chat_bubbles_base(chatRef,parent_div,chat_id,message_content_id,message_box_id,favicon,small_chat_date,chat_title,small_chat_box_style,small_chat_style)



	// Open close small chat
    $('.open-small-chat').on('click', function () {
        $(this).children().toggleClass('fa-comments').toggleClass('fa-remove');
        //console.log(this)
        $(this).closest('.chat').find(".small-chat-box").toggleClass('active')
        //$('.small-chat-box').toggleClass('active');
    });

    // Initialize slimscroll for small chat
    $('.small-chat-box .content').slimScroll({
        height: '234px',
        railOpacity: 0.4,
        start:'bottom'
    });



}
//firebase_snapshot.js


function key_metrics_save(){
	metrics_array = []
	$(".metric_snapshot").each(function(row_number) {
		metrics_array.push({number:row_number,html:$(this).html(),text:$(this).text(),class:$(this).attr('class')})
	})
	var current_snapshot_ref = dbRef.ref('todoist_snapshots').child('metrics').child(moment().format("YYYYMMDD"))
	current_snapshot_ref.set(metrics_dict)

}

function key_metrics_save_minute(params){
	//selector = params.selector||
	metrics_array = []
	// $('.kpi').each(function(row_number) {
	// 	metrics_array.push({number:row_number,html:$(this).html(),text:$(this).text(),class:$(this).attr('class'),name:$(this).attr('name')||'null'})
	// })
	// console.log(metrics_array)

	metric_dict = {tasks_age:$("#tasks_age").find('.metric_text').text(),
	tasks_current_number: $("#tasks_current_number").find('.metric_text').text(),
	gspread_percentage:$("#gspread_percentage").find('.metric_text').text(),
	gspread_percentage_sub_metric_text: $("#gspread_percentage").find('.sub_metric_text').text(),
	time_stamp: moment().format()
	}

	dbRef.ref('todoist_snapshots').child('kpis').push(metric_dict)
	dbRef.ref('todoist_snapshots').child('metric_hours').child(moment().format("YYYYMMDD_HH")).set(metric_dict)

}

function todoist_snapshot_store(){
	var snapshot_ref = dbRef.ref('todoist_snapshots').child('gspread_recurring_tasks').child(moment().format("YYYYMMDD"))
	snapshot_ref.set(gspread_array)

	var current_snapshot_ref = dbRef.ref('todoist_snapshots').child('todoist_current_tasks').child(moment().format("YYYYMMDD"))
	current_snapshot_ref.set(current_tasks)


}





function todoist_gspread_pull_firebase(){
try{
    todoist_gspread_pull = todoist_tasks_pull_custom_gspread()
}
catch(err){
    todoist_gspread_pull = firebase_json_pull("https://shippy-ac235.firebaseio.com/omni/snapshot.json")
}
return todoist_gspread_pull


}

//intermittent_timer.js

//update the html of the timer
function html_timer_update_from_jquery_intermittent(start_timer){
	//console.log(start_timer)
    time_text = time_since_start_time_moment(start_timer)
    //console.log(time_text)
    $("#intermittent_timer").find(".metric_text").html(time_text)

    end_text = time_since_start_time_moment_to(moment(start_timer).add('hours',18).format())
    $("#intermittent_timer").find(".sub_title").html(end_text)

//moment(start_timer).add('hours',18).format()
    $("#intermittent_timer").find(".sub_title").attr('title',"Fast then: "+moment(start_timer).add({'hours': 8}).format('YYYY-MM-DD h:mm:ssa'))


     $("#intermittent_timer").find(".metric_text").attr('title',moment(start_timer).format('YYYY-MM-DD h:mm:ssa'))


    end_text_eight = time_since_start_time_moment_to(moment(start_timer).add('hours',8).format())
    $("#intermittent_timer").find(".sub_metric_text").html(end_text_eight)


    $("#intermittent_timer").find(".sub_metric_text").attr('title',"Eat Then: "+moment(start_timer).add({'hours': 16}).format('YYYY-MM-DD h:mm:ssa'))



    //https://shippy-ac235.firebaseio.com/cruz_control/food2.json

}


function start_intermittent_timer(){

$('#metric_headers').append(metric_header_create_label('Timer',sub_title,metric_text,sub_metric_text,'intermittent_timer'))
$('#metric_headers').append(metric_header_create_label('Cals',sub_title,metric_text,sub_metric_text,'calorie_counter'))


var firebaseRef = dbRef.ref('cruz_control').child('food2');
l = firebase_json_pull("https://shippy-ac235.firebaseio.com/cruz_control/food2.json")
console.log(l)


     filtered_array = Object.values(l).filter(function(D){return moment(D['time_stamp']) > moment().subtract(24, 'hours')})

calories = sum_float_convert_from_array_underscore(filtered_array,'comment')
    $("#calorie_counter").find(".metric_text").html(calories)


max_dict = max_date_from_array_underscore(l,'time_stamp')
console.log(max_dict)
console.log('here')
console.log(max_dict['time_stamp'])

setInterval(html_timer_update_from_jquery_intermittent,1000,max_dict['time_stamp'])
//html_timer_update_from_jquery_intermittent(max_dict['time_stamp'])



}


//
//time_since_start_time_moment_to('2018-06-24T12:46:50-04:00')
//timer.js

//update the html of the timer
function html_timer_update_from_jquery(timer_instance_dictionary){
    time_text = time_since_start_time_moment(timer_instance_dictionary.start_time)
    $("#timer_text").html(time_text)
    $("#task_content").html(html_link_from_todoist_task(task_content,timer_instance_dictionary.id))
    document.title = time_text
}


//ispecific to todoist on updating page for omni.html
function timer_instance_page_initiate(timer_instance_dictionary){
    $("#input_text").attr('task_id',timer_instance_dictionary.id)
    $("#input_text").val(timer_instance_dictionary.content)
    return setInterval(html_timer_update_from_jquery,1000,timer_instance_dictionary)
}



function datatables_firebase_columns_define(params){
    ref = params.firebase_reference
    function firebase_pull_json() {
      return new Promise(function(resolve, reject){
        ref.limitToLast(1).on("child_added", function(snapshot) {
            resolve(snapshot.val())
        })  
      })};
    var p1 = firebase_pull_json();
    p1.then(function(array){
      col_names = Object.keys(array)
      if (params.columns != undefined){
        col_names_to_add = _.difference(col_names,_.map(params.columns,function(D){return D.data||D}))
        col_names = params.columns.concat(col_names_to_add)
      }
      params.columns = col_names 
      console.log(params)
      firebase_dataeditor_table_generate_core(params)
    });
}


function task_complete_todoist_promise_generate(timer_instance_dictionary,timer_instance){
    function complete_task_via_zapier(){
      return new Promise(function(resolve, reject){
        r = $.ajax({
              type: "POST",
              data:timer_instance_dictionary,
              url: "https://hooks.zapier.com/hooks/catch/229795/k1jh44/"
          })
        console.log(r)
        if (r.readyState == 1){ resolve(r)}
      })}
    complete_task_via_zapier().then(function(r){
        console.log(r)
        if (r.status == 'success'){
            timer_instance.set({})

        }
    })
}


function task_complete_todoist(timer_instance_dictionary,timer_instance,timer_instance_archive){
    input_text = $("#input_text").val()
    html_timer = time_interval_string_format_from_start_time(timer_instance_dictionary.start_time)
    new_task_name = input_text + html_timer
    timer_instance_dictionary['new_task_name'] = new_task_name
    console.log(timer_instance_dictionary)
    timer_instance_archive.set(timer_instance_dictionary)


swal({
  title: 'Are you sure?',
  text: new_task_name,
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, delete it!'
}).then(function(result){
  if (result) {
        task_complete_todoist_promise_generate(timer_instance_dictionary,timer_instance)
    swal(
      'Deleted!',
      'Your file has been deleted.',
      'success'
    )
  }
}
)



}

function page_update_from_timer(timer_instance_dictionary){
    $("#input_text").attr('task_id',timer_instance_dictionary.id)
    $("#input_text").val(timer_instance_dictionary.content)
}
//if timer instances exists, add certain tactions to the timer
function timer_instance_exists_process(timer_instance_dictionary,timer_instance,timer_instance_archive){

    empty_timer_html = $("#timer_text_container").html()
    page_update_from_timer(timer_instance_dictionary)
    my_interval_timer = setInterval(html_timer_update_from_jquery,1000,timer_instance_dictionary)


    $("#input_update").click(function(event) {
            event.preventDefault()
            html_timer = time_interval_string_format_from_start_time(timer_instance_dictionary.start_time)
            todoist_update_task(timer_instance_dictionary.id,$("#input_text").val() + html_timer)
            timer_instance_dictionary['content'] = $("#input_text").val() 
            timer_instance.set(timer_instance_dictionary)
    })

    $("#input_complete").click(function(event) {
            event.preventDefault()
            task_complete_todoist(timer_instance_dictionary,timer_instance,timer_instance_archive)
        })

    $("#input_delete").click(function(event) {
            event.preventDefault()
            todoist_delete_task(timer_instance_dictionary.id)
            timer_instance.set({})
    })
    return my_interval_timer
}

//creates timer for omni.html
function add_dropdown_item_todoist_app(title_text,id){
    title_text = title_text||"hello_world 2"
    var outer_div = $("<li>", {});
    var link_elem = $("<a>", {"href": "#","id":id,"class":"favicon_select"}).text(title_text)
    var final_div = outer_div.append(link_elem)
    $("#favicon_dropdown_menu").append(final_div)
    return final_div
}

//for omni.html 
function create_project_dropdown_list(projects_dictionary){
    projects_dictionary.forEach(function(D){
        add_dropdown_item_todoist_app(D['name'],D['id'])
    })  
    $('.favicon_select').on('click', function (e) {
    $("#favicon_select_button").html($(this))
})

}

//todoist_gspread_table.js

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

  columns = [
    {data:'Task',title:'Task',name:'Task'},
    {data:'days_remaining',title:'days_remaining',name:'days_remaining',visible:false,type:'number-float',render:number_format_render},
    {data:'due_date',title:'Time Remaining',name:'time_remaining',visible:true,render:moment_from_now_reder},
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
    //dt.columns('status:name').search('^((?!Green).)*$',true,false).draw()
}






//todoist_progress_bars.js

function update_progress(){
current_completed_tasks = todoist_table_complete.rows({ page: "current" }).data().toArray();
measure_progress_bars(current_completed_tasks,progress_table)

}


function progress_bar_table_formulate(table_id){
	var firebaseRef = dbRef.ref('cruz_control').child('progress');
	fields = ['name','multiplier','description','percentage','priority']
	table_id =  table_id||"#progress_table"

	editor = new $.fn.dataTable.Editor({
	  table:table_id,
	  idSrc:  'DT_RowId',
	  fields: editor_fields_array_from_custom_fields(fields)
	});

	editor.on("postSubmit", function(e, json, data, action, xhr) {


		if (action == 'edit'){
		  json_array = json.data;
		  json_array.forEach(function(D) {
		    record_id = D["DT_RowId"];
		    D["time_stamp"] = moment().format();
		    firebaseRef.child(record_id).set(D);
		  });	
		}
		else {
			items_to_add = Object.values(data.data)
			items_to_add.forEach(function(item){
				item['time_stamp'] = moment().format()
				r = firebaseRef.push(item)
				//console.log(r)
			})

	}});


	table = $(table_id).DataTable({
            paging:false,
            dom: '<"html5buttons"B>lTfgitp',
            data: [],
            columns: [
                {data:'name',title:'name',visible:true,name:'name',createdCell: bar_create_datatable_cell,className:'progress_metric_measure'},
                {data:'multiplier',title:'multiplier',visible:false,name:'multiplier'},
                {data:'description',title:'description',visible:false,name:'description'},
                {data:'percentage',title:'percentage',visible:false,name:'percentage',type:'num'},
                {data:'priority',title:'priority',visible:false,name:'priority'},
                {data:'time_stamp',title:'time_stamp',visible:false,name:'time_stamp'},
                {data:'DT_RowId',title:'DT_RowId',visible:false,name:'DT_RowId'}
            ],
            select: true,
            colReorder: true,
            buttons: [
                { extend: "excel", title: document.title },
                { extend: "colvis", title: document.title },
        		{ extend: 'create', editor: editor },
                { extend: "edit", editor: editor },
                {text: 'Progress',name:'Progress', action: function ( e, dt, node, config ) {
                  update_progress()
                }},

                //update_progress
                {text: 'Clear',name:'Clear', action: function ( e, dt, node, config ) {
                  dt.columns('').search('').draw()
                }}]
        });


	firebaseRef.on("child_added", function(snap) {
	    directory_addresses = snap.getRef().path.n
	    id = directory_addresses[directory_addresses.length-1]
	    firebase_dictionary = snap.val()
	    firebase_dictionary['DT_RowId'] = id
	    firebase_dictionary['percentage'] = ''
	    table.row.add(firebase_dictionary).draw(false);
	})


}
//todoist_table.js



function header_metrics_create_todoist(){
  sub_title = '-'
  metric_text = '-'
  sub_metric_text = '-'
  id = 'null'
  // $('#metric_headers').append(metric_header_create('Tasks Completed',sub_title,metric_text,sub_metric_text,'tasks_completed_number'))
  // $('#metric_headers').append(metric_header_create('Tasks Number',sub_title,metric_text,sub_metric_text,'tasks_current_number'))
  // $('#metric_headers').append(metric_header_create('Average',sub_title,metric_text,sub_metric_text,'tasks_age'))

  $('#metric_headers').append(metric_header_create_label('Tasks Completed',sub_title,metric_text,sub_metric_text,'tasks_completed_number'))
  $('#metric_headers').append(metric_header_create_label('Tasks Number',sub_title,metric_text,sub_metric_text,'tasks_current_number'))
  $('#metric_headers').append(metric_header_create_label('Age',sub_title,metric_text,sub_metric_text,'tasks_age'))




}


function percentage_sub_text(id,total_tasks,total_goal_tasks){
  id = id || "#tasks_current_number"
  total_tasks = total_tasks || 5
  total_goal_tasks = total_goal_tasks || 10

  percentage_to_goal = total_tasks/total_goal_tasks
  percentage_text = (percentage_to_goal * 100).toFixed(1) + "%"
  num_denominator = total_tasks + "/" + total_goal_tasks

  $(id).find(".sub_metric_text").html(num_denominator+"|"+percentage_text)
  add_percentage_label_html(id,percentage_to_goal)

  label_object = $(id).find(".sub_metric_text")

  if (percentage_to_goal <= 1){
    add_remove_labels(label_object,'green')
  }
  else if (percentage_to_goal <= 5){
    add_remove_labels(label_object,'amber')
  }
  else {
    add_remove_labels(label_object,'red')
  }

}

function current_tasks_call_back(callback_array){
  total_count = callback_array.length

  task_dates = Object.keys(_.groupBy(callback_array,function(D){return moment(D['task_date']).format("MM/DD/YY")})).length 

  // max_date = max_date_from_array_underscore(callback_array)['task_date']
  // min_date = min_date_from_array_underscore(callback_array)['task_date']
  // dates_between = dates_between_dates_moment(min_date,max_date)
  // days = dates_between.length
  $('#tasks_current_number').find(".metric_text").html(total_count)
  $('#tasks_current_number').find(".sub_title").html(task_dates + " Days")
  goal_number = 20

  task_age = (sum_float_convert_from_array_underscore(callback_array,'age')/callback_array.length).toFixed(1) 
  percentage_sub_text('#tasks_age',task_age,3)
  $('#tasks_age').find(".metric_text").html(task_age)


  percentage_sub_text('#tasks_current_number',total_count,goal_number)


  // var sum_total = sum_float_convert_from_array_underscore(callback_array,'duration')
  // $("."+'Total').find(".metric_text").html(sum_total)
}

function add_percentage_label_html(id,percentage_to_goal){
  id = id||'#tasks_completed_number'
  percentage_to_goal = percentage_to_goal||.5
  label_object = $(id).find(".sub_metric_text")
  .4 < percentage_to_goal && add_remove_labels(label_object,'red');
  .7 < percentage_to_goal && add_remove_labels(label_object,'amber');
  .9 < percentage_to_goal && add_remove_labels(label_object,'green');

}

function measure_progress_bars(callback_array,progress_table){
    $("td.progress_metric_measure").each(function(e,i) {
      // console.log('progress')
      // console.log(e)
      // console.log(i)
      table_data = progress_table.data().toArray();
      row_data = progress_table.row(this).data();


      task_dates = Object.keys(_.groupBy(callback_array,function(D){return moment(D['task_date']).format("MM/DD/YY")})).length 

      multiplier = parseFloat(row_data.multiplier)||0

      duration = array_filter_from_text_sum(callback_array,row_data["name"],["content","project_name","notes"],"duration")



      denom = (task_dates * multiplier)
      percentage = (duration/denom) * 100
      percentage_text = percentage.toFixed(2)   + "%" + " " + String(duration) + "/" + denom


    //row_data.name = list_progress_bar_list_element_thick('Test',row_data.DT_RowId,percentage,null,'danger',percentage_text).html()


    //  console.log(row_data)
    row_data['percentage'] = percentage
    table_data.forEach(function(D,row_number){D['row_number'] = row_number})
    table_data_dict = _.groupBy(table_data,'DT_RowId')
    selected_dict = table_data_dict[row_data['DT_RowId']]
    row_number = selected_dict[0]['row_number']
    //progress_table.row(row_number).data(row_data).draw( false )
progress_table.cell({row:row_number, column:3}).data(percentage).draw( false )
      //  progress_table.row(row_number).data(row_data).draw( false )



     $(this).find(".percentage_text").html(percentage_text)
     $(this).find(".progress-bar").attr("style","width:" + String(percentage) + "%")

      //progress_table.row(e).data(row_data).draw(false)


  })
}
function completed_tasks_call_back(callback_array){
  task_dates = Object.keys(_.groupBy(callback_array,function(D){return moment(D['task_date']).format("MM/DD/YY")})).length 

  try {
  console.log(progress_table)
  if (progress_table.rows().length > 0){

      measure_progress_bars(callback_array,progress_table)


  }

  }
  catch(err){
    console.log(err)
  }




  total_tasks = callback_array.length
  $('#tasks_completed_number').find(".metric_text").html(total_tasks)


  //$('#tasks_completed_number').find(".sub_title").html(task_dates + " Days")

  average_tasks = (total_tasks/task_dates).toFixed(1)
  goal_task_per_day = 15
  total_goal_tasks = goal_task_per_day * task_dates
  percentage_to_goal = total_tasks/total_goal_tasks

  percentage_text = (percentage_to_goal * 100).toFixed(1) + "%"
  num_denominator = total_tasks + "/" + total_goal_tasks

  $('#tasks_completed_number').find(".sub_metric_text").html(num_denominator+"|"+percentage_text+"|"+average_tasks + " Avg")
  // label_object = $('#tasks_completed_number').find(".sub_metric_text")
  // .4 < percentage_to_goal && add_remove_labels(label_object,'red');
  // .7 < percentage_to_goal && add_remove_labels(label_object,'amber');
  // .9 < percentage_to_goal && add_remove_labels(label_object,'green');

  add_percentage_label_html('#tasks_completed_number',percentage_to_goal)


  // var sum_total = sum_float_convert_from_array_underscore(callback_array,'duration')
  // $("."+'Total').find(".metric_text").html(sum_total)
}




function todoist_table_create_current(array,table_id,metric_headers_update_list){
    $.fn.dataTable.ext.type.order["date-format-moment-pre"] = function(d) {
      r = moment(d).utc();
      return r;
    };


    function array_dictionary_customize(item, index) {
      item["DT_RowId"] = item.id;
    }

    array.forEach(array_dictionary_customize);
    array = firebase_array_integrate(array,"https://shippy-ac235.firebaseio.com/omni/"+omni_node+".json","DT_RowId",['status','notes'])

    editor = new $.fn.dataTable.Editor({
      table: table_id,
      fields: [{ label: "status:", name: "status" },{ label: "notes:", name: "notes" }]
    });

    editor.on("postSubmit", function(e, json, data, action, xhr) {
      if (action == 'remove'){
        items_to_delete = Object.values(data.data)
        items_to_delete.forEach(function(todoist_dictionary){
              todoist_delete_task(todoist_dictionary.id)

          //   {
          //     "day_order": -1,
          //     "assigned_by_uid": 14054638,
          //     "is_archived": 0,
          //     "labels": [],
          //     "sync_id": 2686100363,
          //     "date_completed": null,
          //     "all_day": false,
          //     "in_history": 0,
          //     "date_added": "Sat 09 Jun 2018 23:51:25 +0000",
          //     "indent": 1,
          //     "date_lang": null,
          //     "id": 2686100363,
          //     "priority": 1,
          //     "checked": 0,
          //     "user_id": 14054638,
          //     "due_date_utc": "null",
          //     "content": "test3",
          //     "parent_id": null,
          //     "item_order": 44,
          //     "is_deleted": 0,
          //     "responsible_uid": null,
          //     "project_id": 2159935681,
          //     "collapsed": 0,
          //     "date_string": null,
          //     "task_type": "current",
          //     "task_date": "null",
          //     "age": 5,
          //     "sub_project": "test3",
          //     "duration": 0,
          //     "cost": 0,
          //     "DT_RowId": 2686100363,
          //     "project_name": "Bnb",
          //     "task_date_range": "",
          //     "completed_date": "null",
          //     "status": "null",
          //     "notes": "null"
          // }

        })
      }
      else {
        json_array = json.data;
        json_array.forEach(function(D) {
          record_id = D["DT_RowId"];
          D["timestamp"] = moment().format();
          FirebaseRef.child(record_id).set(D);
        });
      }
    });

    //based on filter from table , update a funciton
    function callback_function() {
      var api = this.api();
      callback_array = api.rows({ page: "current" }).data();
      metric_headers_update_list(callback_array)
    }
    columns = [
        {
          data: "content",
          title: "content",
          visible: true,
          name: "content"
        },
        {
          data: "project_name",
          title: "project_name",
          visible: true,
          name: "project_name"
        },
        {
          data: "duration",
          title: "duration",
          visible: true,
          name: "duration",
          type:"number-order"
        },
        {
          data: "age",
          title: "age",
          visible: true,
          name: "age",
          type: "number-order"
        },
        {
          data: "sub_project",
          title: "sub_project",
          visible: false,
          name: "sub_project"
        },
        {
          data: "status",
          title: "status",
          visible: false,
          name: "status"
        },
        {
          data: "notes",
          title: "notes",
          visible: false,
          name: "notes"
        },
        {
          data: "task_date",
          title: "task_date",
          visible: false,
          name: "task_date",
          createdCell: date_format_with_day,
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
      ]
    table = $(table_id).DataTable({
      paging: false,
      dom: '<"html5buttons"B>lTfgitp',
      data: array,
      columns: columns,
      select: true,
      colReorder: true,
      drawCallback: callback_function,
      buttons: [
        { extend: "excel", title: document.title },
        { extend: "colvis", title: document.title },
        { extend: "edit", editor: editor },
        { extend: "remove", editor: editor },
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
    column_header_filterable_autocomplete_apply(table,columns.length)

    return table 
}



function todoist_table_create_complete(array,table_id,metric_headers_update_list){
    $.fn.dataTable.ext.type.order["date-format-moment-pre"] = function(d) {
      r = moment(d).utc();
      return r;
    };


    function array_dictionary_customize(item, index) {
      item["DT_RowId"] = item.id;
    }

    array.forEach(array_dictionary_customize);
    array = firebase_array_integrate(array,"https://shippy-ac235.firebaseio.com/omni/"+omni_node+".json","DT_RowId",['status','notes'])

    editor = new $.fn.dataTable.Editor({
      table: table_id,
      fields: [{ label: "status:", name: "status" },{ label: "notes:", name: "notes" }]
    });

    editor.on("postSubmit", function(e, json, data, action, xhr) {
      json_array = json.data;
      json_array.forEach(function(D) {
        record_id = D["DT_RowId"];
        D["timestamp"] = moment().format();
        FirebaseRef.child(record_id).set(D);
      });
    });

    //based on filter from table , update a funciton
    function callback_function() {
      var api = this.api();
      callback_array = api.rows({ page: "current" }).data();
      metric_headers_update_list(callback_array)
    }

    table = $(table_id).DataTable({
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
          visible: false,
          name: "status"
        },
        {
          data: "notes",
          title: "notes",
          visible: false,
          name: "notes"
        },
        {
          data: "task_date",
          title: "task_date",
          visible: true,
          name: "task_date",
          createdCell: date_time_datatable_format,
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
      order: [5, "desc"]
    });

    table.columns('task_date_range:name').search('this_month').draw()
    function run_refresh(){
              measure_progress_bars(Object.values(table.rows({ page: "current" }).data()),progress_table)

    }
    setTimeout(run_refresh,5000)
   // console.log(table)
    //console.log(Object.values(table.rows({ page: "current" }).data()))
    return table
}
