import "../styles/NewPostPopupUploader.css";
import mediaImportIcon from "../images/media-import-icon.svg";
import ProgressBar from "./ProgressBar";
import { useState } from "react";

function uploadImage(file) {
   

  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Client-ID ${CLIENT_ID}`);

  let formdata = new FormData();
  formdata.append("image", file);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  return fetch("https://api.imgur.com/3/image", requestOptions)
    .then((response) => response.text())
    .then((result) => JSON.parse(result).data.link)
    .catch((error) => console.log("error", error));
}

function NewPostPopupUploader({ setImgURL }) {
  const [loading, setLoading] = useState(false);

  function handleImagePicked(e) {
    uploadImage(e.target.files[0]).then((result) => setImgURL(result));
    setLoading(true);
  }

  return (
    <div className="new-post-popup-uploader">
      {loading ? <ProgressBar /> : null}
      <img src={mediaImportIcon} alt="" />
      <div className="media-import-label">Drag photos and videos here</div>
      <input
        type="file"
        id="file-input"
        className="hidden"
        accept="image/png, image/jpeg"
        onChange={(e) => {
          handleImagePicked(e);
        }}
        max-file-size="10485760"
      />
      <label htmlFor="file-input" className="file-input-label">
        Select from computer
      </label>
    </div>
  );
}

export default NewPostPopupUploader;
