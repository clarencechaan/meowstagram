import "../styles/NewPostPopupUploader.css";
import mediaImportIcon from "../images/media-import-icon.svg";

function NewPostPopupUploader() {
  return (
    <div className="new-post-popup-uploader">
      <img src={mediaImportIcon} alt="" />
      <div className="media-import-label">Drag photos and videos here</div>
      <input type="file" id="file-input" className="hidden" />
      <label htmlFor="file-input" className="file-input-label">
        Select from computer
      </label>
    </div>
  );
}

export default NewPostPopupUploader;
