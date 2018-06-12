
//message notification once something is done
function toastr_notification(message){
	toastr.options.closeButton = true;
	toastr.options.onclick = function() { console.log('clicked'); }
	toastr.info(message)
}