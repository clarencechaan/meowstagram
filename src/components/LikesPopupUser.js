/* eslint-disable react-hooks/exhaustive-deps */
import "../styles/LikesPopupUser.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase";
import { follow, unfollow } from "../scripts/follow";

function LikesPopupUser({
  username,
  me,
  setMe,
  cancelPostPopup,
  profileUser,
  setProfileUser,
}) {
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
    if (profileUser && profileUser.username === username) {
      setProfileUser((prevUser) => ({
        ...prevUser,
        followers: [...prevUser.followers, me.username],
      }));
    } else if (profileUser && profileUser.username === me.username) {
      setProfileUser((prevUser) => ({
        ...prevUser,
        following: [...prevUser.following, username],
      }));
    }
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
    if (profileUser && profileUser.username === username) {
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
    } else if (profileUser && profileUser.username === me.username) {
      setProfileUser((prevUser) => {
        const index = prevUser.following.indexOf(username);
        return {
          ...prevUser,
          following: [
            ...prevUser.following.slice(0, index),
            ...prevUser.following.slice(index + 1),
          ],
        };
      });
    }
  }

  function handleUserClicked() {
    document.body.style.overflow = "auto";
    cancelPostPopup();
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
      <Link to={"/profile/" + username} onClick={handleUserClicked}>
        <img className="likes-popup-user-img" src={user.imgURL} alt="" />
      </Link>
      <div>
        <div className="likes-popup-user-username">
          <Link to={"/profile/" + username} onClick={handleUserClicked}>
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
