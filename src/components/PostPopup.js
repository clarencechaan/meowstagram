/* eslint-disable react-hooks/exhaustive-deps */
import "../styles/PostPopup.css";
import PostHeader from "./PostHeader";
import PostButtonsBar from "./PostButtonsBar";
import PostAddCommentBar from "./PostAddCommentBar";
import PostLikesCounter from "./PostLikesCounter";
import PostTimeAgo from "./PostTimeAgo";
import PostPopupComment from "./PostPopupComment";
import { Link } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase";
import { getTimeAgoShort } from "../scripts/timeConversion";

function PostPopup({
  cancelPopup,
  postLiked,
  postSaved,
  setPostLiked,
  post,
  now,
  setPost,
  me,
  setMe,
  profileUser,
  setProfileUser,
}) {
  const { URL, caption, timestamp, user, comments, likes } = post;
  const messagesEndRef = useRef(null);
  const [author, setAuthor] = useState({});

  useEffect(() => {
    fetchAuthor();
  }, []);

  async function fetchAuthor() {
    const userRef = doc(db, "users", post.user);
    const userSnap = await getDoc(userRef);
    setAuthor(userSnap.data());
  }

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
          <PostHeader cancelPopup={cancelPopup} authorUsername={post.user} />
          <div className="post-popup-window-comments">
            <div className="post-popup-window-comments-description">
              <img
                className="post-popup-window-comments-author-img"
                src={author.imgURL}
                alt=""
              />
              <div>
                <div className="post-popup-window-comments-author">
                  <Link to={"/profile/" + post.user} onClick={cancelPopup}>
                    <span className="post-popup-window-comments-author-username">
                      {user}
                    </span>
                  </Link>
                  <span className="post-popup-window-comments-author-text">
                    {caption}
                  </span>
                </div>
                <div className="post-popup-window-comments-description-time-ago">
                  {getTimeAgoShort(timestamp.seconds, now)}
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
                me={me}
                now={now}
                setMe={setMe}
                cancelPostPopup={cancelPopup}
                profileUser={profileUser}
                setProfileUser={setProfileUser}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
          <PostButtonsBar
            postLiked={postLiked}
            postSaved={postSaved}
            setPostLiked={setPostLiked}
            setPostPopupShown={() => {}}
            setPost={setPost}
            post={post}
            me={me}
            setMe={setMe}
          />
          <PostLikesCounter
            likesCount={likes.length}
            likes={post.likes}
            me={me}
            setMe={setMe}
            cancelPostPopup={cancelPopup}
            profileUser={profileUser}
            setProfileUser={setProfileUser}
          />
          <PostTimeAgo timestamp={timestamp} now={now} />
          <PostAddCommentBar
            post={post}
            setPost={setPost}
            scrollToBottom={scrollToBottom}
            me={me}
          />
        </div>
      </div>
    </div>
  );
}

export default PostPopup;
