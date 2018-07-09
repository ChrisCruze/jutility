
function timer_instance_dictionary_load(timer_instance_dictionary,blog_selector,converter){
	if (timer_instance_dictionary != null){
		saved_content = timer_instance_dictionary.content
		timestamp = moment(timer_instance_dictionary.timestamp).format("MM-DD HH:mm")
		$(timer_instance_dictionary.id).find(".timestamp").html(timestamp)
		//instance_blog.find(".markdown_area").html(saved_content)
		$(timer_instance_dictionary.id).find(".markdown_area").html(saved_content)

		$(timer_instance_dictionary.id).find(".text_content").html(converter.makeHtml(saved_content))
		//instance_blog.find(".text_content").html(converter.makeHtml(saved_content))
	}
	else {
		saved_content = '-'
		$(blog_selector).find(".markdown_area").html(saved_content)
		$(blog_selector).find(".text_content").html(converter.makeHtml(saved_content))
	}

}

function timer_instance_markdown_generate(blog_selector,firebase_reference,converter){
    instance_blog = $(blog_selector)

    function set_timer_instance(input_content){
      firebase_reference.set({content:input_content,timestamp:moment().format(),id:blog_selector})
    }
    
   $(blog_selector).find(".markdown_area").markdown({
	    savable:true,
	    onShow: function(e){
	        instance_blog.find(".text_content").html(converter.makeHtml(e.getContent()))
	    },
	    onPreview: function(e) {
	        var originalContent = e.getContent()
	        instance_blog.find(".text_content").html(converter.makeHtml(e.getContent()))
	        instance_blog.find(".text_content").html(e.parseContent())
	        return e
	    },
	    onSave: function(e) {
	        $(this).closest('.ibox').find(".text_content").html(converter.makeHtml(e.getContent()))
	        set_timer_instance(e.getContent())
	    },
	    onChange: function(e){},
	    onFocus: function(e) {},
	    onBlur: function(e) {}
    })


   instance_blog.find(".edit_content").click(function(){
        console.log($(this))
        $(this).closest('.ibox').find(".markdown_edit_form").show()
    }); 


}
function load_firebase_blog(params){
    firebase_reference = params.firebase_reference||dbRef.ref('omni').child('omni_blog')
    blog_selector = params.blog_selector || "#morning_review"
    var converter = params.converter||new showdown.Converter()

    firebase_reference.on('value', function(snapshot) {
		timer_instance_dictionary = snapshot.val()
		timer_instance_dictionary_load(timer_instance_dictionary,blog_selector,converter)
    })
    timer_instance_markdown_generate(blog_selector,firebase_reference,converter)
}


//$(blog_selector).find('.date_picker_calendar').daterangepicker({singleDatePicker: true,showDropdowns: true}, function(start, end, label) {load_blog('end_of_day_review',moment(start).format("YYYY-MM-DD"))})