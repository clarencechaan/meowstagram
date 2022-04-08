/* eslint-disable react-hooks/exhaustive-deps */
import { MagnifyingGlass } from "phosphor-react";
import { useEffect, useState } from "react";
import "../styles/SearchBar.css";
import SearchBarPopup from "./SearchBarPopup";

function SearchBar() {
  const [searchBarPopupShown, setSearchBarPopupShown] = useState(false);

  useEffect(onLoad, []);

  function onLoad() {
    const searchInput = document.querySelector(".search-input");
    const magnifyingGlass = document.querySelector(".magnifying-glass");
    const clearSearchBtn = document.querySelector(".clear-search-btn");
    searchInput.addEventListener("focus", searchBarFocused);
    searchInput.addEventListener("focusout", searchBarUnfocused);
    clearSearchBtn.addEventListener("mousedown", clearSearchBtnClicked);

    function searchBarFocused() {
      magnifyingGlass.style.display = "none";
      searchInput.style.paddingLeft = "16px";
      searchInput.style.color = "black";
      searchInput.select();
      clearSearchBtn.style.display = "flex";
    }

    function searchBarUnfocused() {
      magnifyingGlass.style.display = "flex";
      searchInput.style.paddingLeft = "48px";
      searchInput.style.color = "rgb(137, 137, 137)";
      clearSearchBtn.style.display = "none";
    }

    function clearSearchBtnClicked() {
      searchInput.value = "";
      cancelSearchBarPopup();
    }
  }

  function handleSearchBarClicked() {
    setSearchBarPopupShown(true);
  }

  function cancelSearchBarPopup() {
    setSearchBarPopupShown(false);
  }

  return (
    <div className="search-container">
      <input
        className="search-input"
        type="search"
        placeholder="Search"
        onClick={handleSearchBarClicked}
      />
      <MagnifyingGlass size={16} color="#898989" className="magnifying-glass" />
      <button type="button" className="clear-search-btn">
        ✕
      </button>
      {searchBarPopupShown ? (
        <SearchBarPopup cancelPopup={cancelSearchBarPopup} />
      ) : null}
    </div>
  );
}

export default SearchBar;
