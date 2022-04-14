import "../styles/SearchBarPopupItem.css";
import removeSearchBarPopupItem from "../images/remove-search-bar-popup-item.svg";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../Firebase";
import { Link } from "react-router-dom";

function SearchBarPopupItem({
  me,
  user,
  isRecent,
  setMe,
  cancelPopup,
  setRecentSearches,
  clearInput,
}) {
  const meRef = doc(db, "users", me.username);

  async function uploadRecentSearch() {
    await updateDoc(meRef, {
      recentSearches: arrayUnion(user.username),
    });
  }

  function handleSearchItemClicked() {
    clearInput();
    if (me.recentSearches.includes(user.username)) return;
    setMe((prevMe) => ({
      ...prevMe,
      recentSearches: [...prevMe.recentSearches, user.username],
    }));
    uploadRecentSearch();
  }

  async function removeRecentItem(e) {
    e.stopPropagation();
    e.preventDefault();
    if (!me.recentSearches.includes(user.username)) return;
    setMe((prevMe) => {
      const index = me.recentSearches.indexOf(user.username);
      return {
        ...prevMe,
        recentSearches: [
          ...prevMe.recentSearches.slice(0, index),
          ...prevMe.recentSearches.slice(index + 1),
        ],
      };
    });
    setRecentSearches((prevRecents) => {
      const index = prevRecents.findIndex(
        (recent) => recent.username === user.username
      );
      return [...prevRecents.slice(0, index), ...prevRecents.slice(index + 1)];
    });
    await updateDoc(meRef, {
      recentSearches: arrayRemove(user.username),
    });
  }

  return (
    <Link to={"/profile/" + user.username} onClick={cancelPopup}>
      <button
        className="search-bar-popup-window-item"
        onClick={!isRecent ? handleSearchItemClicked : () => {}}
      >
        <img src={user.imgURL} alt="" className="search-bar-popup-item-img" />
        <div>
          <div className="search-bar-popup-item-username">{user.username}</div>
          <div className="search-bar-popup-item-fullname">{user.fullname}</div>
        </div>
        {isRecent ? (
          <img
            src={removeSearchBarPopupItem}
            alt=""
            className="remove-search-bar-popup-item"
            onClick={(e) => {
              removeRecentItem(e);
            }}
          />
        ) : null}
      </button>
    </Link>
  );
}

export default SearchBarPopupItem;
