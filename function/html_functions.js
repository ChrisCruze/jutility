




//add floating chat box
function add_floating_chat_box_base(chat_id,message_content_id,message_box_id,favicon,small_chat_date,chat_title){
    favicon = favicon || "fa fa-comments"
    chat_id = chat_id || "small-chat"
    badge_icon =  $("<a>", {"class":"open-small-chat"}).append($("<i>", {"class":favicon}))
    badge_counter = $("<span>", {"class":"badge badge-warning pull-right"}).text('5')
    chat_icon = $("<div>", {"id":chat_id,class:'small-chat'}).append(badge_counter).append(badge_icon)

    parent_heading = $("<div>", {"class":"heading"})//,"draggable":"true"
    chat_title = chat_title||"Small Chat"

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
    chat_session = $("<div>", {"class":"small-chat-box fadeInRight animated"}).append(heading).append(message_content).append(form_chat)


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



function add_floating_chat_box(parent_div,chat_id,message_content_id,message_box_id,favicon,small_chat_date,chat_title){
    parent_div = parent_div|| "#wrapper"
    chat_id = chat_id || "smallchat"
    message_content_id = message_content_id || "message_content"
    message_box_id = message_box_id || "message_box_text"
    favicon = favicon || "fa fa-comments"
    small_chat_date = small_chat_date || "02.19.2015"
    chat_title = chat_title||"Small Chat"


    //add_floating_chat_box_base
    //"small-chat","message_content","message_box_text","fa fa-comments","02.19.2015","Small Chat"
    $(parent_div).append(add_floating_chat_box_base(chat_id,message_content_id,message_box_id,favicon,small_chat_date,chat_title))
    console.log(chat_id)

        // Open close small chat
    $('.open-small-chat').on('click', function () {
        $(this).children().toggleClass('fa-comments').toggleClass('fa-remove');
        $(this).closest('.chat').find(".small-chat-box").toggleClass('active')
        //$('.small-chat-box').toggleClass('active');
    });

    // Initialize slimscroll for small chat
    $('.small-chat-box .content').slimScroll({
        height: '234px',
        railOpacity: 0.4
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
function metric_header_create_label(title_text,sub_title,metric_text,sub_metric_text,id,label_color){
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
    var elem_three = $("<h1>", {"class": "no-margins metric_text"}).text(metric_text)
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
