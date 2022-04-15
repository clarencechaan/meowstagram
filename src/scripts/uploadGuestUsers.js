import { db } from "../Firebase";
import { doc, setDoc } from "firebase/firestore";
import { guestDefaults } from "./guests";

async function uploadGuestUsers() {
  for (const guest of guestDefaults) {
    const userRef = doc(db, "users", guest.username);
    await setDoc(userRef, guest);
  }
}

export default uploadGuestUsers;
