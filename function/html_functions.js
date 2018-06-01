
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


// appends the image div from create_image_div
function append_image_div(div_id,title_text,url,image_url){
    $(div_id).append(create_image_div(title_text,url,image_url))
}

//creates a metric div and adds it to the div
function metric_header_create(title_text,sub_title,metric_text,sub_metric_text){
    title_text = title_text||"TITLE"
    metric_text = metric_text||"metric_text"
    sub_metric_text = sub_metric_text||"sub_metric_text"
    sub_title = sub_title||"sub_title"

    var outer_div_one = $("<div>", {"class": "col-md-2 "+title_text});
    var outer_div_two = $("<div>", {"class": "ibox float-e-margins"});
    var inner_div_one = $("<div>", {"class": "ibox-title"});
    var elem_one = $("<span>", {"class": "label label-success pull-right"});
    var elem_two = $("<h5>").text(title_text)

    var inner_div_two = $("<div>", {"class": "ibox-content"});
    var elem_three = $("<h1>", {"class": "no-margins metric_text"}).text(metric_text)
    var elem_four = $("<div>", {"class": "stat-percent font-bold text-success sub_metric_text"}).text(sub_metric_text)
    var elem_five = $("<small>").text(sub_title)


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
