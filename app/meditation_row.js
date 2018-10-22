

function formulate_label_square(){
	html = '<span class="label label-success" style="margin:0">1</span>'
	return html 
}

function meditation_dates_loop_instance(date){
	html = formulate_label_square()
	$("#meditation_row").append($(html))
}

function meditation_dates_loop(dates){
	dates.forEach(function(date){
		meditation_dates_loop_instance(date)
	})
}

function meditation_dates(days){
	dates = dates_past_n_days(days)
	meditation_dates_loop(dates)
}