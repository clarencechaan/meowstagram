import { db } from "../Firebase";
import { doc, setDoc } from "firebase/firestore";
import guestsArray from "./guests";

async function uploadGuestUsers() {
  for (const guest of guestsArray) {
    const userRef = doc(db, "users", guest.username);
    await setDoc(userRef, guest);
  }
}

export default uploadGuestUsers;
