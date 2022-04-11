import "../styles/Content.css";
import SideBar from "./SideBar";
import HomeFeed from "./HomeFeed";
import Profile from "./Profile";
import Explore from "./Explore";
import Inbox from "./Inbox";
import { Routes, Route } from "react-router-dom";

function Content({
  setNavLinkSelected,
  now,
  homeFeedPostsArr,
  setHomeFeedPostsArr,
  me,
  setMe,
}) {
  return (
    <div className="Content">
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
          element={<Profile now={now} me={me} setMe={setMe} />}
        />
        <Route
          path="/explore"
          element={<Explore now={now} me={me} setMe={setMe} />}
        />
        <Route path="/inbox" element={<Inbox />} />
      </Routes>
    </div>
  );
}

export default Content;
