import "../styles/PostAddCommentBar.css";
import postAddCommentEmoji from "../images/post-emoji.svg";
import { EmojiButton } from "@joeattardi/emoji-button";
import { useRef, useState } from "react";

let selectionStart;

function PostAddCommentsBar() {
  const [inputValue, setInputValue] = useState("");
  const addCommentInput = useRef(null);

  function handleAddCommentInputChanged(e) {
    setInputValue(e.target.value);
  }

  const emojiPicker = new EmojiButton({
    position: "top-start",
    emojiSize: "22px",
  });

  emojiPicker.on("emoji", (selection) => {
    selectionStart = addCommentInput.current.selectionStart;
    setInputValue((prevInputValue) => {
      return (
        prevInputValue.slice(0, selectionStart) +
        selection.emoji +
        prevInputValue.slice(selectionStart)
      );
    });
  });

  emojiPicker.on("hidden", () => {
    addCommentInput.current.focus();
  });

  return (
    <div className="post-add-comment-bar">
      <img
        className="post-add-comment-emoji"
        src={postAddCommentEmoji}
        alt=""
        onClick={(e) => {
          emojiPicker.togglePicker(e.target);
        }}
      />
      <input
        className="post-add-comment-input"
        type="text"
        placeholder="Add a comment..."
        onChange={(e) => handleAddCommentInputChanged(e)}
        value={inputValue}
        ref={addCommentInput}
      />
      {inputValue === "" ? (
        <button className="post-add-comment-post-btn disabled" disabled>
          Post
        </button>
      ) : (
        <button className="post-add-comment-post-btn">Post</button>
      )}
    </div>
  );
}

export default PostAddCommentsBar;
