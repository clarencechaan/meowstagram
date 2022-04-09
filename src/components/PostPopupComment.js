import "../styles/PostPopupComment.css";
import cat from "../images/cat.jpg";
import commentLike from "../images/comment-like.svg";
import commentLikeSelected from "../images/comment-like-selected.svg";
import { Link } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../Firebase";

function PostPopupComment({ cancelPopup, comment, post, setPost }) {
  const { user, text, likes, id } = comment;
  const liked = likes.includes("stc.official");

  function handleLikeClicked() {
    setPost((prevPost) => {
      let updatedLikes;
      if (!likes.includes("stc.official")) {
        updatedLikes = [...likes, "stc.official"];
      } else {
        const index = likes.indexOf("stc.official");
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

  async function uploadLike() {
    const postRef = doc(db, "posts", post.id);
    const postSnap = await getDoc(postRef);
    const index = postSnap
      .data()
      .comments.findIndex((comment) => comment.id === id);
    const oldComment = postSnap.data().comments[index];
    let updatedComment;
    if (!oldComment.likes.includes("stc.official")) {
      updatedComment = {
        ...oldComment,
        likes: [...oldComment.likes, "stc.official"],
      };
    } else {
      const index = oldComment.likes.indexOf("stc.official");
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
      <Link to="/profile">
        <img
          className="post-popup-comment-img"
          src={cat}
          alt=""
          onClick={cancelPopup}
        />
      </Link>
      <div className="post-popup-comment-author-stats-container">
        <div className="post-popup-comment-author">
          <Link to="/profile">
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
          <span className="post-popup-comment-time-ago">1d</span>
          <span className="post-popup-comment-likes-counter">
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
    </div>
  );
}

export default PostPopupComment;
