import {db} from "./firebase.js"

function addExperience(experience, position)
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


function editExperience(experience, position , id)
{
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


function deleteExperience(id)
{
	.doc(firebase.auth().currentUser.uid)
        .collection("experience")
        .doc(id).delete().then(() => {
    		console.log("Document successfully deleted!");
		}).catch((error) => {
    	console.error("Error removing document: ", error);
	});
}