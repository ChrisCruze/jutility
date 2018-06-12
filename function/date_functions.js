
//https://stackoverflow.com/questions/141348/what-is-the-best-way-to-parse-a-time-into-a-date-object-from-user-input-in-javas
//parses a time such as 1:00PM
function parseTime( t ) {
   var d = new Date();
   var time = t.match( /(\d+)(?::(\d\d))?\s*(p?)/ );
   d.setHours( parseInt( time[1]) + (time[3] ? 12 : 0) );
   d.setMinutes( parseInt( time[2]) || 0 );
   return d;
}

//gives days in the month
function daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
}

//number of days this month
function days_this_month(){
  r = new Date()
  return daysInMonth(r.getMonth()+1,r.getYear())
}

//returns true if the date is todays date
function date_is_today(input_date){
    // Create date from input value
    var inputDate = new Date(input_date);

    // Get today's date
    var todaysDate = new Date();

    // call setHours to take the time out of the comparison
    return inputDate.setHours(0,0,0,0) == todaysDate.setHours(0,0,0,0)
}




