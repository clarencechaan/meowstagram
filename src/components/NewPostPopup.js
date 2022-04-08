import "../styles/NewPostPopup.css";
import closeNewPostPopup from "../images/close-new-post-popup.svg";
import { useState } from "react";
import NewPostPopupUploader from "./NewPostPopupUploader";
import NewPostPopupPreview from "./NewPostPopupPreview";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../Firebase";

function NewPostPopup({ cancelPopup, setSelected, lastSelected }) {
  const [imgURL, setImgURL] = useState(null);
  const [caption, setCaption] = useState("");

  async function uploadPost() {
    try {
      const postRef = await addDoc(collection(db, "posts"), {
        user: "stc.official",
        caption: caption,
        URL: imgURL,
        timestamp: serverTimestamp(),
      });
      console.log("Document written with ID: ", postRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  function handleShareButtonClicked() {
    uploadPost();
    cancelPopup();
    setSelected(lastSelected);
  }

  return (
    <div
      className="new-post-popup"
      onClick={() => {
        cancelPopup();
        setSelected(lastSelected);
      }}
    >
      <img src={closeNewPostPopup} alt="" className="close-new-post-popup" />
      <div
        className={
          !imgURL ? "new-post-popup-window" : "new-post-popup-window preview"
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
          {imgURL ? (
            <button
              className="new-post-popup-preview-share-btn"
              onClick={handleShareButtonClicked}
            >
              Share
            </button>
          ) : null}
        </div>
        {!imgURL ? (
          <NewPostPopupUploader setImgURL={setImgURL} />
        ) : (
          <NewPostPopupPreview
            imgURL={imgURL}
            caption={caption}
            setCaption={setCaption}
          />
        )}
      </div>
    </div>
  );
}

export default NewPostPopup;
