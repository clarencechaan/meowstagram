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
  profilePostsArr,
  setProfilePostsArr,
  me,
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
              />
              <SideBar setNavLinkSelected={setNavLinkSelected} me={me} />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <Profile
              now={now}
              profilePostsArr={profilePostsArr}
              setProfilePostsArr={setProfilePostsArr}
              me={me}
            />
          }
        />
        <Route path="/explore" element={<Explore now={now} me={me} />} />
        <Route path="/inbox" element={<Inbox />} />
      </Routes>
    </div>
  );
}

export default Content;
