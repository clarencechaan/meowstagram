import "../styles/NavBar.css";
import SearchBar from "./SearchBar";
import NavLinks from "./NavLinks";
import { Link } from "react-router-dom";
import { useState } from "react";

function NavBar({ selected, setSelected }) {
  const [lastSelected, setLastSelected] = useState("home");

  return (
    <div className="NavBar">
      <div className="navbar-content">
        <Link
          to="/"
          onClick={() => {
            setSelected("home");
            setLastSelected("home");
          }}
        >
          <div className="logo">Outstagram</div>
        </Link>
        <SearchBar
          cancelPopup={cancelPopup}
          selected={selected}
          setSelected={setSelected}
        />
        <NavLinks
          cancelPopup={cancelPopup}
          selected={selected}
          setSelected={setSelected}
          lastSelected={lastSelected}
          setLastSelected={setLastSelected}
        />
      </div>
    </div>
  );
}

function cancelPopup() {
  const newPostPopup = document.querySelector(".new-post-popup");
  const activityFeedPopup = document.querySelector(".activity-feed-popup");
  const profilePicPopup = document.querySelector(".profile-pic-popup");
  const searchBarPopup = document.querySelector(".search-bar-popup");
  newPostPopup.classList.add("hidden");
  activityFeedPopup.classList.add("hidden");
  profilePicPopup.classList.add("hidden");
  searchBarPopup.classList.add("hidden");
  document.body.style.overflow = "auto";
}

export default NavBar;
