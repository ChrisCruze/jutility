
function full_calendar_generate(params){
    

    calendar_selector = params.calendar_selector||'#calendar'
    calendar_date = params.calendar_date||moment().format('YYYY-MM-DD')


    // $(calendar_selector).fullCalendar({
    //   header: {
    //     left: 'prev,next today',
    //     center: 'title',
    //     right: 'month,agendaWeek,agendaDay,listWeek'
    //   },
    //   defaultDate: calendar_date,
    //   navLinks: true, // can click day/week names to navigate views
    //   editable: true,
    //   eventLimit: true, // allow "more" link when too many events
    //   events: datatables_firebase_table_generate(params).data().toArray()
    // });

    table = datatables_firebase_table_generate(params)


console.log(table.data().toArray())
function array_from_datatables_pull() {
  // Simulate async response
  return new Promise(function(resolve, reject) {
      while (true) {
        setTimeout(function(){console.log(table.data().toArray())},1000)
        if ( table.data().toArray().length > 0){
          console.log(table.data().toArray())
          resolve(table.data().toArray());

          break
        }
        }

        console.log('here')

  })
}

function calendar_create_from_array() {
  console.log('Calling function and waiting for result for 5secs....')
  let getResult = array_from_datatables_pull();
  console.log('Got result after 5secs', getResult)

}
   getResult = array_from_datatables_pull();

//calendar_create_from_array()


// function calendar_create_from_array() {
//     array_from_datatables_pull().then(function(response) {
//         console.log(response);
//     $(calendar_selector).fullCalendar({
//       header: {
//         left: 'prev,next today',
//         center: 'title',
//         right: 'month,agendaWeek,agendaDay,listWeek'
//       },
//       defaultDate: calendar_date,
//       navLinks: true, // can click day/week names to navigate views
//       editable: true,
//       eventLimit: true, // allow "more" link when too many events
//       events: response
//     });

//       })
// }

calendar_create_from_array();


  // function create_task_promise(params) {
  //   return new Promise(function(resolve, reject) {

  //     //table = datatables_firebase_table_generate(params)
  //     if (datatables_firebase_table_generate(params).length != 0){
  //       resolve(table.data().toArray())
  //     }
  //   });}

  //create_task_promise(params).then(function(calendar_events) {
 //   console.log(calendar_events)
    // console.log(table.data().toArray())


    // calendar_events = table.data().toArray()



 // });


}


