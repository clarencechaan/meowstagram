import "../styles/SideBar.css";
import catProfile from "../images/cat.jpg";
import Suggestion from "./Suggestion";
import { Link } from "react-router-dom";

function SideBar({ setNavLinkSelected }) {
  return (
    <div className="SideBar">
      <div className="sidebar-user">
        <Link to="/profile" onClick={() => setNavLinkSelected("profile-pic")}>
          <img className="sidebar-profile-img" src={catProfile} alt="" />
        </Link>
        <div className="sidebar-user-names">
          <Link to="/profile" onClick={() => setNavLinkSelected("profile-pic")}>
            <div className="sidebar-user-username">stc.official</div>
          </Link>
          <div className="sidebar-user-fullname">Sushi the Cat</div>
        </div>
        <button className="sidebar-user-switch">Switch</button>
      </div>
      <div className="suggestions">
        <div className="suggestions-header">
          <div className="suggestions-title">Suggestions For You</div>
          <button className="suggestions-see-all">See All</button>
        </div>
        <div className="suggestions-content">
          <Suggestion />
          <Suggestion />
          <Suggestion />
          <Suggestion />
          <Suggestion />
        </div>
      </div>
      <div className="sidebar-info">
        <p>
          About • Help • Press • API • Jobs • Privacy • Terms • Locations • Top
          Accounts • Hashtags • Language
        </p>
        <span>
          Made with ♥ love by{" "}
          <a href="https://github.com/clarencechaan/">Clarence Chan</a>!
        </span>
      </div>
    </div>
  );
}

export default SideBar;
