


function calendar_initiate_base(params){
	calendar_selector = params.calendar_selector||'#calendar'
	events = params.events
	calendar_object = $(calendar_selector).fullCalendar({
      selectable: true,
      selectHelper: true,
      select: function(start, end) {
        var title = prompt('Event Title:');
        var eventData;
        if (title) {
          eventData = {
            title: title,
            start: start,
            end: end
          };
          console.log(eventData)
          $(calendar_selector).fullCalendar('renderEvent', eventData, true); // stick? = true
        }
        $(calendar_selector).fullCalendar('unselect');
      },
      editable: true,
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
