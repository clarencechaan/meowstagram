/* eslint-disable react-hooks/exhaustive-deps */
import "../styles/LikesPopupUser.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase";

function LikesPopupUser({ username }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    fetchUser();
  }, []);

  function handleFollowBtnClicked() {
    setIsFollowing(true);
  }

  function handleUnfollowBtnClicked() {
    setIsFollowing(false);
  }

  function handleUserClicked() {
    document.body.style.overflow = "auto";
  }

  async function fetchUser() {
    const userRef = doc(db, "users", username);
    const userSnap = await getDoc(userRef);
    setUser(userSnap.data());
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
