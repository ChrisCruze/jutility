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

//if timer instances exists, add certain tactions to the timer
function timer_instance_exists_process(timer_instance_dictionary,timer_instance){
    $("#input_text").attr('task_id',timer_instance_dictionary.id)
    $("#input_text").val(timer_instance_dictionary.content)
    var my_interval_timer = setInterval(html_timer_update_from_jquery,1000,timer_instance_dictionary)
    console.log(my_interval_timer)
	   //timer_instance_interval = timer_instance_page_initiate(timer_instance_dictionary)
        $("#input_update").click(function(event) {
            event.preventDefault()
            html_timer = time_interval_string_format_from_start_time(timer_instance_dictionary.start_time)
            todoist_update_task(timer_instance_dictionary.id,$("#input_text").val() + html_timer)
            timer_instance_dictionary['content'] = $("#input_text").val() 
            timer_instance.set(timer_instance_dictionary)
        })
        $("#input_complete").click(function(event) {
            input_text = $("#input_text").val()
            //$("#input_update").click();
            event.preventDefault()
            html_timer = time_interval_string_format_from_start_time(timer_instance_dictionary.start_time)
            
            if (input_text != '' && input_text != undefined){
                timer_instance_dictionary['new_task_name'] = input_text + html_timer
                console.log(timer_instance_dictionary)
                r = $.ajax({
                  type: "POST",
                  data:timer_instance_dictionary,
                  url: "https://hooks.zapier.com/hooks/catch/229795/k1jh44/",
                })
                console.log(r)      
            }
            else {
                alert('input text is blank')
            }


            //todoist_complete_task(String(timer_instance_dictionary.id))
            timer_instance.set({})
            clearInterval(my_interval_timer)
            $("#input_text").val("")
            

        })

        $("#input_delete").click(function(event) {
            event.preventDefault()
            todoist_delete_task(timer_instance_dictionary.id)
            timer_instance.set({})
            clearInterval(my_interval_timer)
        })
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
