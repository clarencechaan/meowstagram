import "../styles/Profile.css";
import catProfile from "../images/cat.jpg";
import profileHeaderOptions from "../images/profile-header-options.svg";
import PostPreview from "./PostPreview";

function Profile() {
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
        <PostPreview />
        <PostPreview />
        <PostPreview />
        <PostPreview />
        <PostPreview />
        <PostPreview />
        <PostPreview />
        <PostPreview />
        <PostPreview />
      </div>
      <div className="footer">
        <div className="footer-row">
          <span>About</span> <span>Blog</span> <span>Jobs</span>{" "}
          <span>Help</span> <span>API</span> <span>Privacy</span>{" "}
          <span>Terms</span> <span>Top Accounts</span> <span>Hashtags</span>{" "}
          <span>Locations</span>
          <span>Outstagram Lite</span>
        </div>
        <div className="footer-row">
          <span>English</span>
          <span>
            Made with ♥ love by{" "}
            <a href="https://github.com/clarencechaan/">Clarence Chan</a>!
          </span>
        </div>
      </div>
    </div>
  );
}

export default Profile;
