/* eslint-disable react-hooks/exhaustive-deps */
import "../styles/Profile.css";
import profileHeaderOptions from "../images/profile-header-options.svg";
import PostPreview from "./PostPreview";
import {
  query,
  orderBy,
  collection,
  getDocs,
  doc,
  getDoc,
  where,
} from "firebase/firestore";
import { db } from "../Firebase";
import { useEffect, useState } from "react";
import Footer from "./Footer";
import { useParams } from "react-router-dom";
import { follow, unfollow } from "../scripts/follow";
import FollowersPopup from "./FollowersPopup";
import FollowingPopup from "./FollowingPopup";

function Profile({ now, me, setMe }) {
  const username = useParams().username;
  const [user, setUser] = useState({
    username: "",
    fullname: "",
    followers: [],
    following: [],
    imgURL: "",
    bio: "",
  });
  const userIsMe = username === me.username;
  const [postsArr, setPostsArr] = useState([]);
  const [isFollowersPopupShown, setIsFollowersPopupShown] = useState(false);
  const [isFollowingPopupShown, setIsFollowingPopupShown] = useState(false);

  useEffect(() => {
    fetchProfilePosts();
    fetchUser();
  }, []);

  useEffect(() => {
    fetchProfilePosts();
    fetchUser();
  }, [username]);

  // useEffect(() => {
  //   if (username === me.username) {
  //     setUser(me);
  //   }
  // }, [me]);

  async function fetchProfilePosts() {
    const postsRef = collection(db, "posts");
    let resultArr = [];
    const q = query(
      postsRef,
      where("user", "==", username),
      orderBy("timestamp", "desc")
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      resultArr.push({ ...doc.data(), id: doc.id });
    });
    setPostsArr(resultArr);
  }

  async function fetchUser() {
    const userRef = doc(db, "users", username);
    const userSnap = await getDoc(userRef);
    setUser(userSnap.data());
  }

  function getUserButtons() {
    if (userIsMe) {
      return (
        <>
          <button className="profile-header-edit-btn">Edit Profile</button>
          <img
            className="profile-header-options"
            src={profileHeaderOptions}
            alt=""
          />
        </>
      );
    } else if (!me.following.includes(username)) {
      return (
        <button
          className="profile-header-follow-btn"
          onClick={handleFollowBtnClicked}
        >
          Follow
        </button>
      );
    } else {
      return (
        <button
          className="profile-header-unfollow-btn"
          onClick={handleUnfollowBtnClicked}
        >
          Following
        </button>
      );
    }
  }

  function handleFollowBtnClicked() {
    follow(me.username, username);
    setMe((prevMe) => ({
      ...prevMe,
      following: [...prevMe.following, username],
    }));
    setUser((prevUser) => ({
      ...prevUser,
      followers: [...prevUser.followers, me.username],
    }));
  }

  function handleUnfollowBtnClicked() {
    unfollow(me.username, username);
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
    setUser((prevUser) => {
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

  function cancelFollowersPopup() {
    setIsFollowersPopupShown(false);
  }

  function cancelFollowingPopup() {
    setIsFollowingPopupShown(false);
  }

  function handleFollowersCountClicked() {
    setIsFollowersPopupShown(true);
  }

  function handleFollowingCountClicked() {
    setIsFollowingPopupShown(true);
  }

  return (
    <div className="profile">
      <div className="profile-header">
        <img className="profile-header-img" src={user.imgURL} alt="" />
        <div>
          <div>
            <div className="profile-header-username">{user.username}</div>
            {getUserButtons()}
          </div>
          <div>
            <div className="post-count">
              <span className="profile-header-num">{postsArr.length}</span> post
              {postsArr.length === 1 ? "" : "s"}
            </div>
            <div
              className="follower-count"
              onClick={handleFollowersCountClicked}
            >
              <span className="profile-header-num">
                {user.followers.length}
              </span>{" "}
              follower{user.followers.length === 1 ? "" : "s"}
            </div>
            <div
              className="following-count"
              onClick={handleFollowingCountClicked}
            >
              <span className="profile-header-num">
                {user.following.length}
              </span>{" "}
              following
            </div>
          </div>
          <div>
            <div className="profile-header-full-name">{user.fullname}</div>
            <div className="profile-header-bio">{user.bio}</div>
          </div>
        </div>
      </div>
      <div className="profile-post-previews-container">
        {postsArr.map((post) => (
          <PostPreview
            post={post}
            now={now}
            key={post.id}
            setParentPostsArr={setPostsArr}
            me={me}
            setMe={setMe}
            profileUser={user}
            setProfileUser={setUser}
          />
        ))}
      </div>
      <Footer />
      {isFollowersPopupShown ? (
        <FollowersPopup
          cancelPopup={cancelFollowersPopup}
          followers={user.followers}
          me={me}
          setMe={setMe}
          profileUser={user}
          setProfileUser={setUser}
        />
      ) : null}
      {isFollowingPopupShown ? (
        <FollowingPopup
          cancelPopup={cancelFollowingPopup}
          following={user.following}
          me={me}
          setMe={setMe}
          profileUser={user}
          setProfileUser={setUser}
        />
      ) : null}
    </div>
  );
}

export default Profile;
