/* eslint-disable react-hooks/exhaustive-deps */
import "../styles/PostPopupComment.css";
import commentLike from "../images/comment-like.svg";
import commentLikeSelected from "../images/comment-like-selected.svg";
import { Link } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../Firebase";
import { useEffect, useState } from "react";
import LikesPopup from "./LikesPopup";
import { getTimeAgoShort } from "../scripts/timeConversion";

function PostPopupComment({
  cancelPopup,
  comment,
  post,
  setPost,
  me,
  now,
  setMe,
  cancelPostPopup,
}) {
  const { user, text, likes, id, timestamp } = comment;
  const [author, setAuthor] = useState({});
  const [likesPopupShown, setLikesPopupShown] = useState(false);
  const liked = likes.includes(me.username);

  useEffect(() => {
    fetchAuthor();
  }, []);

  function handleLikeClicked() {
    setPost((prevPost) => {
      let updatedLikes;
      if (!likes.includes(me.username)) {
        updatedLikes = [...likes, me.username];
      } else {
        const index = likes.indexOf(me.username);
        updatedLikes = [...likes.slice(0, index), ...likes.slice(index + 1)];
      }
      const updatedComment = { ...comment, likes: updatedLikes };
      const index = post.comments.indexOf(comment);
      return {
        ...prevPost,
        comments: [
          ...prevPost.comments.slice(0, index),
          updatedComment,
          ...prevPost.comments.slice(index + 1),
        ],
      };
    });
    uploadLike();
  }

  function cancelLikesPopup() {
    setLikesPopupShown(false);
  }

  function handleLikeCounterClicked() {
    setLikesPopupShown(true);
  }

  async function fetchAuthor() {
    const userRef = doc(db, "users", user);
    const userSnap = await getDoc(userRef);
    setAuthor(userSnap.data());
  }

  async function uploadLike() {
    const postRef = doc(db, "posts", post.id);
    const postSnap = await getDoc(postRef);
    const index = postSnap
      .data()
      .comments.findIndex((comment) => comment.id === id);
    const oldComment = postSnap.data().comments[index];
    let updatedComment;
    if (!oldComment.likes.includes(me.username)) {
      updatedComment = {
        ...oldComment,
        likes: [...oldComment.likes, me.username],
      };
    } else {
      const index = oldComment.likes.indexOf(me.username);
      updatedComment = {
        ...oldComment,
        likes: [
          ...oldComment.likes.slice(0, index),
          ...oldComment.likes.slice(index + 1),
        ],
      };
    }
    const oldCommentsArr = postSnap.data().comments;
    const updatedCommentsArr = [
      ...oldCommentsArr.slice(0, index),
      updatedComment,
      ...oldCommentsArr.slice(index + 1),
    ];
    await setDoc(postRef, { ...postSnap.data(), comments: updatedCommentsArr });
  }

  function getLikesCountStr() {
    if (comment.likes.length === 0) {
      return "";
    } else if (comment.likes.length === 1) {
      return "1 like";
    } else {
      return `${comment.likes.length} likes`;
    }
  }

  return (
    <div className="post-popup-comment">
      <Link to={"/profile/" + user}>
        <img
          className="post-popup-comment-img"
          src={author.imgURL}
          alt=""
          onClick={cancelPopup}
        />
      </Link>
      <div className="post-popup-comment-author-stats-container">
        <div className="post-popup-comment-author">
          <Link to={"/profile/" + user}>
            <span
              className="post-popup-comment-author-username"
              onClick={cancelPopup}
            >
              {user}
            </span>
          </Link>
          <span className="post-popup-comment-author-text">{text}</span>
        </div>
        <div className="post-popup-comment-stats">
          <span className="post-popup-comment-time-ago">
            {getTimeAgoShort(timestamp, now)}
          </span>
          <span
            className="post-popup-comment-likes-counter"
            onClick={handleLikeCounterClicked}
          >
            {getLikesCountStr()}
          </span>
        </div>
      </div>
      <div className="post-popup-comment-like-btn-container">
        <img
          className={
            liked
              ? "post-popup-comment-like-btn selected"
              : "post-popup-comment-like-btn"
          }
          src={liked ? commentLikeSelected : commentLike}
          alt=""
          onClick={handleLikeClicked}
        />
      </div>
      {likesPopupShown ? (
        <LikesPopup
          cancelPopup={cancelLikesPopup}
          likes={comment.likes}
          me={me}
          setMe={setMe}
          cancelPostPopup={cancelPostPopup}
        />
      ) : null}
    </div>
  );
}

export default PostPopupComment;
