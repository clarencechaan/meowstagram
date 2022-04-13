import { arrayUnion, updateDoc, doc, arrayRemove } from "firebase/firestore";
import { db } from "../Firebase";

function follow(meUsername, username) {
  const meRef = doc(db, "users", meUsername);
  const userRef = doc(db, "users", username);
  updateDoc(meRef, {
    following: arrayUnion(username),
  });
  updateDoc(userRef, {
    followers: arrayUnion(meUsername),
    activityFeed: arrayUnion({
      category: "follow",
      username: meUsername,
    }),
  });
}

function unfollow(meUsername, username) {
  const meRef = doc(db, "users", meUsername);
  const userRef = doc(db, "users", username);
  updateDoc(meRef, {
    following: arrayRemove(username),
  });
  updateDoc(userRef, {
    followers: arrayRemove(meUsername),
    activityFeed: arrayRemove({
      category: "follow",
      username: meUsername,
    }),
  });
}

export { follow, unfollow };
