import "../styles/ActivityFeedPopup.css";

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
        <div className="activity-feed-popup-window-overlay"></div>
      </div>
    </div>
  );
}

export default ActivityFeedPopup;
