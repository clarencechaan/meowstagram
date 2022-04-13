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
import "../styles/NavLinks.css";
import NewPostPopup from "./NewPostPopup";
import ActivityFeedPopup from "./ActivityFeedPopup";
import ProfilePicPopup from "./ProfilePicPopup";
import { Link } from "react-router-dom";
import { useState } from "react";

function NavLinks({
  selected,
  setSelected,
  lastSelected,
  setLastSelected,
  setHomeFeedPostsArr,
  me,
  setMe,
}) {
  const [newPostPopupShown, setNewPostPopupShown] = useState(false);
  const [activityFeedPopupShown, setActivityFeedPopupShown] = useState(false);
  const [profilePicPopupShown, setProfilePicPopupShown] = useState(false);

  function handleNewPostNavLinkClicked() {
    setNewPostPopupShown(true);
    document.body.style.overflow = "hidden";
    setSelected("new-post");
  }

  function handleActivityFeedNavLinkClicked() {
    setActivityFeedPopupShown(true);
    setSelected("activity-feed");
  }

  function handleProfilePicNavLinkClicked() {
    setProfilePicPopupShown(true);
    setSelected("profile-pic");
  }

  function cancelNewPostPopup() {
    setNewPostPopupShown(false);
    document.body.style.overflow = "auto";
  }

  return (
    <div className="nav-links">
      <Link to="/" className="nav-link">
        <img
          src={selected === "home" ? homeSelected : homeUnselected}
          alt=""
          id="home-nav-link"
        />
      </Link>
      <Link to="/inbox" className="nav-link">
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
      <Link to="/explore" className="nav-link">
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
        src={me.imgURL}
        alt=""
        className={
          selected === "profile-pic" ? "nav-link bordered" : "nav-link"
        }
        id="profile-pic-nav-link"
        onClick={handleProfilePicNavLinkClicked}
      />
      {newPostPopupShown ? (
        <NewPostPopup
          cancelPopup={cancelNewPostPopup}
          setSelected={setSelected}
          lastSelected={lastSelected}
          setHomeFeedPostsArr={setHomeFeedPostsArr}
          me={me}
        />
      ) : null}
      {activityFeedPopupShown ? (
        <ActivityFeedPopup
          cancelPopup={() => setActivityFeedPopupShown(false)}
          setSelected={setSelected}
          lastSelected={lastSelected}
          feed={me.activityFeed}
          me={me}
          setMe={setMe}
        />
      ) : null}
      {profilePicPopupShown ? (
        <ProfilePicPopup
          cancelPopup={() => setProfilePicPopupShown(false)}
          setSelected={setSelected}
          lastSelected={lastSelected}
          setLastSelected={setLastSelected}
          me={me}
          setMe={setMe}
        />
      ) : null}
    </div>
  );
}

export default NavLinks;
