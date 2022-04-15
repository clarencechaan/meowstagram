import { arrayUnion, updateDoc, doc, arrayRemove } from "firebase/firestore";
import { db } from "../Firebase";

async function follow(meUsername, username) {
  const meRef = doc(db, "users", meUsername);
  const userRef = doc(db, "users", username);
  await updateDoc(meRef, {
    following: arrayUnion(username),
  });
  await updateDoc(userRef, {
    followers: arrayUnion(meUsername),
    activityFeed: arrayUnion({
      category: "follow",
      username: meUsername,
    }),
  });
}

async function unfollow(meUsername, username) {
  const meRef = doc(db, "users", meUsername);
  const userRef = doc(db, "users", username);
  await updateDoc(meRef, {
    following: arrayRemove(username),
  });
  await updateDoc(userRef, {
    followers: arrayRemove(meUsername),
    activityFeed: arrayRemove({
      category: "follow",
      username: meUsername,
    }),
  });
}

export { follow, unfollow };
