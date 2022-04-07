import "../styles/InboxChatMessage.css";

function InboxChatMessage({ sender }) {
  return (
    <div className="inbox-chat-message">
      {sender === "me" ? (
        <div className="inbox-chat-message-bubble sent-by-me">
          <span>Who lives in a pineapple under the sea?</span>
        </div>
      ) : (
        <div className="inbox-chat-message-bubble sent-by-contact">
          <span>SPONGE. BOB. SQUARE. PANTS.</span>
        </div>
      )}
    </div>
  );
}

export default InboxChatMessage;
