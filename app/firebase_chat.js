

$("#message_send").click(function(event) {
  input_text = $("#message_box_text").val()
  date_time = moment().format(); //new Date()
  data_to_push = {
    'chat_id':chat_id,
    'viewer':site_viewer,
    'content': input_text,
    'timestamp': date_time
  }
  contactsRef.push(data_to_push)
  $("#message_box_text").val("")
  if (site_viewer == 'client'){
    slack_notification(chat_id,input_text)
  }
});

$('#message_box_text').keypress(function (e) {
 var key = e.which;
 if(key == 13)  // the enter key code
  {$('#message_send').click();
    return false;  
  }
});   


    
contactsRef.on('child_added', function(snapshot) {
  timer_instance_dictionary = snapshot.val()
  if (timer_instance_dictionary != null){
      saved_content = timer_instance_dictionary.content
      viewer= timer_instance_dictionary.viewer
      timestamp = moment(timer_instance_dictionary.timestamp).format("hh:mmA")//MM-DD 
      if (viewer == 'client'){
        message_content = '<div class="left"> <div class="author-name"> <small class="chat-date"> '+ timestamp +'</small> </div> <div class="chat-message active">'+ saved_content + ' </div> </div>'
      }
      else {
        message_content = '<div class="right"> <div class="author-name"> Aesop <small class="chat-date"> '+ timestamp+'</small> </div> <div class="chat-message"> '+ saved_content+ '</div> </div>'
      }
      $("#message_content").append(message_content)
    }
});
 
