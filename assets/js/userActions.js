import {db} from "./firebase.js"

export function addExperience(experience, position)
{
	db.collection("volunteers")
        .doc(firebase.auth().currentUser.uid)
        .collection("experience")
        .add({
          experience: experience,
          position: position
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
}


export function editExperience(experience, position, id)
{
    db.collection("volunteers")
	      .doc(firebase.auth().currentUser.uid)
        .collection("experience")
        .doc(id)
        .set({
          experience: experience,
          position: position
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
}


export function deleteExperience(id)
{
  db.collection("volunteers")
	      .doc(firebase.auth().currentUser.uid)
        .collection("experience")
        .doc(id).delete().then(() => {
    		console.log("Document successfully deleted!");
		}).catch((error) => {
    	console.error("Error removing document: ", error);
	});
}