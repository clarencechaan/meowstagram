import "../styles/SharePostPopupContact.css";
import cat from "../images/cat.jpg";

function SharePostPopupContact() {
  return (
    <div className="share-post-popup-contact">
      <img className="share-post-popup-contact-img" src={cat} alt="" />
      <div className="share-post-popup-contact-names">
        <div className="share-post-popup-contact-username">stc.official</div>
        <div className="share-post-popup-contact-full-name">Sushi the Cat</div>
      </div>
    </div>
  );
}

export default SharePostPopupContact;
