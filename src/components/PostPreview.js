import "../styles/PostPreview.css";
import { Heart } from "phosphor-react";
import { ChatCircle } from "phosphor-react";
import PostPopup from "./PostPopup";
import { useState } from "react";

function PostPreview({ isBig, post, now }) {
  const [isPostPopupShown, setIsPostPopupShown] = useState(false);
  const [postLiked, setPostLiked] = useState(false);
  const [postSaved, setPostSaved] = useState(false);

  function handlePostPreviewClicked() {
    setIsPostPopupShown(true);
    document.body.style.overflow = "hidden";
  }

  function cancelPostPopup() {
    setIsPostPopupShown(false);
    document.body.style.overflow = "auto";
  }

  return (
    <div className={isBig ? "post-preview big" : "post-preview"}>
      <div className="post-preview-overlay" onClick={handlePostPreviewClicked}>
        <div>
          <Heart size={24} color="#FFFFFF" />
          <span>35</span>
        </div>
        <div>
          <ChatCircle size={24} color="#FFFFFF" />
          <span>1</span>
        </div>
      </div>
      <img src={post.URL} alt=""></img>
      {isPostPopupShown ? (
        <PostPopup
          cancelPopup={cancelPostPopup}
          postLiked={postLiked}
          postSaved={postSaved}
          setPostLiked={setPostLiked}
          setPostSaved={setPostSaved}
          post={post}
          now={now}
        />
      ) : null}
    </div>
  );
}

export default PostPreview;
