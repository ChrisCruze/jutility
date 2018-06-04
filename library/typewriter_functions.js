
//create a typewritter effect using typewritter library (https://safi.me.uk/typewriterjs/)
function typewriter_element_create(div_id,input_text){
	div_id = div_id||'app'
	input_text = input_text||$("#"+div_id).html()


	var app = document.getElementById(div_id);
	var typewriter = new Typewriter(app, {
	    loop: true
	});

	typewriter.typeString(input_text)
	    .pauseFor(10000)
	    .start();

}
