
asana_token = "110000 101111 110111 111000 110001 1100010 110110 1100001 111001 1100100 1100001 1100011 1100001 110110 110010 110001 1100110 110000 110100 1100110 1100110 110010 111001 1100101 110100 1100011 1100110 110100 1100011 110111 110100 110001 1100001 1100101"

///0/781b6a9daca621f04ff29e4cf4c741ae
//https://asana.com/developers/api-reference/users
//https://github.com/Asana/node-asana/
// <script src="https://github.com/Asana/node-asana/releases/download/<LATEST_RELEASE>/asana-min.js"></script>
//client = asana.Client.create().useAccessToken('my_access_token');
//client.users.me().then(function(me) {
//   console.log(me);
// });



function asana_users_me_get(){
	asana_token = "110000 101111 110111 111000 110001 1100010 110110 1100001 111001 1100100 1100001 1100011 1100001 110110 110010 110001 1100110 110000 110100 1100110 1100110 110010 111001 1100101 110100 1100011 1100110 110100 1100011 110111 110100 110001 1100001 1100101"
	result = $.ajax({
	      type: "GET",
	      url: "https://app.asana.com/api/1.0/users/me",
	      dataType: 'json',
	      async: false,
	      data: {
	        'access_token': binary_to_string(asana_token),
	      }
	    });
	return result.responseJSON
}

