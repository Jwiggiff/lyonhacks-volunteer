let db;

function initializeInstance() {
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyDqyIRkw4LBVXwHPSvryG0-YKBGXrK0TgE",
    authDomain: "lyonshack-e36ac.firebaseapp.com",
    projectId: "lyonshack-e36ac",
    storageBucket: "lyonshack-e36ac.appspot.com",
    messagingSenderId: "286855859814",
    appId: "1:286855859814:web:4d7aa3770753d5999c67a7",
    measurementId: "G-RHY84JFRRG",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  db = firebase.firestore();
}

export function registerVolunteer(age, email, password, firstName, lastName, interests, location, timeCommitment, timeFrame) {
	firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      let user = userCredential.user;

      db.collection("volunteers")
        .doc(user.uid)
        .set({
          age: age,
          email: email,
		  firstName: firstName,
		  lastName: lastName,
          interests: interests,
          location: location,
          timeCommitment: timeCommitment,
          timeFrame: timeFrame
        })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    })
    .catch((error) => {
      console.error(err.code, err.message);
    });
}

export function registerOrganization(email, password, website, location, fields, description, logo, bg_img) {
	firebase
	.auth()
	.createUserWithEmailAndPassword(email, password)
	.then((userCredential) => {
		let user = userCredential.user;

		db.collection("organizations")
			.doc(user.uid)
			.set({
				email: email,
				website: website,
				location: location
			})
			.then((docRef) => {
				console.log("Document written with ID: ", docRef.id);
			})
			.catch((error) => {
				console.error("Error adding document: ", error);
			});
		})
		.catch((error) => {
			console.error(err.code, err.message);
		});
}

export function registerSchool(email, password, website, location) {
	firebase
	.auth()
	.createUserWithEmailAndPassword(email, password)
	.then((userCredential) => {
		let user = userCredential.user;

		db.collection("school")
			.doc(user.uid)
			.set({
				email: email,
				website: website,
				location: location
			})
			.then((docRef) => {
				console.log("Document written with ID: ", docRef.id);
			})
			.catch((error) => {
				console.error("Error adding document: ", error);
			});
		})
		.catch((error) => {
			console.error(err.code, err.message);
		});
}


export function login(email, password)
{
	firebase.auth().signInWithEmailAndPassword(email, password)
	.then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  });
}

initializeInstance();