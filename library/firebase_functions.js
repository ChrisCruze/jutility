
function firebase_signin_prompt_params(){
  params = params||{
    firebase_auth_container:'#firebaseui-auth-container',
    signInSuccessUrl:'https://chriscruze.github.io/Taskr/index.html'
  }
      var uiConfig = {
        callbacks: {
          signInSuccess: function(currentUser, credential, redirectUrl) {
            return true;
          },
          signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            console.log(authResult)
            return true;
          },
            signInFailure: function(error) {
            return console.log(error);
          },
          uiShown: function() {
          }
        },
        credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM,
        queryParameterForWidgetMode: 'mode',
        queryParameterForSignInSuccessUrl: 'signInSuccessUrl',
        signInFlow: 'popup',
        signInSuccessUrl: params.signInSuccessUrl,
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID
        ]
      };
      var ui = new firebaseui.auth.AuthUI(firebase.auth());
      ui.start(params.firebase_auth_container, uiConfig);
}


function firebase_login_configuration(params) {
  params = params||{
    firebase_auth_container:'#firebaseui-auth-container',
    signInSuccessUrl:'https://chriscruze.github.io/Taskr/index.html',
    // application_function: function(user){console.log(user)},
    
  }
        return firebase.auth().onAuthStateChanged(function(user) {
              if (user) {
                user.getIdToken().then(function(accessToken) {
                  console.log(user)
                  params.application_function(user)
                });
              } else {
                  firebase_signin_prompt_params(params)
                  // window.location.href = params.login_url||'https://chriscruze.github.io/Taskr/index.html';
              }
            }, function(error) {
                console.log(error);
            });
    };



//This function checks whether the user is logged in. If the user is logged in, then it runs the app_start function
//{application_function:func,login_url:func}
function firebase_check_login_initiate(params) {
        return firebase.auth().onAuthStateChanged(function(user) {
              if (user) {
                user.getIdToken().then(function(accessToken) {
                  console.log(user)
                  params.application_function(user)
                });
              } else {

                  window.location.href = params.login_url||'https://chriscruze.github.io/Taskr/index.html';
              }
            }, function(error) {
                console.log(error);
            });
    };





function firebase_account_create(email,password){
 firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
}
//account_create('cruzc.09@gmail.com','sTorr955')


function firebase_account_login(email,password){
  return firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});
}


//sign in using firebase
function firebase_signin(){
      // FirebaseUI config.
      var uiConfig = {
        callbacks: {
          signInSuccess: function(currentUser, credential, redirectUrl) {
            console.log(currentUser)
                        console.log(credential)
            console.log(redirectUrl)

            // Do something.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            return true;
          },
          uiShown: function() {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById('loader').style.display = 'none';
          }
        },
        credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM,
        // Query parameter name for mode.
        queryParameterForWidgetMode: 'mode',
        // Query parameter name for sign in success url.
        queryParameterForSignInSuccessUrl: 'signInSuccessUrl',
        // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
        signInFlow: 'popup',
        signInSuccessUrl: 'https://chriscruze.github.io/CruzControl/main.html',
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          firebase.auth.TwitterAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        // Terms of service url.
        tosUrl: '<your-tos-url>'
      };

      var ui = new firebaseui.auth.AuthUI(firebase.auth());
      // The start method will wait until the DOM is loaded.
      ui.start('#firebaseui-auth-container', uiConfig);
}

function account_sign_in_status(){
        function initApp() {
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var uid = user.uid;
            var phoneNumber = user.phoneNumber;
            var providerData = user.providerData;
            user.getIdToken().then(function(accessToken) {
                console.log(displayName)
                console.log(email)

              // $("#username").html(displayName)
              // $("#email").html(email)
              // $("#user_photo").attr('src',photoURL)

            });
          } else {
                            console.log('not signed in')

            //window.location.href = 'https://chriscruze.github.io/CruzControl/login.html';
            document.getElementById('sign-in-status').textContent = 'Signed out';
            document.getElementById('sign-in').textContent = 'Sign in';
            document.getElementById('account-details').textContent = 'null';
          }
        

        }, function(error) {
          console.log(error);
        });
      


      };

      window.addEventListener('load', function() {
        initApp()
      });

}

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

//purpose is to check one dictionary against another and update it 
function dictionary_cross_check_apply_key(D,firebase_defined_dict,key){
    	if (firebase_defined_dict != undefined) {
      		D[key] = firebase_defined_dict[key]||"null";
    	} else {
      		D[key] = "null";
    	}

}

//purpose is to sync firebase array with regular array across keys
function firebase_array_integrate(array,firebase_url,identifier,keys) {
	keys = keys||['status']
	firebase_url = firebase_url||"https://shippy-ac235.firebaseio.com/dashbot/accounts.json"
	identifier = identifier||"DT_RowId"
  	firebase_dict = firebase_json_pull(firebase_url)||{}
  	array.forEach(function(D) {
    	firebase_defined_dict = firebase_dict[D[String(identifier)]]
    	keys.forEach(function(key){
    		dictionary_cross_check_apply_key(D,firebase_defined_dict,key)
    	})
    	

  });
  return array;
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