import "../styles/NewPostPopupPreview.css";
import catPost from "../images/cat-post.jpeg";
import cat from "../images/cat.jpg";
import { useRef, useState } from "react";
import Picker from "emoji-picker-react";

let selectionStart;

function NewPostPopupPreview() {
  const [textareaValue, setTextareaValue] = useState("");
  const captionTextarea = useRef(null);

  const onEmojiClick = (event, emojiObject) => {
    selectionStart = captionTextarea.current.selectionStart;
    captionTextarea.current.focus();
    setTextareaValue((prevTextareaValue) => {
      return (
        prevTextareaValue.slice(0, selectionStart) +
        emojiObject.emoji +
        prevTextareaValue.slice(selectionStart)
      );
    });
  };

  function handleCaptionTextareaChanged(e) {
    setTextareaValue(e.target.value);
  }

  return (
    <div className="new-post-popup-preview">
      <img className="new-post-popup-preview-img" src={catPost} alt="" />
      <div className="new-post-popup-preview-caption-container">
        <div className="new-post-popup-preview-user-bar">
          <img className="new-post-popup-preview-user-img" src={cat} alt="" />
          <div className="new-post-popup-preview-username">stc.official</div>
        </div>
        <textarea
          name="caption-textarea"
          id="caption-textarea"
          placeholder="Write a caption..."
          value={textareaValue}
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
