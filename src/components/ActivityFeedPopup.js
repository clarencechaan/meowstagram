/* eslint-disable react-hooks/exhaustive-deps */
import "../styles/ActivityFeedPopup.css";
import ActivityFeedItem from "./ActivityFeedItem";
import { useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import { db } from "../Firebase";
import { doc, getDoc } from "firebase/firestore";

let fetchedFeedReversed = [];
let index = 0;
function ActivityFeedPopup({
  cancelPopup,
  setSelected,
  lastSelected,
  me,
  setMe,
}) {
  const [workingFeed, setWorkingFeed] = useState([]);
  const reversedFeed = me.activityFeed.slice().reverse();
  const endOfFeedRef = useRef(null);

  useEffect(() => {
    index = 0;
    const observer = new IntersectionObserver(
      function (entries) {
        if (entries[0].isIntersecting === true) {
          setWorkingFeed((prevWorkingFeed) => [
            ...prevWorkingFeed,
            ...fetchedFeedReversed
              .slice(index, index + 6)
              .map((item) => (
                <ActivityFeedItem
                  item={item}
                  me={me}
                  setMe={setMe}
                  key={nanoid()}
                />
              )),
          ]);
          index += 6;
        }
      },
      { rootMargin: "100px" }
    );

    fetchActivityFeed().then(() => {
      observer.observe(endOfFeedRef.current);
    });
  }, []);

  async function fetchActivityFeed() {
    const meRef = doc(db, "users", me.username);
    const meSnap = await getDoc(meRef);
    setMe((prevMe) => ({
      ...prevMe,
      activityFeed: meSnap.data().activityFeed,
    }));
    fetchedFeedReversed = meSnap.data().activityFeed.slice().reverse();
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
          {workingFeed}
          {reversedFeed.length === 0 ? (
            <div className="activity-feed-popup-window-no-recent-activity">
              No recent activity.
            </div>
          ) : null}
          <div className="end-of-feed" ref={endOfFeedRef}></div>
        </div>
      </div>
    </div>
  );
}

export default ActivityFeedPopup;
