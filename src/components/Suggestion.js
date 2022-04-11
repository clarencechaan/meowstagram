import "../styles/Suggestion.css";
import { Link } from "react-router-dom";
import { follow, unfollow } from "../scripts/follow";

function Suggestion({ user, me, setMe }) {
  const isFollowing = me.following.includes(user.username);

  function handleFollowBtnClicked() {
    follow(me.username, user.username);
    setMe((prevMe) => ({
      ...prevMe,
      following: [...prevMe.following, user.username],
    }));
  }

  function handleUnfollowBtnClicked() {
    unfollow(me.username, user.username);
    setMe((prevMe) => {
      const index = prevMe.following.indexOf(user.username);
      return {
        ...prevMe,
        following: [
          ...prevMe.following.slice(0, index),
          ...prevMe.following.slice(index + 1),
        ],
      };
    });
  }

  function getFollowBtn() {
    if (me.username === user.username) {
      return null;
    } else if (isFollowing) {
      return (
        <button
          className="suggestion-unfollow"
          onClick={handleUnfollowBtnClicked}
        >
          Following
        </button>
      );
    } else {
      return (
        <button className="suggestion-follow" onClick={handleFollowBtnClicked}>
          Follow
        </button>
      );
    }
  }

  return (
    <div className="suggestion">
      <Link to={"/profile/" + user.username}>
        <img className="suggestion-profile-img" src={user.imgURL} alt="" />
      </Link>
      <div className="suggestion-names">
        <Link to={"/profile/" + user.username}>
          <div className="suggestion-username">{user.username}</div>
        </Link>
        <div className="suggestion-fullname">{user.fullname}</div>
      </div>
      {getFollowBtn()}
    </div>
  );
}

export default Suggestion;
