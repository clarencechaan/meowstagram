/* eslint-disable react-hooks/exhaustive-deps */
import "../styles/SharePostPopup.css";
import SendMessagePopupContact from "./SendMessagePopupContact";
import { useEffect, useState, useRef } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase";
import { Link } from "react-router-dom";
import ProgressBar from "./ProgressBar";

function SharePostPopup({ me, cancelPopup, postID }) {
  const [query, setQuery] = useState("");
  const [contacts, setContacts] = useState([]);
  const contactUsernames = [...new Set([...me.followers, ...me.following])];
  const [loading, setLoading] = useState(true);
  const inputRef = useRef(null);

  const searchResults = contacts.filter(
    (contact) =>
      contact.username.toLowerCase().includes(query.toLowerCase()) ||
      contact.fullname.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    fetchUsers();
    inputRef.current.focus();
  }, []);

  async function fetchUsers() {
    let contactsArr = [];
    for (const username of contactUsernames) {
      const userRef = doc(db, "users", username);
      const userSnap = await getDoc(userRef);
      contactsArr.push(userSnap.data());
    }
    setContacts(contactsArr);
    setLoading(false);
  }

  function handleInputChanged(e) {
    setQuery(e.target.value);
  }

  return (
    <div className="share-post-popup" onClick={cancelPopup}>
      <div
        className="share-post-popup-window"
        // prevent close on clicking
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="share-post-popup-window-header">Share</div>
        <div className="share-post-popup-window-to-bar">
          <span className="share-post-popup-window-to">To:</span>
          <input
            type="text"
            className="share-post-popup-window-to-input"
            placeholder="Search..."
            onChange={(e) => {
              handleInputChanged(e);
            }}
            ref={inputRef}
          />
        </div>
        <div className="share-post-popup-window-contacts">
          {loading ? <ProgressBar speed={2} /> : null}
          <div className="share-post-popup-window-suggested-label">
            Suggested
          </div>
          {searchResults.map((contact) => (
            <Link
              to={"/inbox/" + contact.username}
              key={contact.username}
              state={{ postID }}
            >
              <SendMessagePopupContact
                user={contact}
                setContactSelected={() => {}}
                cancelPopup={cancelPopup}
              />
            </Link>
          ))}
          {contacts.length === 0 && !loading ? (
            <div className="share-post-popup-no-contacts">
              You are not following anyone and no one is following you.
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default SharePostPopup;
