import "../styles/PostTimeAgo.css";
import { getTimeAgo } from "../scripts/timeConversion";

function PostTimeAgo({ timestamp, now }) {
  return (
    <div className="post-time-ago">
      <span>{getTimeAgo(timestamp.seconds, now)}</span>
    </div>
  );
}

export default PostTimeAgo;
