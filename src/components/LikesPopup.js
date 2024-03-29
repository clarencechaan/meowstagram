import "../styles/LikesPopup.css";
import LikesPopupUser from "./LikesPopupUser";

function LikesPopup({
  cancelPopup,
  likes,
  me,
  setMe,
  cancelPostPopup,
  profileUser,
  setProfileUser,
}) {
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
          {likes.map((username) => (
            <LikesPopupUser
              username={username}
              key={username}
              me={me}
              setMe={setMe}
              cancelPostPopup={cancelPostPopup}
              profileUser={profileUser}
              setProfileUser={setProfileUser}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default LikesPopup;
