import "../styles/SendMessagePopupContact.css";

function SendMessagePopupContact({ user, setContactSelected, cancelPopup }) {
  function handleContactClicked() {
    setContactSelected(user);
    cancelPopup();
  }

  return (
    <div className="send-message-popup-contact" onClick={handleContactClicked}>
      <img
        className="send-message-popup-contact-img"
        src={user.imgURL}
        alt=""
      />
      <div className="send-message-popup-contact-names">
        <div className="send-message-popup-contact-username">
          {user.username}
        </div>
        <div className="send-message-popup-contact-full-name">
          {user.fullname}
        </div>
      </div>
    </div>
  );
}

export default SendMessagePopupContact;
