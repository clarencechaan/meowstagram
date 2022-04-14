import "../styles/InboxChatMessage.css";

function InboxChatMessage({ me, sender, text }) {
  return (
    <div className="inbox-chat-message">
      {sender === me.username ? (
        <div className="inbox-chat-message-bubble sent-by-me">
          <span dangerouslySetInnerHTML={{ __html: text }} />
        </div>
      ) : (
        <div className="inbox-chat-message-bubble sent-by-contact">
          <span dangerouslySetInnerHTML={{ __html: text }} />
        </div>
      )}
    </div>
  );
}

export default InboxChatMessage;
