//submit from input text box
$("#drogas_submit").click(function(event) {
    input_text = $("#drogas_input").val()
    date_time = moment().format(); //new Date()
    data_to_push = {'input_text':input_text,'date_time':date_time}
    contactsRef.push(data_to_push)
    $("#drogas_input").val("")
});