
//click on a button
function div_click_jquery(ref_id){
	$(ref_id).click();
}

//press enter when clicked
function enter_press_down_jquery(ref_id){
$(ref_id).keypress(function (e) {
 var key = e.which;
 if(key == 13)  // the enter key code
  {run_function()
  }
});  


}
