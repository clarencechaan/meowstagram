import "../styles/LikesPopupUser.css";
import LikesPopupUser from "./LikesPopupUser";

function FollowersPopup({
  cancelPopup,
  followers,
  me,
  setMe,
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
        <div className="likes-popup-window-header">Followers</div>
        <div className="likes-popup-users-container">
          {followers.map((username) => (
            <LikesPopupUser
              username={username}
              key={username}
              me={me}
              setMe={setMe}
              cancelPostPopup={cancelPopup}
              profileUser={profileUser}
              setProfileUser={setProfileUser}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FollowersPopup;
