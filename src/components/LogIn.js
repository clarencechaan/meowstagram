import "../styles/LogIn.css";
import Footer from "./Footer";

function LogIn({ setUser }) {
  return (
    <div className="log-in">
      <div className="log-in-window">
        <div className="log-in-header">Catstagram</div>
        <div className="guest-log-in-container">
          <button
            className="guest-log-in-btn"
            onClick={() => setUser("blueberry")}
          >
            <img
              src="https://imgur.com/MLoJBiX.jpg"
              alt=""
              referrerPolicy="no-referrer"
            />
            <div className="guest-log-in-btn-name">
              <div className="guest-log-in-btn-username">@blueberry</div>
              (Blueberry Onyx)
            </div>
          </button>
          <button
            className="guest-log-in-btn"
            onClick={() => setUser("omelette")}
          >
            <img
              src="https://imgur.com/xwFnZFN.jpg"
              alt=""
              referrerPolicy="no-referrer"
            />
            <div className="guest-log-in-btn-name">
              <div className="guest-log-in-btn-username">@omelette</div>
              (Omelette Sapphire II)
            </div>
          </button>
          <button
            className="guest-log-in-btn"
            onClick={() => setUser("widget")}
          >
            <img
              src="https://imgur.com/1qkpVEx.jpg"
              alt=""
              referrerPolicy="no-referrer"
            />
            <div className="guest-log-in-btn-name">
              <div className="guest-log-in-btn-username">@widget</div>
              (Widget Apollo Jr.)
            </div>
          </button>
          <button
            className="guest-log-in-btn"
            onClick={() => setUser("critter")}
          >
            <img
              src="https://imgur.com/MEFWOzT.jpg"
              alt=""
              referrerPolicy="no-referrer"
            />
            <div className="guest-log-in-btn-name">
              <div className="guest-log-in-btn-username">@critter</div>
              (Critter Cupcake)
            </div>
          </button>
          <button
            className="guest-log-in-btn"
            onClick={() => setUser("pumpkin")}
          >
            <img
              src="https://imgur.com/5BQjio2.jpg"
              alt=""
              referrerPolicy="no-referrer"
            />
            <div className="guest-log-in-btn-name">
              <div className="guest-log-in-btn-username">@pumpkin</div>
              (Pumpkin Pie III)
            </div>
          </button>
        </div>
        <div className="log-in-label">
          Log In as a Guest or{" "}
          <button className="google-log-in-btn">Log in with Google</button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LogIn;
