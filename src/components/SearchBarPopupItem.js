import "../styles/SearchBarPopupItem.css";
import cat from "../images/cat.jpg";
import removeSearchBarPopupItem from "../images/remove-search-bar-popup-item.svg";

function SearchBarPopupItem() {
  return (
    <button className="search-bar-popup-window-item">
      <img src={cat} alt="" className="search-bar-popup-item-img" />
      <div>
        <div className="search-bar-popup-item-username">stc.offical</div>
        <div className="search-bar-popup-item-fullname">Sushi the Cat</div>
      </div>
      <img
        src={removeSearchBarPopupItem}
        alt=""
        className="remove-search-bar-popup-item"
      />
    </button>
  );
}

export default SearchBarPopupItem;
