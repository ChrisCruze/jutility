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
