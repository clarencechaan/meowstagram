import "../styles/ProfilePicPopup.css";
import profilePicPopupProfile from "../images/profile-pic-popup-profile.svg";
import profilePicPopupSaved from "../images/profile-pic-popup-saved.svg";
import profilePicPopupSettings from "../images/profile-pic-popup-settings.svg";
import profilePicPopupSwitch from "../images/profile-pic-popup-switch.svg";
import { Link } from "react-router-dom";

function ProfilePicPopup({
  cancelPopup,
  setSelected,
  lastSelected,
  setLastSelected,
}) {
  return (
    <div
      className="profile-pic-popup hidden"
      onClick={() => {
        cancelPopup();
        setSelected(lastSelected);
      }}
    >
      <div className="profile-pic-popup-window">
        <div className="profile-pic-popup-window-triangle"></div>
        {/* hides triangle bottom shadow */}
        <div className="profile-pic-popup-window-overlay">
          <Link
            to="/profile"
            onClick={(e) => {
              setSelected("profile-pic");
              e.stopPropagation();
              cancelPopup();
              setLastSelected("profile-pic");
            }}
          >
            <img src={profilePicPopupProfile} alt="" />
            Profile
          </Link>
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