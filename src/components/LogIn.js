/* eslint-disable react-hooks/exhaustive-deps */
import "../styles/LogIn.css";
import Footer from "./Footer";
import uploadGuestUsers from "../scripts/uploadGuestUsers";

function LogIn({ setMe, guestsArr }) {
  return (
    <div className="log-in">
      <div className="log-in-window">
        <div className="log-in-header">Meowstagram</div>
        <div className="guest-log-in-container">
          {guestsArr.map((guest) => (
            <button
              className="guest-log-in-btn"
              onClick={() => setMe(guest)}
              key={guest.username}
            >
              <img src={guest.imgURL} alt="" referrerPolicy="no-referrer" />
              <div className="guest-log-in-btn-name">
                <div className="guest-log-in-btn-username">
                  @{guest.username}
                </div>
                ({guest.fullname})
              </div>
            </button>
          ))}
        </div>
        <div className="log-in-label">
          Log In as a Guest or{" "}
          <button className="google-log-in-btn">Log in with Google</button>
        </div>
      </div>
      <Footer />
      <button onClick={uploadGuestUsers}>upload guests</button>
    </div>
  );
}

export default LogIn;
