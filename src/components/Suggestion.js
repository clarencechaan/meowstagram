import "../styles/Suggestion.css";
import catProfile from "../images/cat.jpg";
import { useState } from "react";
import { Link } from "react-router-dom";

function Suggestion() {
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
        <img className="suggestion-profile-img" src={catProfile} alt="" />
      </Link>
      <div className="suggestion-names">
        <Link to="/profile">
          <div className="suggestion-username">stc.official</div>
        </Link>
        <div className="suggestion-fullname">Sushi the Cat</div>
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
