import "../styles/PostLikesCounter.css";
import LikesPopup from "./LikesPopup";
import { useState } from "react";

function PostLikesCounter({ likesCount, likes, me, setMe }) {
  const [likesPopupShown, setLikesPopupShown] = useState(false);

  function cancelLikesPopup() {
    setLikesPopupShown(false);
    document.body.style.overflow = "auto";
  }

  function handleLikesCounterClicked() {
    setLikesPopupShown(true);
    document.body.style.overflow = "hidden";
  }

  function getLikesCounterStr() {
    if (likesCount === 0) {
      return "No likes";
    } else if (likesCount === 1) {
      return "1 like";
    } else {
      return `${likesCount} likes`;
    }
  }

  return (
    <div className="post-likes-counter">
      <span onClick={handleLikesCounterClicked}>{getLikesCounterStr()}</span>
      {likesPopupShown ? (
        <LikesPopup
          cancelPopup={cancelLikesPopup}
          likes={likes}
          me={me}
          setMe={setMe}
        />
      ) : null}
    </div>
  );
}

export default PostLikesCounter;
