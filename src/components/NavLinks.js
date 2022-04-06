import homeSelected from "../images/home-selected.svg";
import homeUnselected from "../images/home-unselected.svg";
import messengerSelected from "../images/messenger-selected.svg";
import messengerUnselected from "../images/messenger-unselected.svg";
import newPostSelected from "../images/new-post-selected.svg";
import newPostUnselected from "../images/new-post-unselected.svg";
import findPeopleSelected from "../images/find-people-selected.svg";
import findPeopleUnselected from "../images/find-people-unselected.svg";
import activityFeedSelected from "../images/activity-feed-selected.svg";
import activityFeedUnselected from "../images/activity-feed-unselected.svg";
import placeholderProfilePic from "../images/placeholder-profile-150x150.jpg";
import "../styles/NavLinks.css";
import { useState } from "react";
import NewPostPopup from "./NewPostPopup";
import ActivityFeedPopup from "./ActivityFeedPopup";
import ProfilePicPopup from "./ProfilePicPopup";
import { Link } from "react-router-dom";

function NavLinks({ cancelPopup, selected, setSelected }) {
  const [lastSelected, setLastSelected] = useState("home");

  function handleNewPostNavLinkClicked() {
    const newPostPopup = document.querySelector(".new-post-popup");
    newPostPopup.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    setSelected("new-post");
  }

  function handleActivityFeedNavLinkClicked() {
    const activityFeedPopup = document.querySelector(".activity-feed-popup");
    activityFeedPopup.classList.remove("hidden");
    setSelected("activity-feed");
  }

  function handleProfilePicNavLinkClicked() {
    const profilePicPopup = document.querySelector(".profile-pic-popup");
    profilePicPopup.classList.remove("hidden");
    setSelected("profile-pic");
  }

  return (
    <div className="nav-links">
      <Link
        to="/"
        className="nav-link"
        onClick={() => {
          setSelected("home");
          setLastSelected("home");
        }}
      >
        <img
          src={selected === "home" ? homeSelected : homeUnselected}
          alt=""
          id="home-nav-link"
        />
      </Link>
      <Link
        to="/inbox"
        className="nav-link"
        onClick={() => {
          setSelected("messenger");
          setLastSelected("messenger");
        }}
      >
        <img
          src={
            selected === "messenger" ? messengerSelected : messengerUnselected
          }
          alt=""
          id="messenger-nav-link"
        />
      </Link>
      <img
        src={selected === "new-post" ? newPostSelected : newPostUnselected}
        alt=""
        className="nav-link"
        id="new-post-nav-link"
        onClick={handleNewPostNavLinkClicked}
      />
      <Link
        to="/explore"
        className="nav-link"
        onClick={() => {
          setSelected("find-people");
          setLastSelected("find-people");
        }}
      >
        <img
          src={
            selected === "find-people"
              ? findPeopleSelected
              : findPeopleUnselected
          }
          alt=""
          id="find-people-nav-link"
        />
      </Link>
      <img
        src={
          selected === "activity-feed"
            ? activityFeedSelected
            : activityFeedUnselected
        }
        alt=""
        className="nav-link"
        id="activity-feed-nav-link"
        onClick={handleActivityFeedNavLinkClicked}
      />
      <img
        src={placeholderProfilePic}
        alt=""
        className={
          selected === "profile-pic" ? "nav-link bordered" : "nav-link"
        }
        id="profile-pic-nav-link"
        onClick={handleProfilePicNavLinkClicked}
      />
      <NewPostPopup
        cancelPopup={cancelPopup}
        setSelected={setSelected}
        lastSelected={lastSelected}
      />
      <ActivityFeedPopup
        cancelPopup={cancelPopup}
        setSelected={setSelected}
        lastSelected={lastSelected}
      />
      <ProfilePicPopup
        cancelPopup={cancelPopup}
        setSelected={setSelected}
        lastSelected={lastSelected}
        setLastSelected={setLastSelected}
      />
    </div>
  );
}

export default NavLinks;
