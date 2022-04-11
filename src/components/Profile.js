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
  const [postsArr, setPostsArr] = useState([]);

  useEffect(() => {
    fetchProfilePosts();
    fetchUser();
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

  return (
    <div className="profile">
      <div className="profile-header">
        <img className="profile-header-img" src={user.imgURL} alt="" />
        <div>
          <div>
            <div className="profile-header-username">{user.username}</div>
            <button className="profile-header-edit-btn">Edit Profile</button>
            <img
              className="profile-header-options"
              src={profileHeaderOptions}
              alt=""
            />
          </div>
          <div>
            <div className="post-count">
              <span className="profile-header-num">57</span> posts
            </div>
            <div className="follower-count">
              <span className="profile-header-num">
                {user.followers.length}
              </span>{" "}
              followers
            </div>
            <div className="following-count">
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
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
