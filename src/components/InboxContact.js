/* eslint-disable react-hooks/exhaustive-deps */
import "../styles/InboxContact.css";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase";

function InboxContact({ username, contactSelected, setContactSelected }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    fetchUser();
  }, []);

  async function fetchUser() {
    const userRef = doc(db, "users", username);
    const userSnap = await getDoc(userRef);
    setUser(userSnap.data());
  }

  function handleContactClicked() {
    setContactSelected(user);
  }

  return (
    <div
      className={
        contactSelected && contactSelected.username === username
          ? "inbox-contact selected"
          : "inbox-contact"
      }
      onClick={handleContactClicked}
    >
      <img className="inbox-contact-img" src={user.imgURL} alt="" />
      <div>
        <div className="inbox-contact-full-name">{user.username}</div>
        <div className="inbox-contact-message-preview">
          <span>{user.fullname}</span>
        </div>
      </div>
    </div>
  );
}

export default InboxContact;
