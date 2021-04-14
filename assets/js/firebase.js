export let db;
export let storageRef;

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

  var storage = firebase.storage();
  storageRef = storage.ref();
}

export function registerVolunteer(
  age,
  email,
  password,
  firstName,
  lastName,
  interests,
  postalCode,
  timeCommitment,
  timeFrame,
  school
) {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      let user = userCredential.user;

      user.sendEmailVerification().catch(function (error) {
        console.error(error.code, error.message);
      });

      user
        .updateProfile({
          displayName: firstName + " " + lastName,
        })
        .catch(function (error) {
          console.error(error.code, error.message);
        });

      db.collection("volunteers")
        .doc(user.uid)
        .set({
          age: age,
          email: email,
          firstName: firstName,
          lastName: lastName,
          interests: interests,
          postalCode: postalCode,
          timeCommitment: timeCommitment,
          timeFrame: timeFrame,
          school: school,
        })
        .then(() => {
          window.location = "/dashboard/";
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    })
    .catch((error) => {
      console.error(error.code, error.message);
    });
}

export function registerOrganization(
  name,
  email,
  password,
  website,
  location,
  fields,
  description,
  logo,
  bg_img,
  phoneNumber
) {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      let user = userCredential.user;

      user.sendEmailVerification().catch(function (error) {
        console.error(error.code, error.message);
      });

      user
        .updateProfile({
          displayName: name,
        })
        .catch(function (error) {
          console.error(error.code, error.message);
        });

      let promises = [];

      let logoName = "logo." + logo.type.split("/")[1];
      let logoRef = storageRef.child(name + "/" + logoName);
      promises.push(logoRef.put(logo));

      if (bg_img) {
        let bgName = "background." + bg_img.type.split("/")[1];
        let bgRef = storageRef.child(name + "/" + bgName);
        promises.push(bgRef.put(bg_img));
      }

      promises.push(
        db.collection("organizations").doc(user.uid).set({
          name: name,
          email: email,
          website: website,
          location: location,
          phone: phoneNumber,
          fields: fields,
          description: description,
        })
      );

      Promise.all(promises)
        .then(() => {
          window.location = "/our-opportunities/";
        })
        .catch((error) => {
          console.error(error.code, error.message);
        });
    })
    .catch((error) => {
      console.error(error.code, error.message);
    });
}

export function registerSchool(
  name,
  email,
  password,
  website,
  location,
  phoneNumber,
  logo,
  bg_img
) {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      let user = userCredential.user;

      // user.sendEmailVerification().catch(function (error) {
      //   console.error(error.code, error.message);
      // });

      user
        .updateProfile({
          displayName: name,
        })
        .catch(function (error) {
          console.error(error.code, error.message);
        });

      let promises = [];

      let logoName = "logo." + logo.type.split("/")[1];
      let logoRef = storageRef.child(name + "/" + logoName);
      promises.push(logoRef.put(logo));

      if (bg_img) {
        let bgName = "background." + bg_img.type.split("/")[1];
        let bgRef = storageRef.child(name + "/" + bgName);
        promises.push(bgRef.put(bg_img));
      }

      promises.push(
        db.collection("school").doc(user.uid).set({
          name: name,
          email: email,
          website: website,
          location: location,
          phone: phoneNumber,
        })
      );

      Promise.all(promises)
        .then(() => {
          window.location = "/our-opportunities/";
        })
        .catch((error) => {
          console.error(error.code, error.message);
        });
    })
    .catch((error) => {
      console.error(error.code, error.message);
    });
}

export function login(email, password) {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch((error) => {
      console.error(error.code, error.message);
    });
}

export function logout() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
}

initializeInstance();
