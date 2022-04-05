import "../styles/NewPostPopup.css";
import mediaImportIcon from "../images/media-import-icon.svg";
import closeNewPostPopup from "../images/close-new-post-popup.svg";

function NewPostPopup({ cancelPopup, setSelected, lastSelected }) {
  return (
    <div
      className="new-post-popup hidden"
      onClick={() => {
        cancelPopup();
        setSelected(lastSelected);
      }}
    >
      <img src={closeNewPostPopup} alt="" className="close-new-post-popup" />
      <div
        className="new-post-popup-window"
        // prevent close on clicking
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="new-post-popup-window-header">Create new post</div>
        <div className="new-post-popup-window-content">
          <img src={mediaImportIcon} alt="" />
          <div className="media-import-label">Drag photos and videos here</div>
          <input type="file" id="file-input" className="hidden" />
          <label htmlFor="file-input" className="file-input-label">
            Select from computer
          </label>
        </div>
      </div>
    </div>
  );
}

export default NewPostPopup;
