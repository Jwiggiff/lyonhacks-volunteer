import {db} from "./firebase.js"

export function addComment(comment, userID, opportunityID)
{
	db.collection("organizations")
        .doc(firebase.auth().currentUser.uid)
        .collection("opportunities")
        .doc(opportunityID)
        .collection("comments")
        .add({
          userID: userID,
          comment: comment
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
}

//The frontend should ensure that this function can only run if the user that is logged in is the one that made the comment
export function editComment(comment, opportunityID, commentID)
{
  db.collection("organizations")
        .doc(firebase.auth().currentUser.uid)
        .collection("opportunities")
        .doc(opportunityID)
        .collection("comments")
        .doc(commentID)
        .set({
          comment: comment
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
}

//The frontend should ensure that this function can only run if the user that is logged in is the one that made the comment
export function deleteExperience(commentID)
{
  db.collection("organizations")
        .doc(firebase.auth().currentUser.uid)
        .collection("opportunities")
        .doc(commentID).delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
      console.error("Error removing document: ", error);
  });
}