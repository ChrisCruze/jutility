//update the html of the timer
function html_timer_update_from_jquery_intermittent(start_timer){
	console.log(start_timer)
    time_text = time_since_start_time_moment(start_timer)
    console.log(time_text)
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