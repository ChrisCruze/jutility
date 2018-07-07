


function initiate_firebase_chat_bubbles_base(chatRef,parent_div,chat_id,message_content_id,message_box_id,favicon,small_chat_date,chat_title,small_chat_box_style,small_chat_style){
	chatRef = chatRef ||'null'
	parent_div = parent_div || "#wrapper"
    chat_id = chat_id || "smallchat"
    message_content_id = message_content_id || "message_content"
    message_box_id = message_box_id || "message_box_text"
    favicon = favicon || "fa fa-comments"
    small_chat_date = small_chat_date || "02.19.2015"
    chat_title = chat_title||"Small Chat"
    small_chat_box_style = small_chat_box_style || ""
    small_chat_style = small_chat_style||""


    add_floating_chat_box(parent_div,chat_id,message_content_id,message_box_id,favicon,small_chat_date,chat_title,small_chat_box_style,small_chat_style)

	$(".message_send").click(function(event) {
	  input_text = $(this).closest('.chat').find(".message_box").val()
	  date_time = moment().format() //new Date()
	  data_to_push = {
	    'content': input_text,
	    'timestamp': date_time
	  }
	chatRef.push(data_to_push)
	$(this).closest('.chat').find(".message_box").val("")
	$(".message_box").val("")
	})


	$(".message_box").keypress(function (e) {
	 var key = e.which;
	 if(key == 13)  // the enter key code
	 	
	 // {$(".message_send").click();
	  {$(this).closest('.chat').find(".message_send").click();

	    return false;  
	  }
	});  



chatRef.on('child_added', function(snapshot) {
  timer_instance_dictionary = snapshot.val()
  if (timer_instance_dictionary != null){
      saved_content = timer_instance_dictionary.content
      viewer= timer_instance_dictionary.viewer
      timestamp = moment(timer_instance_dictionary.timestamp).format("hh:mmA")//MM-DD 
        message_content = '<div class="left"> <div class="author-name"> <small class="chat-date"> '+ timestamp +'</small> </div> <div class="chat-message active">'+ saved_content + ' </div> </div>'
        console.log(message_content)
        //message_content = '<div class="right"> <div class="author-name"> Aesop <small class="chat-date"> '+ timestamp+'</small> </div> <div class="chat-message"> '+ saved_content+ '</div> </div>'
        $("#"+chat_id).closest('.chat').find(".message_content").append(message_content)
        //$("#"+message_content_id).append(message_content)

    }
});

}


function initiate_firebase_chat_bubbles(params){

	chatRef = params.firebase_reference||dbRef.ref('omni').child('ideas')
    parent_div = params.parent_div || "#wrapper"
    chat_id = params.chat_id || "smallchat"
    message_content_id = params.message_content_id || "message_content"
    message_box_id = params.message_box_id || "message_box_text"
    favicon = params.favicon || "fa fa-comments"
    small_chat_date = params.small_chat_date || "02.19.2015"
    chat_title = params.chat_title||"Small Chat"
    small_chat_box_style = params.box_style || "right: 75px"
    small_chat_style = params.bubble_style||"right: 20px"

	//chatRef = dbRef.ref('omni').child('tasks')
	initiate_firebase_chat_bubbles_base(chatRef,parent_div,chat_id,message_content_id,message_box_id,favicon,small_chat_date,chat_title,small_chat_box_style,small_chat_style)



	// Open close small chat
    $('.open-small-chat').on('click', function () {
        $(this).children().toggleClass('fa-comments').toggleClass('fa-remove');
        console.log(this)
        $(this).closest('.chat').find(".small-chat-box").toggleClass('active')
        //$('.small-chat-box').toggleClass('active');
    });

    // Initialize slimscroll for small chat
    $('.small-chat-box .content').slimScroll({
        height: '234px',
        railOpacity: 0.4
    });



}