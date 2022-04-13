/* eslint-disable react-hooks/exhaustive-deps */
import "../styles/InboxContact.css";

function InboxContact({ user, contactSelected, setContactSelected }) {
  function handleContactClicked() {
    setContactSelected(user);
  }

  return (
    <div
      className={
        contactSelected && contactSelected.username === user.username
          ? "inbox-contact selected"
          : "inbox-contact"
      }
      onClick={handleContactClicked}
    >
      <img className="inbox-contact-img" src={user.imgURL} alt="" />
      <div>
        <div className="inbox-contact-full-name">{user.username}</div>
        <div className="inbox-contact-message-preview">
          <span>{user.fullname}</span>
        </div>
      </div>
    </div>
  );
}

export default InboxContact;
