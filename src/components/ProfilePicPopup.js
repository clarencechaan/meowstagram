import "../styles/ProfilePicPopup.css";
import profilePicPopupProfile from "../images/profile-pic-popup-profile.svg";
import profilePicPopupSaved from "../images/profile-pic-popup-saved.svg";
import profilePicPopupSettings from "../images/profile-pic-popup-settings.svg";
import profilePicPopupSwitch from "../images/profile-pic-popup-switch.svg";

function ProfilePicPopup({ cancelPopup }) {
  return (
    <div className="profile-pic-popup hidden" onClick={cancelPopup}>
      <div
        className="profile-pic-popup-window"
        // prevent close on clicking
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="profile-pic-popup-window-triangle"></div>
        {/* hides triangle bottom shadow */}
        <div className="profile-pic-popup-window-overlay">
          <button>
            <img src={profilePicPopupProfile} alt="" />
            Profile
          </button>
          <button>
            <img src={profilePicPopupSaved} alt="" />
            Saved
          </button>
          <button>
            <img src={profilePicPopupSettings} alt="" />
            Settings
          </button>
          <button>
            <img src={profilePicPopupSwitch} alt="" />
            Switch Accounts
          </button>
          <button>Log Out</button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePicPopup;
