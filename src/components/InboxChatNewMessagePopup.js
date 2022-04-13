import "../styles/InboxChatNewMessagePopup.css";
import SendMessagePopupContact from "./SendMessagePopupContact";
import { useState } from "react";

function InboxChatNewMessagePopup({
  cancelPopup,
  setContactSelected,
  contacts,
}) {
  const [query, setQuery] = useState("");

  const searchResults = contacts.filter(
    (contact) =>
      contact.username.toLowerCase().includes(query.toLowerCase()) ||
      contact.fullname.toLowerCase().includes(query.toLowerCase())
  );

  function handleInputChanged(e) {
    setQuery(e.target.value);
  }

  return (
    <div className="inbox-chat-new-message-popup" onClick={cancelPopup}>
      <div
        className="inbox-chat-new-message-popup-window"
        // prevent close on clicking
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="inbox-chat-new-message-popup-window-header">
          New Message
        </div>
        <div className="inbox-chat-new-message-popup-window-to-bar">
          <span className="inbox-chat-new-message-popup-window-to">To:</span>
          <input
            type="text"
            className="inbox-chat-new-message-popup-window-to-input"
            placeholder="Search..."
            value={query}
            onChange={(e) => {
              handleInputChanged(e);
            }}
          />
        </div>
        <div className="inbox-chat-new-message-popup-window-contacts">
          <div className="inbox-chat-new-message-popup-window-suggested-label">
            Suggested
          </div>
          {searchResults.map((contact) => (
            <SendMessagePopupContact
              user={contact}
              key={contact.username}
              setContactSelected={setContactSelected}
              cancelPopup={cancelPopup}
            />
          ))}
          {contacts.length === 0 ? (
            <div className="inbox-chat-new-message-popup-no-contacts">
              You are not following anyone and no one is following you.
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default InboxChatNewMessagePopup;
