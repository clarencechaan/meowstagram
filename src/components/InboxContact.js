import "../styles/InboxContact.css";
import cat from "../images/cat.jpg";

function InboxContact() {
  return (
    <div className="inbox-contact">
      <img className="inbox-contact-img" src={cat} alt="" />
      <div>
        <div className="inbox-contact-full-name">Sushi the Cat</div>
        <div className="inbox-contact-message-preview">
          <span>I woke up like this. • </span>
          <span>2w</span>
        </div>
      </div>
    </div>
  );
}

export default InboxContact;
