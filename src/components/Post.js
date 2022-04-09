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

function Post({ post, now, setHomeFeedPostsArr }) {
  const [postPopupShown, setPostPopupShown] = useState(false);
  const [postSaved, setPostSaved] = useState(false);
  const [myComments, setMyComments] = useState([]);
  const postLiked = post.likes.includes("stc.official");

  function setPost(param) {
    setHomeFeedPostsArr((prevPostsArr) => {
      let updatedPost;
      if (typeof param === "function") {
        updatedPost = param(post);
      } else {
        updatedPost = param;
      }
      const index = prevPostsArr.indexOf(post);
      return [
        ...prevPostsArr.slice(0, index),
        updatedPost,
        ...prevPostsArr.slice(index + 1),
      ];
    });
  }

  function setPostLiked(param) {
    setHomeFeedPostsArr((prevPostsArr) => {
      let updatedPostLiked;
      if (typeof param === "function") {
        updatedPostLiked = param(postLiked);
      } else {
        updatedPostLiked = param;
      }
      let updatedPost;
      if (updatedPostLiked) {
        updatedPost = { ...post, likes: [...post.likes, "stc.official"] };
      } else {
        const index = post.likes.indexOf("stc.official");
        updatedPost = {
          ...post,
          likes: [
            ...post.likes.slice(0, index),
            ...post.likes.slice(index + 1),
          ],
        };
      }
      const index = prevPostsArr.indexOf(post);
      return [
        ...prevPostsArr.slice(0, index),
        updatedPost,
        ...prevPostsArr.slice(index + 1),
      ];
    });
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
      <PostHeader cancelPostPopup={cancelPostPopup} />
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
        setPostLiked={setPostLiked}
        setPostSaved={setPostSaved}
        post={post}
        setPost={setPost}
      />
      <PostLikesCounter likesCount={post.likes.length} />
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
        setPost={setPost}
        setMyComments={setMyComments}
      />
      {postPopupShown ? (
        <PostPopup
          cancelPopup={cancelPostPopup}
          postLiked={postLiked}
          postSaved={postSaved}
          setPostLiked={setPostLiked}
          setPostSaved={setPostSaved}
          post={post}
          setPost={setPost}
          now={now}
        />
      ) : null}
    </div>
  );
}

export default Post;
