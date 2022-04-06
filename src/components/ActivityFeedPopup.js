import "../styles/ActivityFeedPopup.css";
import ActivityFeedItem from "./ActivityFeedItem";

function ActivityFeedPopup({ cancelPopup, setSelected, lastSelected }) {
  return (
    <div
      className="activity-feed-popup hidden"
      onClick={() => {
        cancelPopup();
        setSelected(lastSelected);
      }}
    >
      <div
        className="activity-feed-popup-window"
        // prevent close on clicking
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="activity-feed-popup-window-triangle"></div>
        {/* hides triangle bottom shadow */}
        <div className="activity-feed-popup-window-overlay">
          <div className="activity-feed-popup-window-header">Activity Feed</div>
          <ActivityFeedItem />
          <ActivityFeedItem />
          <ActivityFeedItem />
          <ActivityFeedItem />
          <ActivityFeedItem />
          <ActivityFeedItem />
          <ActivityFeedItem />
          <ActivityFeedItem />
          <ActivityFeedItem />
          <ActivityFeedItem />
        </div>
      </div>
    </div>
  );
}

export default ActivityFeedPopup;
