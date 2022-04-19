import "../styles/MoreOptionsPopup.css";
import { Link } from "react-router-dom";
import { follow, unfollow } from "../scripts/follow";

function MoreOptionsPopup({
  cancelPopup,
  authorUsername,
  postID,
  me,
  setMe,
  profileUser,
  setProfileUser,
}) {
  const isFollowing = me.following.includes(authorUsername);

  function handleCopyLinkClicked() {
    const link = window.location.origin + "/post/" + postID;
    navigator.clipboard.writeText(link);
    cancelPopup();
  }

  function handleUnfollowBtnClicked() {
    unfollow(me.username, authorUsername);
    setMe((prevMe) => {
      const index = me.following.indexOf(authorUsername);
      return {
        ...prevMe,
        following: [
          ...prevMe.following.slice(0, index),
          ...prevMe.following.slice(index + 1),
        ],
      };
    });
    if (profileUser && profileUser.username === authorUsername) {
      setProfileUser((prevUser) => {
        const index = prevUser.followers.indexOf(me.username);
        return {
          ...prevUser,
          followers: [
            ...prevUser.followers.slice(0, index),
            ...prevUser.followers.slice(index + 1),
          ],
        };
      });
    }
    cancelPopup();
  }

  function handleFollowBtnClicked() {
    follow(me.username, authorUsername);
    setMe((prevMe) => ({
      ...prevMe,
      following: [...prevMe.following, authorUsername],
    }));
    if (profileUser && profileUser.username === authorUsername) {
      setProfileUser((prevUser) => ({
        ...prevUser,
        followers: [...prevUser.followers, me.username],
      }));
    }
    cancelPopup();
  }

  function getFollowBtn() {
    if (authorUsername === me.username) {
      return null;
    } else if (isFollowing) {
      return (
        <button
          className="more-options-unfollow"
          onClick={handleUnfollowBtnClicked}
        >
          Unfollow
        </button>
      );
    } else {
      return (
        <button
          className="more-options-follow"
          onClick={handleFollowBtnClicked}
        >
          Follow
        </button>
      );
    }
  }

  return (
    <div className="more-options-popup" onClick={cancelPopup}>
      <div
        className="more-options-popup-window"
        // prevent close on clicking
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button className="more-options-report" onClick={cancelPopup}>
          Report
        </button>
        {getFollowBtn()}
        <Link to={"/post/" + postID} onClick={cancelPopup}>
          <button>Go to post</button>
        </Link>
        <button onClick={handleCopyLinkClicked}>Copy Link</button>
        <button onClick={cancelPopup}>Cancel</button>
      </div>
    </div>
  );
}

export default MoreOptionsPopup;
