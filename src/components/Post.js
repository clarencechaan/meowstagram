/* eslint-disable react-hooks/exhaustive-deps */
import "../styles/Post.css";
import { useState } from "react";
import React from "react";
import PostPopup from "./PostPopup";
import PostButtonsBar from "./PostButtonsBar";
import PostHeader from "./PostHeader";
import PostAddCommentBar from "./PostAddCommentBar";
import PostLikesCounter from "./PostLikesCounter";
import PostTimeAgo from "./PostTimeAgo";
import { Link } from "react-router-dom";

function Post({ post, now }) {
  const { URL, caption, timestamp, user } = post;
  const [postPopupShown, setPostPopupShown] = useState(false);
  const [postLiked, setPostLiked] = useState(false);
  const [postSaved, setPostSaved] = useState(false);

  function cancelPostPopup() {
    setPostPopupShown(false);
    document.body.style.overflow = "auto";
  }

  function handleViewAllCommentsClicked() {
    setPostPopupShown(true);
    document.body.style.overflow = "hidden";
  }

  return (
    <div className="post">
      <PostHeader cancelPostPopup={cancelPostPopup} />
      <img className="post-img" src={URL} alt="" />
      <PostButtonsBar
        setPostPopupShown={setPostPopupShown}
        postLiked={postLiked}
        postSaved={postSaved}
        setPostLiked={setPostLiked}
        setPostSaved={setPostSaved}
      />
      <PostLikesCounter />
      <div className="post-description">
        <div>
          <Link to="/profile">
            <span className="post-description-author-username">{user}</span>
          </Link>
          <span className="post-description-author-text">{caption}</span>
        </div>
        <div className="post-description-comment-counter">
          <span onClick={handleViewAllCommentsClicked}>
            View all 3,157 comments
          </span>
        </div>
      </div>
      <PostTimeAgo timestamp={timestamp} now={now} />
      <PostAddCommentBar />
      {postPopupShown ? (
        <PostPopup
          cancelPopup={cancelPostPopup}
          postLiked={postLiked}
          postSaved={postSaved}
          setPostLiked={setPostLiked}
          setPostSaved={setPostSaved}
          post={post}
        />
      ) : null}
    </div>
  );
}

export default Post;
