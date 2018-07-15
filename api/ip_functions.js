function ipLookUp () {
  $.ajax('http://ip-api.com/json').then(
      function success(response) {
        session_dictionary['ip_data'] = response
        update_firebase_session_dictionary(response,'ip_data')
        console.log('User\'s Location Data is ', response);
      },
      function fail(data, status) {
          console.log('Request failed.  Returned status of',status);
      }
  );
}