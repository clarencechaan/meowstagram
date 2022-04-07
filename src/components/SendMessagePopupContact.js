import "../styles/SendMessagePopupContact.css";
import cat from "../images/cat.jpg";

function SendMessagePopupContact() {
  return (
    <div className="send-message-popup-contact">
      <img className="send-message-popup-contact-img" src={cat} alt="" />
      <div className="send-message-popup-contact-names">
        <div className="send-message-popup-contact-username">stc.official</div>
        <div className="send-message-popup-contact-full-name">
          Sushi the Cat
        </div>
      </div>
    </div>
  );
}

export default SendMessagePopupContact;
