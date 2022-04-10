/* eslint-disable react-hooks/exhaustive-deps */
import "../styles/LikesPopupUser.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase";
import { follow, unfollow } from "../scripts/follow";

function LikesPopupUser({ username, me, setMe }) {
  const [isFollowing, setIsFollowing] = useState(
    me.following.includes(username)
  );
  const [user, setUser] = useState({});

  useEffect(() => {
    fetchUser();
  }, []);

  function handleFollowBtnClicked() {
    setIsFollowing(true);
    setMe((prevMe) => ({
      ...prevMe,
      following: [...prevMe.following, username],
    }));
    follow(me.username, username);
  }

  function handleUnfollowBtnClicked() {
    setIsFollowing(false);
    setMe((prevMe) => {
      const index = prevMe.following.indexOf(username);
      return {
        ...prevMe,
        following: [
          ...prevMe.following.slice(0, index),
          ...prevMe.following.slice(index + 1),
        ],
      };
    });
    unfollow(me.username, username);
  }

  function handleUserClicked() {
    document.body.style.overflow = "auto";
  }

  async function fetchUser() {
    const userRef = doc(db, "users", username);
    const userSnap = await getDoc(userRef);
    setUser(userSnap.data());
  }

  function getFollowBtn() {
    if (me.username === username) {
      return null;
    } else if (isFollowing) {
      return (
        <button
          className="likes-popup-user-unfollow-btn"
          onClick={handleUnfollowBtnClicked}
        >
          Following
        </button>
      );
    } else {
      return (
        <button
          className="likes-popup-user-follow-btn"
          onClick={handleFollowBtnClicked}
        >
          Follow
        </button>
      );
    }
  }

  return (
    <div className="likes-popup-user">
      <Link to="/profile" onClick={handleUserClicked}>
        <img className="likes-popup-user-img" src={user.imgURL} alt="" />
      </Link>
      <div>
        <div className="likes-popup-user-username">
          <Link to="/profile" onClick={handleUserClicked}>
            <span>{username}</span>
          </Link>
        </div>
        <div className="likes-popup-user-full-name">
          <span>{user.fullname}</span>
        </div>
      </div>
      {getFollowBtn()}
    </div>
  );
}

export default LikesPopupUser;
