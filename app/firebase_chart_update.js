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

function firebase_chart_update(params){
	chart_object = params.chart_object||line_bar_chart_create('drogas_bar_chart')

	firebase_url = params.firebase_url||"https://shippy-ac235.firebaseio.com/drogas.json"
	filter_function = params.filter_function||function(D){return D.type == 'count'}
  	dates = params.dates||dates_past_n_days(30)

  	array = Object.values(firebase_json_pull(firebase_url))
  	array = array.filter(filter_function)
	calculation_function = params.calculation_function||function(l){return sum_float_convert_from_array_underscore(l,'input_text')}
	date_key = params.date_key||'date_time'
	chart_update_from_params(array,chart_object,calculation_function,dates,date_key)

}