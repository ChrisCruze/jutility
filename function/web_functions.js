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


function ipLookUp () {
  $.ajax('http://ip-api.com/json')
  .then(
      function success(response) {
          console.log('User\'s Location Data is ', response);
          console.log('User\'s Country', response.country);

      },

      function fail(data, status) {
          console.log('Request failed.  Returned status of',
                      status);
      }
  );
}
