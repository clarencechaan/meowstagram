import "../styles/NewPostPopupPreview.css";
import { useEffect, useRef } from "react";
import Picker from "emoji-picker-react";

let selectionStart;

function NewPostPopupPreview({ imgURL, caption, setCaption, me }) {
  const captionTextarea = useRef(null);

  useEffect(() => captionTextarea.current.focus(), []);

  const onEmojiClick = (event, emojiObject) => {
    selectionStart = captionTextarea.current.selectionStart;
    captionTextarea.current.focus();
    setCaption((prevCaption) => {
      return (
        prevCaption.slice(0, selectionStart) +
        emojiObject.emoji +
        prevCaption.slice(selectionStart)
      );
    });
  };

  function handleCaptionTextareaChanged(e) {
    setCaption(e.target.value);
  }

  return (
    <div className="new-post-popup-preview">
      <img
        className="new-post-popup-preview-img"
        src={imgURL}
        alt=""
        referrerPolicy="no-referrer"
      />
      <div className="new-post-popup-preview-caption-container">
        <div className="new-post-popup-preview-user-bar">
          <img
            className="new-post-popup-preview-user-img"
            src={me.imgURL}
            alt=""
          />
          <div className="new-post-popup-preview-username">{me.username}</div>
        </div>
        <textarea
          name="caption-textarea"
          id="caption-textarea"
          placeholder="Write a caption..."
          value={caption}
          ref={captionTextarea}
          onChange={(e) => handleCaptionTextareaChanged(e)}
        ></textarea>
        <div className="emoji-picker-container">
          <Picker
            onEmojiClick={onEmojiClick}
            pickerStyle={{
              width: "100%",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default NewPostPopupPreview;
