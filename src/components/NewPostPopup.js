import "../styles/NewPostPopup.css";
import closeNewPostPopup from "../images/close-new-post-popup.svg";
import { useState } from "react";
import NewPostPopupUploader from "./NewPostPopupUploader";
import NewPostPopupPreview from "./NewPostPopupPreview";

function NewPostPopup({ cancelPopup, setSelected, lastSelected }) {
  const [fileUploaded, setFileUploaded] = useState(null);

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
        className={
          !fileUploaded
            ? "new-post-popup-window"
            : "new-post-popup-window preview"
        }
        // prevent close on clicking
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="new-post-popup-window-header">
          <span className="new-post-popup-window-header-title">
            Create new post
          </span>
          {fileUploaded ? (
            <button className="new-post-popup-preview-share-btn">Share</button>
          ) : null}
        </div>
        {!fileUploaded ? <NewPostPopupUploader /> : <NewPostPopupPreview />}
      </div>
    </div>
  );
}

export default NewPostPopup;
