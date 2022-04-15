import "../styles/ProfilePicPopup.css";
import profilePicPopupProfile from "../images/profile-pic-popup-profile.svg";
import profilePicPopupSaved from "../images/profile-pic-popup-saved.svg";
import profilePicPopupSwitch from "../images/profile-pic-popup-switch.svg";
import { Link } from "react-router-dom";
import { signOut, getAuth } from "firebase/auth";

function ProfilePicPopup({
  cancelPopup,
  setSelected,
  lastSelected,
  setLastSelected,
  me,
  setMe,
}) {
  async function handleSignOutBtnClicked() {
    const auth = getAuth();
    localStorage.removeItem("username");
    setTimeout(async () => {
      await signOut(auth);
    }, 1);
    setMe(null);
  }

  return (
    <div
      className="profile-pic-popup"
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
            to={"/profile/" + me.username}
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
          <Link to={"/profile/" + me.username + "/saved"}>
            <button>
              <img src={profilePicPopupSaved} alt="" />
              Saved
            </button>
          </Link>
          <Link to="/" onClick={handleSignOutBtnClicked}>
            <button>
              <img src={profilePicPopupSwitch} alt="" />
              Switch Accounts
            </button>
          </Link>
          <Link to="/" onClick={handleSignOutBtnClicked}>
            <button>Log Out</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProfilePicPopup;
