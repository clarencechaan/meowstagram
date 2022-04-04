import "../styles/SearchBarPopup.css";
import SearchBarPopupItem from "./SearchBarPopupItem";

function SearchBarPopup({ cancelPopup }) {
  return (
    <div className="search-bar-popup hidden" onClick={cancelPopup}>
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
            <div className="search-bar-popup-window-title">Recent</div>
            <div className="search-bar-popup-window-clear-all">Clear All</div>
          </div>
          <div className="search-bar-popup-window-content">
            <SearchBarPopupItem />
            <SearchBarPopupItem />
            <SearchBarPopupItem />
            <SearchBarPopupItem />
            <SearchBarPopupItem />
            <SearchBarPopupItem />
            <SearchBarPopupItem />
            <SearchBarPopupItem />
            <SearchBarPopupItem />
            <SearchBarPopupItem />
            <SearchBarPopupItem />
            <SearchBarPopupItem />
            <SearchBarPopupItem />
            <SearchBarPopupItem />
            <SearchBarPopupItem />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBarPopup;
