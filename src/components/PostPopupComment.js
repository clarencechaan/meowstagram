import "../styles/PostPopupComment.css";
import cat from "../images/cat.jpg";
import commentLike from "../images/comment-like.svg";
import commentLikeSelected from "../images/comment-like-selected.svg";
import { useState } from "react";
import { Link } from "react-router-dom";

function PostPopupComment({ cancelPopup }) {
  const [liked, setLiked] = useState(false);

  function handleLikeClicked() {
    setLiked((prevLiked) => !prevLiked);
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
              stc.official
            </span>
          </Link>
          <span className="post-popup-comment-author-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </span>
        </div>
        <div className="post-popup-comment-stats">
          <span className="post-popup-comment-time-ago">1d</span>
          <span className="post-popup-comment-likes-counter">38 likes</span>
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
