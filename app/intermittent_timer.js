function html_timer_update_from_jquery_intermittent(start_timer,drogas_array){


    
time_text = time_since_start_time_moment(start_timer)
$("#intermittent_timer").find(".metric_text").html(time_text)



drogas_array.forEach(function(D){D['remaining_in_system'] = dose_remaining_now(D)})
in_system = sum_float_convert_from_array_underscore(drogas_array,'remaining_in_system')
end_text = in_system.toFixed(3)


last_time = moment(start_timer).format('MM/DD h:mma')

$("#intermittent_timer").find(".sub_title").html(last_time)
$("#intermittent_timer").find(".sub_metric_text").html(end_text)



}













//date_time
function start_drogas_timer(l){
    $('#metric_headers').append(metric_header_create_label('Timer',sub_title,metric_text,sub_metric_text,'intermittent_timer'))
    //$('#metric_headers').append(metric_header_create_label('Cals',sub_title,metric_text,sub_metric_text,'calorie_counter'))

    max_dict = max_date_from_array_underscore(l,'date_time')
    setInterval(html_timer_update_from_jquery_intermittent,1000,max_dict['date_time'],l)
    //html_timer_update_from_jquery_intermittent(max_dict['time_stamp'])
}






function start_intermittent_timer(){
$('#metric_headers').append(metric_header_create_label('Timer',sub_title,metric_text,sub_metric_text,'intermittent_timer'))
$('#metric_headers').append(metric_header_create_label('Cals',sub_title,metric_text,sub_metric_text,'calorie_counter'))



var firebaseRef = dbRef.ref('cruz_control').child('food2');
l = firebase_json_pull("https://shippy-ac235.firebaseio.com/cruz_control/food2.json")
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