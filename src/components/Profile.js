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
  updateDoc,
} from "firebase/firestore";
import { db } from "../Firebase";
import { useEffect, useRef, useState } from "react";
import Footer from "./Footer";
import { useParams } from "react-router-dom";
import { follow, unfollow } from "../scripts/follow";
import FollowersPopup from "./FollowersPopup";
import FollowingPopup from "./FollowingPopup";

function uploadImage(file) {
   

  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Client-ID ${CLIENT_ID}`);

  let formdata = new FormData();
  formdata.append("image", file);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  return fetch("https://api.imgur.com/3/image", requestOptions)
    .then((response) => response.text())
    .then((result) => JSON.parse(result).data.link)
    .catch((error) => console.log("error", error));
}

function Profile({ now, me, setMe, setLoading, setNavLinkSelectedHard }) {
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
  const bioRef = useRef(null);
  const fullnameRef = useRef(null);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [isEditingFullname, setIsEditingFullname] = useState(false);

  useEffect(() => {
    fetchProfilePosts();
    fetchUser();
    setNavLinkSelectedHard("profile-pic");
  }, []);

  useEffect(() => {
    fetchProfilePosts();
    fetchUser();
  }, [username]);

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
          {!isEditingFullname ? (
            <button
              className="profile-header-edit-btn"
              onMouseDown={(e) => handleEditNameBtnClicked(e)}
            >
              Edit Name
            </button>
          ) : (
            <button className="profile-header-edit-btn">Done</button>
          )}
          {!isEditingBio ? (
            <button
              className="profile-header-edit-btn"
              onMouseDown={(e) => handleEditBioBtnClicked(e)}
            >
              Edit Bio
            </button>
          ) : (
            <button className="profile-header-edit-btn">Done</button>
          )}
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
    if (user.followers.includes(me.username)) return;
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
    if (!user.followers.includes(me.username)) return;
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

  function handleEditBioBtnClicked(e) {
    e.preventDefault();
    bioRef.current.disabled = false;
    bioRef.current.select();
    setIsEditingBio(true);
  }

  function handleEditNameBtnClicked(e) {
    e.preventDefault();
    fullnameRef.current.disabled = false;
    fullnameRef.current.select();
    setIsEditingFullname(true);
  }

  async function handleBioBlur() {
    bioRef.current.disabled = true;
    setIsEditingBio(false);
    const meRef = doc(db, "users", me.username);
    await updateDoc(meRef, {
      bio: user.bio,
    });
  }

  async function handleFullnameBlur() {
    fullnameRef.current.disabled = true;
    setIsEditingFullname(false);
    const meRef = doc(db, "users", me.username);
    await updateDoc(meRef, {
      fullname: user.fullname,
    });
    setMe((prevMe) => ({ ...prevMe, fullname: user.fullname }));
  }

  function handleBioInputChange(value) {
    setUser((prevUser) => ({ ...prevUser, bio: value }));
  }

  function handleFullnameInputChange(value) {
    setUser((prevUser) => ({ ...prevUser, fullname: value }));
  }

  async function handleImagePicked(e) {
    if (!e.target.files[0]) return;
    setLoading(true);
    uploadImage(e.target.files[0]).then(async (result) => {
      setMeImgURL(result);
      const meRef = doc(db, "users", me.username);
      await updateDoc(meRef, {
        imgURL: result,
      });
      setLoading(false);
    });
  }

  function setMeImgURL(URL) {
    setMe((prevMe) => ({ ...prevMe, imgURL: URL }));
  }

  return (
    <div className="profile">
      <div className="profile-header">
        <label
          htmlFor={userIsMe ? "profile-pic-file-input" : ""}
          className="profile-pic-file-input-label"
        >
          <img
            className={
              userIsMe ? "profile-header-img" : "profile-header-img disabled"
            }
            src={userIsMe ? me.imgURL : user.imgURL}
            alt=""
            referrerPolicy="no-referrer"
          />
        </label>
        <input
          type="file"
          id="profile-pic-file-input"
          className="hidden"
          accept="image/png, image/jpeg"
          onChange={(e) => {
            handleImagePicked(e);
          }}
          max-file-size="10485760"
        />
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
            <textarea
              className="profile-header-full-name"
              onChange={(e) => handleFullnameInputChange(e.target.value)}
              value={user.fullname}
              disabled
              ref={fullnameRef}
              maxLength="64"
              onBlur={handleFullnameBlur}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.target.blur();
                }
              }}
            />
            <textarea
              className="profile-header-bio"
              onChange={(e) => handleBioInputChange(e.target.value)}
              value={user.bio}
              disabled
              ref={bioRef}
              maxLength="126"
              onBlur={handleBioBlur}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.target.blur();
                }
              }}
            />
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
