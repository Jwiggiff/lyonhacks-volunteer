function initializeInstance () {
	// Initialize Cloud Firestore through Firebase
	//I think that this function is supposed to be called before the user logs in
	firebase.initializeApp({
	  apiKey: 'AIzaSyDqyIRkw4LBVXwHPSvryG0-YKBGXrK0TgE',
	  authDomain: 'lyonshack-e36ac.firebaseapp.com',
	  projectId: 'lyonshack-e36ac'
	});

	var db = firebase.firestore();
}

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


	db.collection("Volunteer").add({
    	age: age,
    	email: email,
    	password: password,
    	interests: interests,
    	location: location,
    	timeCommitment: timeCommitment,
    	timeSpent: timeSpent
    })
    .then((docRef) => {
    	console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
    	console.error("Error adding document: ", error);
	});
}