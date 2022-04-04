import "../styles/SideBar.css";
import catProfile from "../images/cat.jpg";
import Suggestion from "./Suggestion";

function SideBar() {
  return (
    <div className="SideBar">
      <div className="sidebar-user">
        <img className="sidebar-profile-img" src={catProfile} alt="" />
        <div className="sidebar-user-names">
          <div className="sidebar-user-username">stc.official</div>
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
        <p>
          Made with ♥ love by{" "}
          <a href="https://github.com/clarencechaan/">Clarence Chan</a>!
        </p>
      </div>
    </div>
  );
}

export default SideBar;
