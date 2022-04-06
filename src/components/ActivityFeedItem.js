import "../styles/ActivityFeedItem.css";
import cat from "../images/cat.jpg";
import catPost from "../images/cat-post.jpeg";
import { useState } from "react";

function ActivityFeedItem() {
  const [category, setCategory] = useState("like");

  return (
    <div className="activity-feed-item">
      <img className="activity-feed-item-profile-pic" src={cat} alt="" />
      <span className="activity-feed-item-username">stc.official</span>
      <span className="activity-feed-item-text">&nbsp;liked your photo.</span>
      <span className="activity-feed-item-time-ago">&nbsp;1w</span>
      {category === "like" ? (
        <img className="activity-feed-item-post-img" src={catPost} alt="" />
      ) : null}
      {category === "follow" ? (
        <button className="acitivty-feed-item-follow-btn">Follow</button>
      ) : null}
    </div>
  );
}

export default ActivityFeedItem;
