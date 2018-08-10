


function dose_remaining_now(dictionary_obj){
    beginning_count = parseInt(dictionary_obj.input_text) ||0
    beginning_count = beginning_count * 20
    date_time_string = dictionary_obj.date_time
    m = moment(date_time_string)
    now = moment() 
    hours_difference = now.diff(m, 'hours',true);
    dose_remaining = beginning_count * Math.pow(.5, (hours_difference/10));
    return dose_remaining  
}

