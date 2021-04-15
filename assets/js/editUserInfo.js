export function changeSettings(experience, position)
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

export function deleteProfile(id)
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