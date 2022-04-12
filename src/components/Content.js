import "../styles/Content.css";
import SideBar from "./SideBar";
import HomeFeed from "./HomeFeed";
import Profile from "./Profile";
import Explore from "./Explore";
import Inbox from "./Inbox";
import PostPage from "./PostPage";
import { Routes, Route } from "react-router-dom";
import ProgressBar from "./ProgressBar";
import { useState } from "react";

function Content({
  setNavLinkSelected,
  now,
  homeFeedPostsArr,
  setHomeFeedPostsArr,
  me,
  setMe,
}) {
  const [loading, setLoading] = useState(false);
  return (
    <div className="Content">
      {loading ? <ProgressBar /> : null}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HomeFeed
                now={now}
                homeFeedPostsArr={homeFeedPostsArr}
                setHomeFeedPostsArr={setHomeFeedPostsArr}
                me={me}
                setMe={setMe}
              />
              <SideBar
                setNavLinkSelected={setNavLinkSelected}
                me={me}
                setMe={setMe}
              />
            </>
          }
        />
        <Route
          path="/profile/:username"
          element={
            <Profile now={now} me={me} setMe={setMe} setLoading={setLoading} />
          }
        />
        <Route
          path="/explore"
          element={<Explore now={now} me={me} setMe={setMe} />}
        />
        <Route path="/inbox" element={<Inbox />} />
        <Route
          path="/post/:postID"
          element={<PostPage now={now} me={me} setMe={setMe} />}
        />
      </Routes>
    </div>
  );
}

export default Content;
