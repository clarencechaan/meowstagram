import "../styles/PostPreview.css";
import { Heart } from "phosphor-react";
import { ChatCircle } from "phosphor-react";
import PostPopup from "./PostPopup";
import { useState } from "react";
import { setPost, setPostLiked } from "../scripts/setPost";

function PostPreview({ isBig, post, now, setParentPostsArr, me }) {
  const [isPostPopupShown, setIsPostPopupShown] = useState(false);
  const postLiked = post.likes.includes(me.username);
  const [postSaved, setPostSaved] = useState(false);

  function handlePostPreviewClicked() {
    setIsPostPopupShown(true);
    document.body.style.overflow = "hidden";
  }

  function cancelPostPopup() {
    setIsPostPopupShown(false);
    document.body.style.overflow = "auto";
  }

  function setParentPost(param) {
    setPost(param, setParentPostsArr, post);
  }

  function setParentPostLiked(param) {
    setPostLiked(param, setParentPostsArr, post, postLiked, me);
  }

  console.log(post.likes);

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
          setPostLiked={setParentPostLiked}
          setPostSaved={setPostSaved}
          post={post}
          now={now}
          setPost={setParentPost}
          me={me}
        />
      ) : null}
    </div>
  );
}

export default PostPreview;
