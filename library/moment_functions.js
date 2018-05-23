
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
        hours_list.push(next_time.format('YYYY-MM-DD'))
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

        hours_list.push({date:next_time.format('YYYY-MM-DD')})
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


