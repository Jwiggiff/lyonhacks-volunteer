import {db} from "./firebase.js"

export function addExperience(position, location, timeFrame, timeCommitment, requirements, description, contact, status) //status is for whether the opportunity is ongoing or archived
{
	db.collection("organizations")
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
          status: status
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
}


export function editExperience(position, location, timeFrame, timeCommitment, requirements, description, contact, status, id)
{
	db.collection("organizations")
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
          status: status
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
}


export function deleteExperience(id)
{
	db.collection("organizations")
        .doc(firebase.auth().currentUser.uid)
        .collection("opportunities")
        .doc(id).delete().then(() => {
    		console.log("Document successfully deleted!");
		}).catch((error) => {
    	console.error("Error removing document: ", error);
	});
}