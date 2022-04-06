import "../styles/LikesPopup.css";
import LikesPopupUser from "./LikesPopupUser";

function LikesPopup({ cancelPopup }) {
  return (
    <div className="likes-popup" onClick={cancelPopup}>
      <div
        className="likes-popup-window"
        // prevent close on clicking
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="likes-popup-window-header">Likes</div>
        <div className="likes-popup-users-container">
          <LikesPopupUser />
          <LikesPopupUser />
          <LikesPopupUser />
          <LikesPopupUser />
          <LikesPopupUser />
          <LikesPopupUser />
          <LikesPopupUser />
          <LikesPopupUser />
          <LikesPopupUser />
          <LikesPopupUser />
          <LikesPopupUser />
        </div>
      </div>
    </div>
  );
}

export default LikesPopup;
