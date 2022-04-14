/* eslint-disable react-hooks/exhaustive-deps */
import { MagnifyingGlass } from "phosphor-react";
import { useEffect, useRef, useState } from "react";
import "../styles/SearchBar.css";
import SearchBarPopup from "./SearchBarPopup";
import { collection, query, orderBy, getDocs, where } from "firebase/firestore";
import { db } from "../Firebase";

function SearchBar({ me, setMe }) {
  const [searchBarPopupShown, setSearchBarPopupShown] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const inputRef = useRef(null);

  useEffect(onLoad, []);

  useEffect(() => {
    if (inputValue.length >= 1) fetchSearchResults();
  }, [inputValue]);

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
      setInputValue("");
      cancelSearchBarPopup();
    }
  }

  function handleSearchBarClicked() {
    setSearchBarPopupShown(true);
  }

  function cancelSearchBarPopup() {
    setSearchBarPopupShown(false);
  }

  function handleInputChanged(e) {
    setInputValue(e.target.value);
  }

  function clearInput() {
    setInputValue("");
  }

  async function fetchSearchResults() {
    const usersRef = collection(db, "users");
    const q = query(
      usersRef,
      orderBy("username", "desc"),
      where("username", ">=", inputValue.toLowerCase()),
      where("username", "<=", inputValue.toLowerCase() + "\uf8ff")
    );
    const querySnapshot = await getDocs(q);
    let resultsArr = [];
    querySnapshot.forEach((doc) => {
      resultsArr.push(doc.data());
    });
    setSearchResults(resultsArr);
  }

  return (
    <div className="search-container">
      <input
        className="search-input"
        type="search"
        placeholder="Search"
        onClick={handleSearchBarClicked}
        onChange={(e) => handleInputChanged(e)}
        value={inputValue}
        ref={inputRef}
      />
      <MagnifyingGlass size={16} color="#898989" className="magnifying-glass" />
      <button type="button" className="clear-search-btn">
        ✕
      </button>
      {searchBarPopupShown ? (
        <SearchBarPopup
          cancelPopup={cancelSearchBarPopup}
          searchResults={searchResults}
          inputValue={inputValue}
          me={me}
          setMe={setMe}
          setSearchResults={setSearchResults}
          clearInput={clearInput}
        />
      ) : null}
    </div>
  );
}

export default SearchBar;
