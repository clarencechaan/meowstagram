/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import "../styles/SearchBarPopup.css";
import SearchBarPopupItem from "./SearchBarPopupItem";
import { useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase";

function SearchBarPopup({
  cancelPopup,
  searchResults,
  inputValue,
  me,
  setMe,
  clearInput,
}) {
  const recentSearchUsernames = me.recentSearches;
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    fetchRecentSearches();
  }, []);

  async function fetchRecentSearches() {
    let recentArr = [];
    for (const username of recentSearchUsernames) {
      const userRef = doc(db, "users", username);
      const userSnap = await getDoc(userRef);
      recentArr.push(userSnap.data());
    }
    setRecentSearches(recentArr);
  }

  async function clearRecentSearches() {
    setMe((prevMe) => ({ ...prevMe, recentSearches: [] }));
    setRecentSearches([]);
    const meRef = doc(db, "users", me.username);
    await updateDoc(meRef, {
      recentSearches: [],
    });
  }

  return (
    <div className="search-bar-popup" onClick={cancelPopup}>
      <div
        className="search-bar-popup-window"
        // prevent close on clicking
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="search-bar-popup-window-triangle"></div>
        {/* hides triangle bottom shadow */}
        <div className="search-bar-popup-window-overlay">
          <div className="search-bar-popup-window-header">
            <div className="search-bar-popup-window-title">
              {!inputValue ? "Recent" : "Search Results"}
            </div>

            {!inputValue ? (
              <div
                className="search-bar-popup-window-clear-all"
                onClick={clearRecentSearches}
              >
                Clear All
              </div>
            ) : null}
          </div>
          <div className="search-bar-popup-window-content">
            {inputValue && searchResults.length >= 1
              ? searchResults.map((user) => (
                  <SearchBarPopupItem
                    me={me}
                    user={user}
                    key={user.username}
                    setMe={setMe}
                    cancelPopup={cancelPopup}
                    clearInput={clearInput}
                  />
                ))
              : null}
            {inputValue && searchResults.length === 0 ? (
              <div className="search-bar-popup-no-results">
                No results found.
              </div>
            ) : null}
            {!inputValue && recentSearches.length >= 1
              ? recentSearches.map((user) => (
                  <SearchBarPopupItem
                    me={me}
                    user={user}
                    isRecent={true}
                    key={user.username}
                    setMe={setMe}
                    cancelPopup={cancelPopup}
                    setRecentSearches={setRecentSearches}
                    clearInput={clearInput}
                  />
                ))
              : null}
            {!inputValue && recentSearches.length === 0 ? (
              <div className="search-bar-popup-no-recents">
                No recent searches.
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBarPopup;
