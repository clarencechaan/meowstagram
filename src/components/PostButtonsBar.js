/* eslint-disable react-hooks/exhaustive-deps */
import postLike from "../images/post-like.svg";
import postLikeSelected from "../images/post-like-selected.svg";
import postComment from "../images/post-comment.svg";
import postShare from "../images/post-share.svg";
import postSave from "../images/post-save.svg";
import postSaveSelected from "../images/post-save-selected.svg";
import "../styles/PostButtonsBar.css";
import SharePostPopup from "./SharePostPopup";
import { useState } from "react";
import { updateDoc, arrayUnion, doc, arrayRemove } from "firebase/firestore";
import { db } from "../Firebase";

function PostButtonsBar({
  setPostPopupShown,
  postLiked,
  postSaved,
  setPostLiked,
  post,
  me,
  setMe,
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

  async function handleLikeClicked() {
    const postRef = doc(db, "posts", post.id);
    if (!postLiked) {
      await updateDoc(postRef, {
        likes: arrayUnion(me.username),
      });
    } else {
      await updateDoc(postRef, {
        likes: arrayRemove(me.username),
      });
    }
    setPostLiked((prevPostLiked) => !prevPostLiked);
  }

  async function handleSaveClicked() {
    const meRef = doc(db, "users", me.username);
    if (!postSaved) {
      await updateDoc(meRef, { saved: arrayUnion(post.id) });
      setMe((prevMe) => ({ ...prevMe, saved: [...prevMe.saved, post.id] }));
    } else {
      await updateDoc(meRef, { saved: arrayRemove(post.id) });
      setMe((prevMe) => {
        const index = prevMe.saved.indexOf(post.id);
        return {
          ...prevMe,
          saved: [
            ...prevMe.saved.slice(0, index),
            ...prevMe.saved.slice(index + 1),
          ],
        };
      });
    }
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
      {setPostPopupShown ? (
        <img
          className="post-comment"
          src={postComment}
          alt=""
          onClick={handleCommentBtnClicked}
        />
      ) : null}
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
