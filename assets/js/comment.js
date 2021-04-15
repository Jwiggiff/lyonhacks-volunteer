import {db} from "./firebase.js"

export function addComment(comment, userID, opportunityID)
{
	db.collection("organizations")
        .doc(firebase.auth().currentUser.uid)
        .collection("opportunities")
        .doc(opportunityID)
        .set({
          userID: userID,
          comment: comment
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
}