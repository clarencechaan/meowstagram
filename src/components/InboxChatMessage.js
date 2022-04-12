import "../styles/InboxChatMessage.css";

function InboxChatMessage({ me, sender, text }) {
  return (
    <div className="inbox-chat-message">
      {sender === me.username ? (
        <div className="inbox-chat-message-bubble sent-by-me">
          <span>{text}</span>
        </div>
      ) : (
        <div className="inbox-chat-message-bubble sent-by-contact">
          <span>{text}</span>
        </div>
      )}
    </div>
  );
}

export default InboxChatMessage;
