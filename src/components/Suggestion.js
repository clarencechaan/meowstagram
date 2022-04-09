import "../styles/Suggestion.css";
import { useState } from "react";
import { Link } from "react-router-dom";

function Suggestion({ user }) {
  const [isFollowing, setIsFollowing] = useState(false);

  function handleFollowBtnClicked() {
    setIsFollowing(true);
  }

  function handleUnfollowBtnClicked() {
    setIsFollowing(false);
  }

  return (
    <div className="suggestion">
      <Link to="/profile">
        <img className="suggestion-profile-img" src={user.imgURL} alt="" />
      </Link>
      <div className="suggestion-names">
        <Link to="/profile">
          <div className="suggestion-username">{user.username}</div>
        </Link>
        <div className="suggestion-fullname">{user.fullname}</div>
      </div>
      {isFollowing ? (
        <button
          className="suggestion-unfollow"
          onClick={handleUnfollowBtnClicked}
        >
          Following
        </button>
      ) : (
        <button className="suggestion-follow" onClick={handleFollowBtnClicked}>
          Follow
        </button>
      )}
    </div>
  );
}

export default Suggestion;
