/* eslint-disable react-hooks/exhaustive-deps */
import "../styles/ActivityFeedItem.css";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase";
import { Link } from "react-router-dom";
import { follow, unfollow } from "../scripts/follow";

function ActivityFeedItem({ item, me, setMe }) {
  const [user, setUser] = useState({});
  const [post, setPost] = useState({});
  const [isFollowing, setIsFollowing] = useState(
    me.following.includes(item.username)
  );

  useEffect(() => {
    fetchUser();
    fetchPost();
  }, []);

  async function fetchUser() {
    const userRef = doc(db, "users", item.username);
    const userSnap = await getDoc(userRef);
    setUser(userSnap.data());
  }

  async function fetchPost() {
    if (!item.postID) return;
    const postRef = doc(db, "posts", item.postID);
    const postSnap = await getDoc(postRef);
    setPost(postSnap.data());
  }

  let description;
  let linkURL;
  if (item.category === "like") {
    description = "liked your post.";
    linkURL = "/post/" + item.postID;
  } else if (item.category === "follow") {
    description = "started following you.";
    linkURL = "/profile/" + item.username;
  } else if (item.category === "comment") {
    description = `commented on your post: "${item.text}"`;
    linkURL = "/post/" + item.postID;
  }

  function handleFollowBtnClicked(e) {
    e.preventDefault();
    e.stopPropagation();
    setMe((prevMe) => ({
      ...prevMe,
      following: [...prevMe.following, item.username],
    }));
    setIsFollowing(true);
    follow(me.username, item.username);
  }

  function handleUnfollowBtnClicked(e) {
    e.preventDefault();
    e.stopPropagation();
    setMe((prevMe) => {
      const index = prevMe.following.indexOf(item.username);
      return {
        ...prevMe,
        following: [
          ...prevMe.following.slice(0, index),
          ...prevMe.following.slice(index + 1),
        ],
      };
    });
    setIsFollowing(false);
    unfollow(me.username, item.username);
  }

  return (
    <Link to={linkURL}>
      <div className="activity-feed-item">
        <img
          className="activity-feed-item-profile-pic"
          src={user.imgURL}
          alt=""
        />
        <div className="activity-feed-item-text">
          <span className="activity-feed-item-username">{item.username}</span>
          <span className="activity-feed-item-text">&nbsp;{description}</span>
        </div>
        {item.category === "like" || item.category === "comment" ? (
          <img className="activity-feed-item-post-img" src={post.URL} alt="" />
        ) : null}
        {item.category === "follow" && !isFollowing ? (
          <button
            className="acitivty-feed-item-follow-btn"
            onClick={(e) => handleFollowBtnClicked(e)}
          >
            Follow
          </button>
        ) : null}
        {item.category === "follow" && isFollowing ? (
          <button
            className="acitivty-feed-item-unfollow-btn"
            onClick={(e) => handleUnfollowBtnClicked(e)}
          >
            Following
          </button>
        ) : null}
      </div>
    </Link>
  );
}

export default ActivityFeedItem;
