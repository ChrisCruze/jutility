


function calendar_initiate_base(params){
	calendar_selector = params.calendar_selector||'#calendar'
	events = params.events
	calendar_object = $(calendar_selector).fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listWeek,listDay,agendaFourDay'
      },
      views: {
        listDay: { buttonText: 'list day' },
        listWeek: { buttonText: 'list week' },
    agendaFourDay: {
      type: 'agenda',
      duration: { days: 4 },
      buttonText: '4 day'
    }
      },
      defaultDate: moment().format('YYYY-MM-DD'),//'2018-06-12',
      navLinks: true, // can click day/week names to navigate views
      editable: true,
      eventLimit: true, // allow "more" link when too many events
      events: events,
      overlap:false
    });
}


function calendar_initiate(params){
	calendar_initiate_base(params)
	//setTimeout(calendar_initiate_base,2000,params)

}
