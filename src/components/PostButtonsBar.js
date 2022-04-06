import postLike from "../images/post-like.svg";
import postLikeSelected from "../images/post-like-selected.svg";
import postComment from "../images/post-comment.svg";
import postShare from "../images/post-share.svg";
import postSave from "../images/post-save.svg";
import postSaveSelected from "../images/post-save-selected.svg";
import "../styles/PostButtonsBar.css";
import SharePostPopup from "./SharePostPopup";
import { useState } from "react";

function PostButtonsBar({
  setPostPopupShown,
  postLiked,
  postSaved,
  setPostLiked,
  setPostSaved,
}) {
  const [sharePostPopupShown, setSharePostPopupShown] = useState(false);

  function cancelSharePostPopup() {
    setSharePostPopupShown(false);
    document.body.style.overflow = "auto";
  }

  function handleCommentBtnClicked() {
    setPostPopupShown(true);
    document.body.style.overflow = "hidden";
  }

  function handleLikeClicked() {
    setPostLiked((prevPostLiked) => !prevPostLiked);
  }

  function handleSaveClicked() {
    setPostSaved((prevPostSaved) => !prevPostSaved);
  }

  function handleShareButtonClicked() {
    setSharePostPopupShown(true);
    document.body.style.overflow = "hidden";
  }

  return (
    <div className="post-buttons-bar">
      <img
        className={postLiked ? "post-like selected" : "post-like"}
        src={postLiked ? postLikeSelected : postLike}
        alt=""
        onClick={handleLikeClicked}
      />
      <img
        className="post-comment"
        src={postComment}
        alt=""
        onClick={handleCommentBtnClicked}
      />
      <img
        className="post-share"
        src={postShare}
        alt=""
        onClick={handleShareButtonClicked}
      />
      <img
        className={postSaved ? "post-save selected" : "post-save"}
        src={postSaved ? postSaveSelected : postSave}
        alt=""
        onClick={handleSaveClicked}
      />
      {sharePostPopupShown ? (
        <SharePostPopup cancelPopup={cancelSharePostPopup} />
      ) : null}
    </div>
  );
}

export default PostButtonsBar;
