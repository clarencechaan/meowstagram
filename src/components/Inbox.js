/* eslint-disable react-hooks/exhaustive-deps */
import "../styles/Inbox.css";
import newMessage from "../images/inbox-new-message.svg";
import InboxContact from "./InboxContact";
import paperPlane from "../images/paper-plane.png";
import { useEffect, useState } from "react";
import InboxChat from "./InboxChat";
import InboxChatNewMessagePopup from "./InboxChatNewMessagePopup";

function Inbox({ me, setNavLinkSelectedHard }) {
  const [contactSelected, setContactSelected] = useState(null);
  const [sendMessagePopupShown, setSendMessagePopupShown] = useState(false);
  const contactsArr = [...new Set([...me.followers, ...me.following])];

  useEffect(() => setNavLinkSelectedHard("messenger"), []);

  function cancelSendMessagePopup() {
    setSendMessagePopupShown(false);
    document.body.style.overflow = "auto";
  }

  function handleNewMessageBtnClicked() {
    setSendMessagePopupShown(true);
    document.body.style.overflow = "hidden";
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
          {contactsArr.map((username) => (
            <InboxContact
              username={username}
              contactSelected={contactSelected}
              setContactSelected={setContactSelected}
              key={username}
            />
          ))}
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
        <InboxChat me={me} contactSelected={contactSelected} />
      )}
      {sendMessagePopupShown ? (
        <InboxChatNewMessagePopup cancelPopup={cancelSendMessagePopup} />
      ) : null}
    </div>
  );
}

export default Inbox;
