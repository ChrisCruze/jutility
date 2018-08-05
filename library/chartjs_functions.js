
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



