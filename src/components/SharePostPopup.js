import "../styles/SharePostPopup.css";
import SendMessagePopupContact from "./SendMessagePopupContact";

function SharePostPopup({ cancelPopup }) {
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
          />
        </div>
        <div className="share-post-popup-window-contacts">
          <div className="share-post-popup-window-suggested-label">
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
        <div className="share-post-popup-window-send-container">
          <button className="share-post-popup-window-send-btn">Send</button>
        </div>
      </div>
    </div>
  );
}

export default SharePostPopup;