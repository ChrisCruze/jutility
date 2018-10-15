// var a = moment('2016-06-06T21:03:55');//now
// var b = moment('2016-05-06T20:03:55');




function time_difference_moment_from_now(end,startTime){
  var duration = moment.duration(end.diff(startTime));
  return duration
}

// console.log(a.diff(b, 'minutes')) // 44700
// console.log(a.diff(b, 'hours')) // 745
// console.log(a.diff(b, 'days')) // 31
// console.log(a.diff(b, 'weeks')) // 4
function time_difference_moment_from_interval(end,startTime,interval){
  var end = moment(end);//now
  var startTime = moment(startTime);
  duration = startTime.diff(end, interval) // 44700
  //var duration = moment.duration(end.diff(startTime,interval));
  return duration
}


function time_difference_moment_from_now_interval(end,interval){
  var duration = time_difference_moment_from_interval(end,moment(),interval)
  return duration
}

function time_difference_moment(end,startTime){
  var duration = moment.duration(end.diff(startTime));
  return duration
}


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

function hours_difference_moment(startTime,end){
  var duration = moment.duration(end.diff(startTime));
  var hours = duration.asHours();
  return hours
}
//used in create_task_v2 to keep track of time
function time_since_start_time_moment(start_time){
    now = moment().valueOf()  //now is the time right now
    start_time_instance = moment(start_time).valueOf()
    elapsed = now - start_time_instance;
    days_calculated = elapsed / (1000*60*60*24)
    time_text_value = moment(elapsed).subtract({hours: 19}); //have to subtract 19 hours for some reason
    days_passed = time_text_value.days() - 3
    time_text = time_text_value.format("HH:mm:ss")
    time_text = days_passed +":"+ time_text
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


