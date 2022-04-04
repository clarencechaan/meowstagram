import "../styles/NavBar.css";
import SearchBar from "./SearchBar";
import NavLinks from "./NavLinks";

function NavBar() {
  return (
    <div className="NavBar">
      <div className="navbar-content">
        <div className="logo">Outstagram</div>
        <SearchBar cancelPopup={cancelPopup} />
        <NavLinks cancelPopup={cancelPopup} />
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
