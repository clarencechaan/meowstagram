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
  now,
  homeFeedPostsArr,
  setHomeFeedPostsArr,
  me,
  setMe,
  setNavLinkSelectedHard,
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
                setNavLinkSelectedHard={setNavLinkSelectedHard}
              />
              <SideBar me={me} setMe={setMe} />
            </>
          }
        />
        <Route
          path="/profile/:username"
          element={
            <Profile
              now={now}
              me={me}
              setMe={setMe}
              setLoading={setLoading}
              setNavLinkSelectedHard={setNavLinkSelectedHard}
            />
          }
        />
        <Route
          path="/profile/:username/saved"
          element={
            <Profile
              now={now}
              me={me}
              setMe={setMe}
              setLoading={setLoading}
              setNavLinkSelectedHard={setNavLinkSelectedHard}
              onSaved={true}
            />
          }
        />
        <Route
          path="/explore"
          element={
            <Explore
              now={now}
              me={me}
              setMe={setMe}
              setNavLinkSelectedHard={setNavLinkSelectedHard}
            />
          }
        />
        <Route
          path="/inbox"
          element={
            <Inbox me={me} setNavLinkSelectedHard={setNavLinkSelectedHard} />
          }
        />
        <Route
          path="/inbox/:username"
          element={
            <Inbox me={me} setNavLinkSelectedHard={setNavLinkSelectedHard} />
          }
        />
        <Route
          path="/post/:postID"
          element={<PostPage now={now} me={me} setMe={setMe} />}
        />
      </Routes>
    </div>
  );
}

export default Content;
