/* eslint-disable react-hooks/exhaustive-deps */
import "../styles/Post.css";
import catPost from "../images/cat-post.jpeg";
import catProfile from "../images/cat.jpg";
import postHeaderMoreOptions from "../images/post-header-more-options.svg";
import postLike from "../images/post-like.svg";
import postLikeSelected from "../images/post-like-selected.svg";
import postComment from "../images/post-comment.svg";
import postShare from "../images/post-share.svg";
import postSave from "../images/post-save.svg";
import postSaveSelected from "../images/post-save-selected.svg";
import postAddCommentEmoji from "../images/post-emoji.svg";
import { useState, useRef } from "react";
import MoreOptionsPopup from "./MoreOptionsPopup";
import { EmojiButton } from "@joeattardi/emoji-button";
import React from "react";

function Post() {
  const [moreOptionsPopupShown, setMoreOptionsPopupShown] = useState(false);
  const [postLiked, setPostLiked] = useState(false);
  const [postSaved, setPostSaved] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const addCommentInput = useRef(null);

  function handleAddCommentInputChanged(e) {
    setInputValue(e.target.value);
  }

  function handleMoreOptionsClicked() {
    setMoreOptionsPopupShown(true);
  }

  function handleLikeClicked() {
    setPostLiked((prevPostLiked) => !prevPostLiked);
  }

  function handleSaveClicked() {
    setPostSaved((prevPostSaved) => !prevPostSaved);
  }

  function cancelPopup() {
    setMoreOptionsPopupShown(false);
  }

  const emojiPicker = new EmojiButton({
    position: "top-start",
    emojiSize: "22px",
  });

  emojiPicker.on("emoji", (selection) => {
    setInputValue((prevInputValue) => {
      return (
        prevInputValue.slice(0, addCommentInput.current.selectionStart) +
        selection.emoji +
        prevInputValue.slice(addCommentInput.current.selectionStart)
      );
    });
  });

  emojiPicker.on("hidden", () => {
    addCommentInput.current.focus();
  });

  return (
    <div className="post">
      <div className="post-header">
        <img className="post-header-img" src={catProfile} alt="" />
        <div className="post-header-username">stc.offical</div>
        <img
          className="post-header-more-options"
          src={postHeaderMoreOptions}
          alt=""
          onClick={handleMoreOptionsClicked}
        />
      </div>
      <img className="post-img" src={catPost} alt="" />
      <div className="post-buttons-bar">
        <img
          className={postLiked ? "post-like selected" : "post-like"}
          src={postLiked ? postLikeSelected : postLike}
          alt=""
          onClick={handleLikeClicked}
        />
        <img className="post-comment" src={postComment} alt="" />
        <img className="post-share" src={postShare} alt="" />
        <img
          className={postSaved ? "post-save selected" : "post-save"}
          src={postSaved ? postSaveSelected : postSave}
          alt=""
          onClick={handleSaveClicked}
        />
      </div>
      <div className="post-likes-counter">2,561 likes</div>
      <div className="post-description">
        <div>
          <span className="post-description-author-username">stc.official</span>
          <span className="post-description-author-text">
            I woke up like this.
          </span>
        </div>
        <div className="post-description-comment-counter">
          View all 3,157 comments
        </div>
        <div className="post-description-time">2 HOURS AGO</div>
      </div>
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
      {moreOptionsPopupShown ? (
        <MoreOptionsPopup cancelPopup={cancelPopup} />
      ) : null}
    </div>
  );
}

export default Post;
