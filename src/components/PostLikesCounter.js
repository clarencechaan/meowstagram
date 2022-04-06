import "../styles/PostLikesCounter.css";
import LikesPopup from "./LikesPopup";
import { useState } from "react";

function PostLikesCounter() {
  const [likesPopupShown, setLikesPopupShown] = useState(false);

  function cancelLikesPopup() {
    setLikesPopupShown(false);
    document.body.style.overflow = "auto";
  }

  function handleLikesCounterClicked() {
    setLikesPopupShown(true);
    document.body.style.overflow = "hidden";
  }

  return (
    <div className="post-likes-counter">
      <span onClick={handleLikesCounterClicked}>2,561 likes</span>
      {likesPopupShown ? <LikesPopup cancelPopup={cancelLikesPopup} /> : null}
    </div>
  );
}

export default PostLikesCounter;
