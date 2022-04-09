import "../styles/PostAddCommentBar.css";
import postAddCommentEmoji from "../images/post-emoji.svg";
import { useEffect, useRef, useState } from "react";
import Picker from "emoji-picker-react";
import { db } from "../Firebase";
import { updateDoc, doc, arrayUnion } from "firebase/firestore";
import { nanoid } from "nanoid";

let selectionStart;

function PostAddCommentsBar({ post, setPost, setMyComments, scrollToBottom }) {
  const [inputValue, setInputValue] = useState("");
  const [emojiPickerShown, setEmojiPickerShown] = useState(false);
  const addCommentInput = useRef(null);
  const emojiToggle = useRef(null);
  const id = nanoid();

  useEffect(() => {
    emojiToggle.current.addEventListener("click", () => {
      setEmojiPickerShown((prevEmojiPickerShown) => !prevEmojiPickerShown);
    });
  }, []);

  const onEmojiClick = (event, emojiObject) => {
    selectionStart = addCommentInput.current.selectionStart;
    addCommentInput.current.focus();
    setEmojiPickerShown(false);
    setInputValue((prevInputValue) => {
      return (
        prevInputValue.slice(0, selectionStart) +
        emojiObject.emoji +
        prevInputValue.slice(selectionStart)
      );
    });
  };

  function handleAddCommentInputChanged(e) {
    setInputValue(e.target.value);
  }

  function handlePostCommentBtnClicked() {
    uploadComment();
    const comment = {
      user: "stc.official",
      text: inputValue,
      id: id,
      likes: [],
    };
    setPost((prevPost) => ({
      ...prevPost,
      comments: [...prevPost.comments, comment],
    }));
    if (setMyComments)
      setMyComments((prevComments) => [...prevComments, comment]);
    if (scrollToBottom) scrollToBottom();
    setInputValue("");
  }

  async function uploadComment() {
    const postRef = doc(db, "posts", post.id);
    await updateDoc(postRef, {
      comments: arrayUnion({
        user: "stc.official",
        text: inputValue,
        id: id,
        likes: [],
      }),
    });
  }

  return (
    <form action="#">
      <div className="post-add-comment-bar">
        {emojiPickerShown ? (
          <>
            <Picker
              onEmojiClick={onEmojiClick}
              pickerStyle={{
                position: "absolute",
                bottom: "58px",
                zIndex: "1",
              }}
            />
            <div
              className="emoji-picker-wrapper"
              onClick={() => {
                setEmojiPickerShown(false);
              }}
            ></div>
          </>
        ) : null}
        <img
          className="post-add-comment-emoji"
          src={postAddCommentEmoji}
          alt=""
          ref={emojiToggle}
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
          <button
            className="post-add-comment-post-btn"
            onClick={handlePostCommentBtnClicked}
          >
            Post
          </button>
        )}
      </div>
    </form>
  );
}

export default PostAddCommentsBar;
