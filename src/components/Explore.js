import "../styles/Explore.css";
import PostPreview from "./PostPreview";

function Explore() {
  return (
    <div className="explore">
      <div className="explore-post-previews">
        <PostPreview />
        <PostPreview isBig={true} />
        <PostPreview />
        <PostPreview />
        <PostPreview />
        <PostPreview />
        <PostPreview />
        <PostPreview />
        <PostPreview />
        <PostPreview isBig={true} />
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

export default Explore;
