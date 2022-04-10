/* eslint-disable react-hooks/exhaustive-deps */
import "../styles/SideBar.css";
import Suggestion from "./Suggestion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, query, limit, getDocs, where } from "firebase/firestore";
import { db } from "../Firebase";

function SideBar({ setNavLinkSelected, me, setMe }) {
  const [suggestedUsers, setSuggestedUsers] = useState([]);

  useEffect(() => {
    fetchSuggestedUsers();
  }, []);

  async function fetchSuggestedUsers() {
    const usersRef = collection(db, "users");
    let resultArr = [];
    const q = query(usersRef, where("username", "!=", me.username), limit(5));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      resultArr.push({ ...doc.data(), id: doc.id });
    });
    setSuggestedUsers(resultArr);
  }

  return (
    <div className="SideBar">
      <div className="sidebar-user">
        <Link to="/profile" onClick={() => setNavLinkSelected("profile-pic")}>
          <img className="sidebar-profile-img" src={me.imgURL} alt="" />
        </Link>
        <div className="sidebar-user-names">
          <Link to="/profile" onClick={() => setNavLinkSelected("profile-pic")}>
            <div className="sidebar-user-username">{me.username}</div>
          </Link>
          <div className="sidebar-user-fullname">{me.fullname}</div>
        </div>
        <button className="sidebar-user-switch">Switch</button>
      </div>
      <div className="suggestions">
        <div className="suggestions-header">
          <div className="suggestions-title">Suggestions For You</div>
          <button className="suggestions-see-all">See All</button>
        </div>
        <div className="suggestions-content">
          {suggestedUsers.map((user) => (
            <Suggestion user={user} key={user.username} me={me} setMe={setMe} />
          ))}
        </div>
      </div>
      <div className="sidebar-info">
        <p>
          <a href="https://github.com/clarencechaan/">About</a> •{" "}
          <a href="https://github.com/clarencechaan/">Help</a> •{" "}
          <a href="https://github.com/clarencechaan/">Press</a> •{" "}
          <a href="https://github.com/clarencechaan/">API</a> •{" "}
          <a href="https://github.com/clarencechaan/">Jobs</a> •{" "}
          <a href="https://github.com/clarencechaan/">Privacy</a> •{" "}
          <a href="https://github.com/clarencechaan/">Terms</a> •{" "}
          <a href="https://github.com/clarencechaan/">Locations</a> •{" "}
          <a href="https://github.com/clarencechaan/">Top Accounts</a> •{" "}
          <a href="https://github.com/clarencechaan/">Hashtags</a> •{" "}
          <a href="https://github.com/clarencechaan/">Language</a>
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
