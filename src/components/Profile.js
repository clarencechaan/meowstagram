/* eslint-disable react-hooks/exhaustive-deps */
import "../styles/Profile.css";
import catProfile from "../images/cat.jpg";
import profileHeaderOptions from "../images/profile-header-options.svg";
import PostPreview from "./PostPreview";
import { query, orderBy, collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase";
import { useEffect } from "react";
import Footer from "./Footer";

function Profile({ now, profilePostsArr, setProfilePostsArr, me, setMe }) {
  useEffect(() => {
    fetchProfilePosts();
  }, []);

  async function fetchProfilePosts() {
    const postsRef = collection(db, "posts");
    let resultArr = [];
    const q = query(postsRef, orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      resultArr.push({ ...doc.data(), id: doc.id });
    });
    setProfilePostsArr(resultArr);
  }

  return (
    <div className="profile">
      <div className="profile-header">
        <img className="profile-header-img" src={catProfile} alt="" />
        <div>
          <div>
            <div className="profile-header-username">stc.official</div>
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
              <span className="profile-header-num">485</span> followers
            </div>
            <div className="following-count">
              <span className="profile-header-num">234</span> following
            </div>
          </div>
          <div>
            <div className="profile-header-full-name">Sushi the Cat</div>
            <div className="profile-header-bio">
              Hi! My name is Sushi and I'm 2 years old.
            </div>
          </div>
        </div>
      </div>
      <div className="profile-post-previews-container">
        {profilePostsArr.map((post) => (
          <PostPreview
            post={post}
            now={now}
            key={post.id}
            setParentPostsArr={setProfilePostsArr}
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
