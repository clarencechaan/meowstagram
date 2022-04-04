import { MagnifyingGlass } from "phosphor-react";
import { useEffect } from "react";
import "../styles/SearchBar.css";
import SearchBarPopup from "./SearchBarPopup";

function SearchBar({ cancelPopup }) {
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
      cancelPopup();
    }
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
      <SearchBarPopup cancelPopup={cancelPopup} />
    </div>
  );
}

function handleSearchBarClicked() {
  const searchBarPopup = document.querySelector(".search-bar-popup");
  searchBarPopup.classList.remove("hidden");
}

export default SearchBar;
