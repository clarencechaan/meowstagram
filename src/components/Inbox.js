/* eslint-disable react-hooks/exhaustive-deps */
import "../styles/Inbox.css";
import newMessage from "../images/inbox-new-message.svg";
import InboxContact from "./InboxContact";
import paperPlane from "../images/paper-plane.png";
import { useEffect, useState } from "react";
import InboxChat from "./InboxChat";
import InboxChatNewMessagePopup from "./InboxChatNewMessagePopup";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase";
import { useParams, useLocation } from "react-router-dom";

function Inbox({ me, setNavLinkSelectedHard }) {
  const username = useParams().username;
  const postID = useLocation()?.state?.postID;
  const [contactSelected, setContactSelected] = useState(null);
  const [sendMessagePopupShown, setSendMessagePopupShown] = useState(false);
  const contactUsernames = [...new Set([...me.followers, ...me.following])];
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    setNavLinkSelectedHard("messenger");
    fetchUsers();
  }, []);

  useEffect(() => {
    if (username)
      setContactSelected(
        contacts.find((contact) => contact.username === username)
      );
  }, [contacts]);

  function cancelSendMessagePopup() {
    setSendMessagePopupShown(false);
    document.body.style.overflow = "auto";
  }

  function handleNewMessageBtnClicked() {
    setSendMessagePopupShown(true);
    document.body.style.overflow = "hidden";
  }

  async function fetchUsers() {
    let contactsArr = [];
    for (const username of contactUsernames) {
      const userRef = doc(db, "users", username);
      const userSnap = await getDoc(userRef);
      contactsArr.push(userSnap.data());
    }
    setContacts(contactsArr);
  }

  return (
    <div className="inbox">
      <div className="inbox-sidebar">
        <div className="inbox-sidebar-header">
          <span>{me.username}</span>
          <img
            className="inbox-sidebar-header-new-message-btn"
            src={newMessage}
            alt=""
            onClick={handleNewMessageBtnClicked}
          />
        </div>
        <div className="inbox-sidebar-contacts">
          {contacts.map((contact) => (
            <InboxContact
              user={contact}
              contactSelected={contactSelected}
              setContactSelected={setContactSelected}
              key={contact.username}
            />
          ))}
          {contacts.length === 0 ? (
            <div className="inbox-sidebar-no-contacts-msg">
              You are not following anyone and no one is following you.
            </div>
          ) : null}
        </div>
      </div>
      {!contactSelected ? (
        <div className="inbox-messages">
          <img className="inbox-paper-plane" src={paperPlane} alt="" />
          <div className="inbox-your-messages-label">Your Messages</div>
          <div className="inbox-your-messages-subtext">
            Send private messages to a friend.
          </div>
          <button
            className="inbox-send-message-btn"
            onClick={handleNewMessageBtnClicked}
          >
            Send Message
          </button>
        </div>
      ) : (
        <InboxChat me={me} contactSelected={contactSelected} postID={postID} />
      )}
      {sendMessagePopupShown ? (
        <InboxChatNewMessagePopup
          cancelPopup={cancelSendMessagePopup}
          setContactSelected={setContactSelected}
          contacts={contacts}
        />
      ) : null}
    </div>
  );
}

export default Inbox;
