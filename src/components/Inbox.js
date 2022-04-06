import "../styles/Inbox.css";
import newMessage from "../images/inbox-new-message.svg";
import InboxContact from "./InboxContact";
import paperPlane from "../images/paper-plane.png";

function Inbox() {
  return (
    <div className="inbox">
      <div className="inbox-sidebar">
        <div className="inbox-sidebar-header">
          <span>stc.official</span>
          <img
            className="inbox-sidebar-header-new-message-btn"
            src={newMessage}
            alt=""
          />
        </div>
        <div className="inbox-sidebar-contacts">
          <InboxContact />
          <InboxContact />
          <InboxContact />
          <InboxContact />
          <InboxContact />
          <InboxContact />
          <InboxContact />
          <InboxContact />
          <InboxContact />
          <InboxContact />
          <InboxContact />
          <InboxContact />
          <InboxContact />
          <InboxContact />
          <InboxContact />
          <InboxContact />
          <InboxContact />
          <InboxContact />
          <InboxContact />
          <InboxContact />
          <InboxContact />
        </div>
      </div>
      <div className="inbox-messages">
        <img className="inbox-paper-plane" src={paperPlane} alt="" />
        <div className="inbox-your-messages-label">Your Messages</div>
        <div className="inbox-your-messages-subtext">
          Send private messages to a friend.
        </div>
        <button className="inbox-send-message-btn">Send Message</button>
      </div>
    </div>
  );
}

export default Inbox;
