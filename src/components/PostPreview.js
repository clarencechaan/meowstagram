import "../styles/PostPreview.css";
import catPost from "../images/cat-post.jpeg";
import { Heart } from "phosphor-react";
import { ChatCircle } from "phosphor-react";

function PostPreview() {
  return (
    <div className="post-preview">
      <div className="post-preview-overlay">
        <div>
          <Heart size={24} color="#FFFFFF" />
          <span>35</span>
        </div>
        <div>
          <ChatCircle size={24} color="#FFFFFF" />
          <span>1</span>
        </div>
      </div>
      <img src={catPost} alt=""></img>
    </div>
  );
}

export default PostPreview;
