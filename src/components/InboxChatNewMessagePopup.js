import "../styles/InboxChatNewMessagePopup.css";
import SendMessagePopupContact from "./SendMessagePopupContact";

function InboxChatNewMessagePopup({ cancelPopup }) {
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
          />
        </div>
        <div className="inbox-chat-new-message-popup-window-contacts">
          <div className="inbox-chat-new-message-popup-window-suggested-label">
            Suggested
          </div>
          <SendMessagePopupContact />
          <SendMessagePopupContact />
          <SendMessagePopupContact />
          <SendMessagePopupContact />
          <SendMessagePopupContact />
          <SendMessagePopupContact />
          <SendMessagePopupContact />
          <SendMessagePopupContact />
          <SendMessagePopupContact />
          <SendMessagePopupContact />
          <SendMessagePopupContact />
          <SendMessagePopupContact />
          <SendMessagePopupContact />
        </div>
      </div>
    </div>
  );
}

export default InboxChatNewMessagePopup;
