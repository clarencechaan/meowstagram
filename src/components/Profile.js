/* eslint-disable react-hooks/exhaustive-deps */
import "../styles/Profile.css";
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
import postsTab from "../images/profile-posts.svg";
import savedTab from "../images/profile-saved.svg";
import { Link } from "react-router-dom";

async function uploadImage(file) {
   

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

function Profile({
  now,
  me,
  setMe,
  setLoading,
  setNavLinkSelectedHard,
  onSaved,
  loading,
}) {
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
  const [tabSelected, setTabSelected] = useState(null);
  const [savedArr, setSavedArr] = useState([]);

  useEffect(() => {
    fetchUser();
    setNavLinkSelectedHard("profile-pic");
    setPostsArr([]);
    setSavedArr([]);

    if (userIsMe && onSaved) {
      fetchSavedPosts();
    } else {
      fetchProfilePosts();
    }
  }, [username]);

  useEffect(() => {
    if (
      (!userIsMe || (userIsMe && tabSelected === "posts")) &&
      postsArr.length === 0
    ) {
      fetchProfilePosts();
    } else if (userIsMe && tabSelected === "saved" && savedArr.length === 0) {
      fetchSavedPosts();
    }
  }, [tabSelected]);

  useEffect(() => {
    onSaved ? setTabSelected("saved") : setTabSelected("posts");
  }, [onSaved]);

  async function fetchProfilePosts() {
    setLoading(true);
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
    setTabSelected("posts");
    setLoading(false);
  }

  async function fetchUser() {
    const userRef = doc(db, "users", username);
    const userSnap = await getDoc(userRef);
    setUser(userSnap.data());
  }

  async function fetchSavedPosts() {
    setLoading(true);
    let resultArr = [];
    for (const postID of me.saved) {
      const postRef = doc(db, "posts", postID);
      const postSnap = await getDoc(postRef);
      resultArr.unshift({ ...postSnap.data(), id: postSnap.id });
    }
    setSavedArr(resultArr);
    setTabSelected("saved");
    setLoading(false);
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
    if (e.target.files[0].size > 10485760) {
      alert("File is too big. Max size is 10MB.");
      return;
    }
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

  function handlePostsTabClicked() {
    setTabSelected("posts");
  }

  function handleSavedTabClicked() {
    setTabSelected("saved");
  }

  function getProfileTabs() {
    return userIsMe ? (
      <div className="profile-tabs">
        <Link to={"/profile/" + me.username}>
          <span
            className={
              tabSelected === "posts"
                ? "profile-tab-posts selected"
                : "profile-tab-posts unselected"
            }
            onClick={handlePostsTabClicked}
          >
            <img src={postsTab} alt="" /> POSTS
          </span>
        </Link>
        <Link to={"/profile/" + me.username + "/saved"}>
          <span
            className={
              tabSelected === "saved"
                ? "profile-tab-saved selected"
                : "profile-tab-saved unselected"
            }
            onClick={handleSavedTabClicked}
          >
            <img src={savedTab} alt="" /> SAVED
          </span>
        </Link>
      </div>
    ) : (
      <div className="profile-tabs"></div>
    );
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
      {getProfileTabs()}
      <div className="profile-post-previews-container">
        {!userIsMe || (userIsMe && tabSelected === "posts")
          ? postsArr.map((post) => (
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
            ))
          : null}
        {userIsMe && tabSelected === "saved"
          ? savedArr.map((post) => (
              <PostPreview
                post={post}
                now={now}
                key={post.id}
                setParentPostsArr={setSavedArr}
                me={me}
                setMe={setMe}
                profileUser={user}
                setProfileUser={setUser}
              />
            ))
          : null}
        {(tabSelected === "posts" && postsArr.length === 0 && !loading) ||
        (tabSelected === "saved" && savedArr.length === 0 && !loading) ? (
          <div className="profile-no-posts-message">No posts found.</div>
        ) : null}
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
