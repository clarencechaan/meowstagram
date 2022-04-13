/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostPopup from "./PostPopup";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase";
import "../styles/PostPage.css";

function PostPage({ now, me, setMe }) {
  const postID = useParams().postID;
  const [post, setPost] = useState({
    likes: [],
    saved: [],
    timestamp: { seconds: {} },
    comments: [],
  });
  const postLiked = post.likes.includes(me.username);
  const postSaved = me.saved.includes(postID);

  useEffect(() => {
    fetchPost();
  }, [postID]);

  async function fetchPost() {
    const postRef = doc(db, "posts", postID);
    const postSnap = await getDoc(postRef);
    setPost({ ...postSnap.data(), id: postID });
  }

  async function setPostLiked(param) {
    setPost((prevPost) => {
      let updatedPostLiked;
      if (typeof param === "function") {
        updatedPostLiked = param(postLiked);
      } else {
        updatedPostLiked = param;
      }
      let updatedPost;
      if (updatedPostLiked) {
        updatedPost = { ...prevPost, likes: [...prevPost.likes, me.username] };
      } else {
        const index = prevPost.likes.indexOf(me.username);
        updatedPost = {
          ...prevPost,
          likes: [
            ...prevPost.likes.slice(0, index),
            ...prevPost.likes.slice(index + 1),
          ],
        };
      }
      return updatedPost;
    });
  }

  return (
    <PostPopup
      cancelPopup={() => {
        document.body.style.overflow = "auto";
      }}
      postLiked={postLiked}
      postSaved={postSaved}
      setPostLiked={setPostLiked}
      post={post}
      now={now}
      setPost={setPost}
      me={me}
      setMe={setMe}
      onPostPage={true}
    />
  );
}

export default PostPage;
