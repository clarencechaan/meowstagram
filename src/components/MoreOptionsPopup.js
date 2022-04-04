import "../styles/MoreOptionsPopup.css";

function MoreOptionsPopup({ cancelPopup }) {
  return (
    <div className="more-options-popup" onClick={cancelPopup}>
      <div
        className="more-options-popup-window"
        // prevent close on clicking
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button className="more-options-report">Report</button>
        <button className="more-options-unfollow">Unfollow</button>
        <button>Go to post</button>
        <button>Share to..</button>
        <button>Copy Link</button>
        <button>Embed</button>
        <button onClick={cancelPopup}>Cancel</button>
      </div>
    </div>
  );
}

export default MoreOptionsPopup;
