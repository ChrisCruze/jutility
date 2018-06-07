//open url in new tab
function openInNewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
}


//get url parameter 
function parameter_attain_from_url(param){
	var url = new URL(window.location.href );
	var result = url.searchParams.get(param)
	return result
}

