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
import { setPost, setPostLiked } from "../scripts/setPost";

function Post({ post, now, setHomeFeedPostsArr, me, setMe }) {
  const [postPopupShown, setPostPopupShown] = useState(false);
  const [postSaved, setPostSaved] = useState(false);
  const [myComments, setMyComments] = useState([]);
  const postLiked = post.likes.includes(me.username);

  function setHomeFeedPost(param) {
    setPost(param, setHomeFeedPostsArr, post);
  }

  function setHomeFeedPostLiked(param) {
    setPostLiked(param, setHomeFeedPostsArr, post, postLiked, me);
  }

  function cancelPostPopup() {
    setPostPopupShown(false);
    document.body.style.overflow = "auto";
  }

  function handleViewAllCommentsClicked() {
    setPostPopupShown(true);
    document.body.style.overflow = "hidden";
  }

  function commentsCountStr() {
    if (post.comments.length === 0) {
      return "No comments";
    } else if (post.comments.length === 1) {
      return "View 1 comment";
    } else {
      return `View all ${post.comments.length} comments`;
    }
  }

  return (
    <div className="post">
      <PostHeader
        cancelPostPopup={cancelPostPopup}
        authorUsername={post.user}
      />
      <img
        className="post-img"
        src={post.URL}
        alt=""
        referrerPolicy="no-referrer"
      />
      <PostButtonsBar
        setPostPopupShown={setPostPopupShown}
        postLiked={postLiked}
        postSaved={postSaved}
        setPostLiked={setHomeFeedPostLiked}
        setPostSaved={setPostSaved}
        post={post}
        setPost={setHomeFeedPost}
        me={me}
      />
      <PostLikesCounter
        likesCount={post.likes.length}
        likes={post.likes}
        me={me}
        setMe={setMe}
      />
      <div className="post-description">
        <div>
          <Link to="/profile">
            <span className="post-description-author-username">
              {post.user}
            </span>
          </Link>
          <span className="post-description-author-text">{post.caption}</span>
        </div>
        {myComments
          ? myComments.map((comment) => (
              <div key={comment.id}>
                <Link to="/profile">
                  <span className="post-description-author-username">
                    {comment.user}
                  </span>
                </Link>
                <span className="post-description-author-text">
                  {comment.text}
                </span>
              </div>
            ))
          : null}
        <div className="post-description-comment-counter">
          <span onClick={handleViewAllCommentsClicked}>
            {commentsCountStr()}
          </span>
        </div>
      </div>
      <PostTimeAgo timestamp={post.timestamp} now={now} />
      <PostAddCommentBar
        post={post}
        setPost={setHomeFeedPost}
        setMyComments={setMyComments}
        me={me}
      />
      {postPopupShown ? (
        <PostPopup
          cancelPopup={cancelPostPopup}
          postLiked={postLiked}
          postSaved={postSaved}
          setPostLiked={setHomeFeedPostLiked}
          setPostSaved={setPostSaved}
          post={post}
          setPost={setHomeFeedPost}
          now={now}
          me={me}
          setMe={setMe}
        />
      ) : null}
    </div>
  );
}

export default Post;
