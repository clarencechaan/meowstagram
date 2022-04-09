import "../styles/PostPreview.css";
import { Heart } from "phosphor-react";
import { ChatCircle } from "phosphor-react";
import PostPopup from "./PostPopup";
import { useState } from "react";

function PostPreview({ isBig, post, now, setProfilePostsArr }) {
  const [isPostPopupShown, setIsPostPopupShown] = useState(false);
  const postLiked = post.likes.includes("stc.official");
  const [postSaved, setPostSaved] = useState(false);

  function handlePostPreviewClicked() {
    setIsPostPopupShown(true);
    document.body.style.overflow = "hidden";
  }

  function cancelPostPopup() {
    setIsPostPopupShown(false);
    document.body.style.overflow = "auto";
  }

  function setPost(param) {
    setProfilePostsArr((prevPostsArr) => {
      let updatedPost;
      if (typeof param === "function") {
        updatedPost = param(post);
      } else {
        updatedPost = param;
      }
      const index = prevPostsArr.indexOf(post);
      return [
        ...prevPostsArr.slice(0, index),
        updatedPost,
        ...prevPostsArr.slice(index + 1),
      ];
    });
  }

  function setPostLiked(param) {
    setProfilePostsArr((prevPostsArr) => {
      let updatedPostLiked;
      if (typeof param === "function") {
        updatedPostLiked = param(postLiked);
      } else {
        updatedPostLiked = param;
      }
      let updatedPost;
      if (updatedPostLiked) {
        updatedPost = { ...post, likes: [...post.likes, "stc.official"] };
      } else {
        const index = post.likes.indexOf("stc.official");
        updatedPost = {
          ...post,
          likes: [
            ...post.likes.slice(0, index),
            ...post.likes.slice(index + 1),
          ],
        };
      }
      const index = prevPostsArr.indexOf(post);
      return [
        ...prevPostsArr.slice(0, index),
        updatedPost,
        ...prevPostsArr.slice(index + 1),
      ];
    });
  }

  return (
    <div className={isBig ? "post-preview big" : "post-preview"}>
      <div className="post-preview-overlay" onClick={handlePostPreviewClicked}>
        <div>
          <Heart size={24} color="#FFFFFF" />
          <span>{post.likes.length}</span>
        </div>
        <div>
          <ChatCircle size={24} color="#FFFFFF" />
          <span>{post.comments.length}</span>
        </div>
      </div>
      <img src={post.URL} alt=""></img>
      {isPostPopupShown ? (
        <PostPopup
          cancelPopup={cancelPostPopup}
          postLiked={postLiked}
          postSaved={postSaved}
          setPostLiked={setPostLiked}
          setPostSaved={setPostSaved}
          post={post}
          now={now}
          setPost={setPost}
        />
      ) : null}
    </div>
  );
}

export default PostPreview;
