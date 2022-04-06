import "../styles/LikesPopupUser.css";
import cat from "../images/cat.jpg";
import { useState } from "react";
import { Link } from "react-router-dom";

function LikesPopupUser() {
  const [isFollowing, setIsFollowing] = useState(false);

  function handleFollowBtnClicked() {
    setIsFollowing(true);
  }

  function handleUnfollowBtnClicked() {
    setIsFollowing(false);
  }

  function handleUserClicked() {
    document.body.style.overflow = "auto";
  }

  return (
    <div className="likes-popup-user">
      <Link to="/profile" onClick={handleUserClicked}>
        <img className="likes-popup-user-img" src={cat} alt="" />
      </Link>
      <div>
        <div className="likes-popup-user-username">
          <Link to="/profile" onClick={handleUserClicked}>
            <span>stc.official</span>
          </Link>
        </div>
        <div className="likes-popup-user-full-name">
          <span>Sushi the Cat</span>
        </div>
      </div>

      {isFollowing ? (
        <button
          className="likes-popup-user-unfollow-btn"
          onClick={handleUnfollowBtnClicked}
        >
          Following
        </button>
      ) : (
        <button
          className="likes-popup-user-follow-btn"
          onClick={handleFollowBtnClicked}
        >
          Follow
        </button>
      )}
    </div>
  );
}

export default LikesPopupUser;
