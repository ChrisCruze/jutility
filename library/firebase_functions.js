//pull ref from firebase
function ref_attain_from_firebase(reference_name,child_name){
	var dbRef = firebase.database();
	var contactsRef = dbRef.ref(reference_name).child(child_name)
	return contactsRef
}

//push data to firebase
function data_push_to_firebase(contactsRef,data_to_push){
  //data_to_push = {'chat_id':chat_id, 'viewer':site_viewer, 'content': input_text, 'timestamp': date_time }
  contactsRef.push(data_to_push)

}

//query the contacts ref and run the process_func on the results
function query_elements_array_firebase(contactsRef,process_func){
	contactsRef.on('child_added', function(snapshot) {
  		process_func(snapshot.val())
	})
}

//pulls straight json if the firebase is open
function firebase_json_pull(url){
    url = url||"https://shippy-ac235.firebaseio.com/DataTablesTest/Test3.json"
    l = $.ajax({
      url: url,
      method: "GET",
      async:false,
      headers: {"Accept":"application/json; odata=verbose"}
    })
    results = l.responseJSON
    return results
  }



// initialize the firebase instance
function firebase_initialize(){
	var config = {
	apiKey: "AIzaSyApJBfnH0j3TSugzEABiMFkI_tU_XXeGzg",
	authDomain: "shippy-ac235.firebaseapp.com",
	databaseURL: "https://shippy-ac235.firebaseio.com"
	};
	firebase.initializeApp(config);
	return firebase
}

//authenticate the user that has been authed
function firebase_auth_user_process(user_process_func){
  firebase.auth().onAuthStateChanged((user) => {
  if (user) {
  	user_process_func(user)
    }
  });
}