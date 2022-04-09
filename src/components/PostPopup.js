import "../styles/PostPopup.css";
import PostHeader from "./PostHeader";
import PostButtonsBar from "./PostButtonsBar";
import PostAddCommentBar from "./PostAddCommentBar";
import PostLikesCounter from "./PostLikesCounter";
import PostTimeAgo from "./PostTimeAgo";
import cat from "../images/cat.jpg";
import PostPopupComment from "./PostPopupComment";
import { Link } from "react-router-dom";
import { useRef } from "react";

function PostPopup({
  cancelPopup,
  postLiked,
  postSaved,
  setPostLiked,
  setPostSaved,
  post,
  now,
  setPost,
}) {
  const { URL, caption, timestamp, user, comments, likes } = post;
  const messagesEndRef = useRef(null);
  function scrollToBottom() {
    setTimeout(
      () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }),
      1
    );
  }

  return (
    <div
      className="post-popup"
      onClick={() => {
        cancelPopup();
      }}
    >
      <div
        className="post-popup-window"
        // prevent close on clicking
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <img className="post-popup-window-img" src={URL} alt="" />
        <div className="post-popup-window-sidebar">
          <PostHeader cancelPopup={cancelPopup} />
          <div className="post-popup-window-comments">
            <div className="post-popup-window-comments-description">
              <img
                className="post-popup-window-comments-author-img"
                src={cat}
                alt=""
              />
              <div>
                <div className="post-popup-window-comments-author">
                  <Link to="/profile">
                    <span className="post-popup-window-comments-author-username">
                      {user}
                    </span>
                  </Link>
                  <span className="post-popup-window-comments-author-text">
                    {caption}
                  </span>
                </div>
                <div className="post-popup-window-comments-description-time-ago">
                  1d
                </div>
              </div>
            </div>
            {comments.map((comment) => (
              <PostPopupComment
                cancelPopup={cancelPopup}
                comment={comment}
                key={comment.id}
                post={post}
                setPost={setPost}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
          <PostButtonsBar
            postLiked={postLiked}
            postSaved={postSaved}
            setPostLiked={setPostLiked}
            setPostSaved={setPostSaved}
            setPostPopupShown={() => {}}
            setPost={setPost}
            post={post}
          />
          <PostLikesCounter likesCount={likes.length} />
          <PostTimeAgo timestamp={timestamp} now={now} />
          <PostAddCommentBar
            post={post}
            setPost={setPost}
            scrollToBottom={scrollToBottom}
          />
        </div>
      </div>
    </div>
  );
}

export default PostPopup;
