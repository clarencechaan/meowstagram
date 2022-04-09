import "../styles/PostPreview.css";
import { Heart } from "phosphor-react";
import { ChatCircle } from "phosphor-react";
import PostPopup from "./PostPopup";
import { useState } from "react";
import { setPost, setPostLiked } from "../scripts/setPost";

function PostPreview({ isBig, post, now, setParentPostsArr }) {
  const [isPostPopupShown, setIsPostPopupShown] = useState(false);
  const postLiked = post.likes.includes("stc.official");
  const [postSaved, setPostSaved] = useState(false);

  function handlePostPreviewClicked() {
    setIsPostPopupShown(true);
    document.body.style.overflow = "hidden";
  }

  function cancelPostPopup() {
    setIsPostPopupShown(false);
    document.body.style.overflow = "auto";
  }

  function setProfilePost(param) {
    setPost(param, setParentPostsArr, post);
  }

  function setProfilePostLiked(param) {
    setPostLiked(param, setParentPostsArr, post, postLiked);
  }

  return (
    <div className={isBig ? "post-preview big" : "post-preview"}>
      <div className="post-preview-overlay" onClick={handlePostPreviewClicked}>
        <div>
          <Heart size={24} color="#FFFFFF" />
          <span>{post.likes.length}</span>
        </div>
        <div>
          <ChatCircle size={24} color="#FFFFFF" />
          <span>{post.comments.length}</span>
        </div>
      </div>
      <img src={post.URL} alt=""></img>
      {isPostPopupShown ? (
        <PostPopup
          cancelPopup={cancelPostPopup}
          postLiked={postLiked}
          postSaved={postSaved}
          setPostLiked={setProfilePostLiked}
          setPostSaved={setPostSaved}
          post={post}
          now={now}
          setPost={setProfilePost}
        />
      ) : null}
    </div>
  );
}

export default PostPreview;
