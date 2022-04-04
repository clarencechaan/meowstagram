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
import { useEffect, useState } from "react";
import NewPostPopup from "./NewPostPopup";
import ActivityFeedPopup from "./ActivityFeedPopup";
import ProfilePicPopup from "./ProfilePicPopup";

function NavLinks({ cancelPopup }) {
  const [lastSelected, setLastSelected] = useState(null);

  useEffect(() => {
    const home = document.querySelector("#home-nav-link");
    const navLinks = document.querySelectorAll(".nav-link");

    setLastSelected(home);
    for (const navLink of navLinks) {
      navLink.addEventListener("click", () => selectNavLink(navLink));
    }
  }, []);

  function selectNavLink(navLink) {
    const home = document.querySelector("#home-nav-link");
    const messenger = document.querySelector("#messenger-nav-link");
    const newPost = document.querySelector("#new-post-nav-link");
    const findPeople = document.querySelector("#find-people-nav-link");
    const activityFeed = document.querySelector("#activity-feed-nav-link");
    const profilePic = document.querySelector("#profile-pic-nav-link");

    home.src = homeUnselected;
    messenger.src = messengerUnselected;
    newPost.src = newPostUnselected;
    findPeople.src = findPeopleUnselected;
    activityFeed.src = activityFeedUnselected;
    profilePic.classList.remove("bordered");

    switch (navLink.id) {
      case "home-nav-link":
        navLink.src = homeSelected;
        setLastSelected(navLink);
        break;
      case "messenger-nav-link":
        navLink.src = messengerSelected;
        setLastSelected(navLink);
        break;
      case "new-post-nav-link":
        navLink.src = newPostSelected;
        break;
      case "find-people-nav-link":
        navLink.src = findPeopleSelected;
        setLastSelected(navLink);
        break;
      case "activity-feed-nav-link":
        navLink.src = activityFeedSelected;
        break;
      case "profile-pic-nav-link":
        navLink.classList.add("bordered");
        break;
      default:
    }
  }

  return (
    <div className="nav-links">
      <img src={homeSelected} alt="" className="nav-link" id="home-nav-link" />
      <img
        src={messengerUnselected}
        alt=""
        className="nav-link"
        id="messenger-nav-link"
      />
      <img
        src={newPostUnselected}
        alt=""
        className="nav-link"
        id="new-post-nav-link"
        onClick={handleNewPostNavLinkClicked}
      />
      <img
        src={findPeopleUnselected}
        alt=""
        className="nav-link"
        id="find-people-nav-link"
      />
      <img
        src={activityFeedUnselected}
        alt=""
        className="nav-link"
        id="activity-feed-nav-link"
        onClick={handleActivityFeedNavLinkClicked}
      />
      <img
        src={placeholderProfilePic}
        alt=""
        className="nav-link"
        id="profile-pic-nav-link"
        onClick={handleProfilePicNavLinkClicked}
      />
      <NewPostPopup
        cancelPopup={() => {
          cancelPopup();
          selectNavLink(lastSelected);
        }}
      />
      <ActivityFeedPopup
        cancelPopup={() => {
          cancelPopup();
          selectNavLink(lastSelected);
        }}
      />
      <ProfilePicPopup
        cancelPopup={() => {
          cancelPopup();
          selectNavLink(lastSelected);
        }}
      />
    </div>
  );
}

function handleNewPostNavLinkClicked() {
  const newPostPopup = document.querySelector(".new-post-popup");
  newPostPopup.classList.remove("hidden");
}

function handleActivityFeedNavLinkClicked() {
  const activityFeedPopup = document.querySelector(".activity-feed-popup");
  activityFeedPopup.classList.remove("hidden");
}

function handleProfilePicNavLinkClicked() {
  const profilePicPopup = document.querySelector(".profile-pic-popup");
  profilePicPopup.classList.remove("hidden");
}

export default NavLinks;
