


function daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
}

function days_this_month(){
  r = new Date()
  return daysInMonth(r.getMonth()+1,r.getYear())
}


