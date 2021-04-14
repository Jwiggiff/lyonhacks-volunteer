import {db} from "./firebase.js"

function addExperience(description, location, name, visibility)
{
	db.collection("schools")
        .doc(firebase.auth().currentUser.uid)
        .collection("opportunities")
        .add({
          description: description,
          location: location,
          name: name,
          visibility: visibility
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
}


function editExperience(description, location, name, visibility, id)
{
	db.collection("schools")
        .doc(firebase.auth().currentUser.uid)
        .collection("opportunities")
        .doc(id)
        .set({
          description: description,
          location: location,
          name: name,
          visibility: visibility
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
}


function deleteExperience(id)
{
	db.collection("schools")
        .doc(firebase.auth().currentUser.uid)
        .collection("opportunities")
        .doc(id).delete().then(() => {
    		console.log("Document successfully deleted!");
		}).catch((error) => {
    	console.error("Error removing document: ", error);
	});
}