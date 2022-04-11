import "../styles/LikesPopupUser.css";
import LikesPopupUser from "./LikesPopupUser";

function FollowingPopup({
  cancelPopup,
  following,
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
        <div className="likes-popup-window-header">Following</div>
        <div className="likes-popup-users-container">
          {following.map((username) => (
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

export default FollowingPopup;
