import "../styles/ActivityFeedPopup.css";

function ActivityFeedPopup({ cancelPopup }) {
  return (
    <div className="activity-feed-popup hidden" onClick={cancelPopup}>
      <div
        className="activity-feed-popup-window"
        // prevent close on clicking
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="activity-feed-popup-window-triangle"></div>
        {/* hides triangle bottom shadow */}
        <div className="activity-feed-popup-window-overlay"></div>
      </div>
    </div>
  );
}

export default ActivityFeedPopup;
