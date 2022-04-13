/* eslint-disable react-hooks/exhaustive-deps */
import "../styles/ActivityFeedPopup.css";
import ActivityFeedItem from "./ActivityFeedItem";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase";
import { useEffect } from "react";
import { nanoid } from "nanoid";

function ActivityFeedPopup({
  cancelPopup,
  setSelected,
  lastSelected,
  feed,
  me,
  setMe,
}) {
  const reversedFeed = feed.slice().reverse();

  useEffect(() => {
    fetchActivityFeed();
  }, []);

  async function fetchActivityFeed() {
    const meRef = doc(db, "users", me.username);
    const meSnap = await getDoc(meRef);
    setMe((prevMe) => ({
      ...prevMe,
      activityFeed: meSnap.data().activityFeed,
    }));
  }
  return (
    <div
      className="activity-feed-popup"
      onClick={() => {
        cancelPopup();
        setSelected(lastSelected);
      }}
    >
      <div className="activity-feed-popup-window">
        <div className="activity-feed-popup-window-triangle"></div>
        {/* hides triangle bottom shadow */}
        <div className="activity-feed-popup-window-overlay">
          <div className="activity-feed-popup-window-header">Activity Feed</div>
          {reversedFeed.map((item) => (
            <ActivityFeedItem
              item={item}
              me={me}
              setMe={setMe}
              key={nanoid()}
            />
          ))}
          {reversedFeed.length === 0 ? (
            <div className="activity-feed-popup-window-no-recent-activity">
              No recent activity.
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default ActivityFeedPopup;
