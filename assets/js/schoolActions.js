import {db} from "./firebase.js"

function addExperience(position, location, timeFrame, timeCommitment, requirements, description, contact, status, visibility)
{
	db.collection("schools")
        .doc(firebase.auth().currentUser.uid)
        .collection("opportunities")
        .add({
          position: position,
          location: location,
          timeFrame: timeFrame,
          timeCommitment: timeCommitment,
          requirements: requirements,
          description: description,
          contact: contact,
          status: status,
          visibility: visibility
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
}


function editExperience(position, location, timeFrame, timeCommitment, requirements, description, contact, status, visibility, id)
{
	db.collection("schools")
        .doc(firebase.auth().currentUser.uid)
        .collection("opportunities")
        .doc(id)
        .set({
          position: position,
          location: location,
          timeFrame: timeFrame,
          timeCommitment: timeCommitment,
          requirements: requirements,
          description: description,
          contact: contact,
          status: status,
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