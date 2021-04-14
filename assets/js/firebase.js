function register(age, email, password, interests, location, timeCommitment, timeSpent) {

	firebase.auth().createUserWithEmailAndPassword(email, password)
	  .then((userCredential) => {
	    // Signed in 
	    var user = userCredential.user;
	    // ...
	  })
	  .catch((error) => {
	    var errorCode = error.code;
	    var errorMessage = error.message;
	    // ..
	  });

}