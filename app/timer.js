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
